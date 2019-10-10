import ora from 'ora';
import { createMethods } from './createMethods';
import { getObjectTSInterfaces, getQueriesArgsTSInterfaces } from './helpers';
import { GraphQLJSONSchema, Type, Field } from './schemaModel';

export let scalarList = {
  ID: 'string',
  String: 'string',
  Int: 'number',
  Float: 'number',
  Upload: 'File',
  Boolean: 'boolean',
  Json: 'string',
};

const generatedTypes = {
  METHODS: '',
  OBJECT: [],
  ENUM: [],
  METHODS_ARGS: [],
};

const transpile = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');

const getEnumTypes = (object: Type, prefix: string, suffix: string) => {
  let ObjectName: string = object.name;
  const generatedFields = object.enumValues.map(field => {
    return `| '${field.name}'`;
  });
  const generatedInterface = `type ${prefix ? prefix : ''}${ObjectName}${suffix ? suffix : ''} = 
        ${generatedFields.join('\n')}
    `;
  return generatedInterface;
};

export const generate = (
  schema: GraphQLJSONSchema,
  prefix: string,
  suffix: string,
  customScalars: { [x: string]: string },
  generateMethods?: boolean
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (customScalars) {
      scalarList = {
        ...scalarList,
        ...customScalars,
      };
    }
    transpile.start();

    try {
      const schemaTypes = schema.__schema.types;
      const QueryType = schema.__schema.queryType.name;
      const MutationType = schema.__schema.mutationType ? schema.__schema.mutationType.name : '';
      const listQueries = schema.__schema.types.find(f => f.name === QueryType).fields;
      let listMutations: Field[] = [];
      if (MutationType) {
        listMutations = schema.__schema.types.find(f => f.name === MutationType).fields;
      }
      if (generateMethods) {
        const oraMethods = ora('Generating queries and mutations...').start();

        try {
          const methods = await createMethods({ schema, prefix, suffix });
          generatedTypes.METHODS = methods;
          oraMethods.succeed('🏗 Queries and mutations successfully generated');
        } catch (e) {
          oraMethods.fail('Methods generation failed');
          console.log(e);
        }
      }

      schemaTypes.forEach(item => {
        if (!/^_{1,2}/.test(item.name)) {
          if (['OBJECT', 'INPUT_OBJECT', 'INTERFACE'].includes(item.kind)) {
            const generatedInterface = getObjectTSInterfaces(item, prefix, suffix);
            // generatedTypes.LOCAL_OBJECT.push(`${generatedInterface}`);
            generatedTypes.OBJECT.push(`export ${generatedInterface}`);
          } else if (item.kind === 'ENUM') {
            const enumTypes = getEnumTypes(item, prefix, suffix);
            generatedTypes.ENUM.push(`export ${enumTypes}`);
            // generatedTypes.LOCAL_ENUM.push(`${enumTypes}`);
          }
        }
      });
      [...listQueries, ...listMutations].forEach(item => {
        if (!/^_{1,2}/.test(item.name)) {
          const generatedInterface = getQueriesArgsTSInterfaces(item, prefix, suffix);
          generatedTypes.METHODS_ARGS.push(`export ${generatedInterface}`);
        }
      });
    } catch (e) {
      transpile.fail('Transpiling failed');
      console.log(e);
      reject(e);
      return;
    }
    transpile.succeed(`🖋 Transpiling done`);

    const signature = `
      /* eslint-disable */
      /* tslint-disable */
      // *******************************************************
      // *******************************************************
      //
      // GENERATED FILE, DO NOT MODIFY
      //
      // Made by Victor Garcia ®
      //
      // https://github.com/victorgarciaesgi
      // *******************************************************
      // *******************************************************
      // 💙`;

    const modelsTemplate = `
      ${signature}

      ${generatedTypes.OBJECT.join('\n')}
      ${generatedTypes.ENUM.join('\n')}
      ${generatedTypes.METHODS_ARGS.join('\n')}
      ${generateMethods ? generatedTypes.METHODS : ''}
    `;

    resolve(modelsTemplate);
  });
};
