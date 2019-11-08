import ora from 'ora';
import { generateInterfaces, generateMethodsArgsTypes } from './generators';
import { GraphQLJSONSchema, Field } from './models';
import { createMethods, createGqlQueries } from './builders';

export let scalarList: { [x: string]: string } = {
  ID: 'string',
  String: 'string',
  Int: 'number',
  Float: 'number',
  Upload: 'File',
  Boolean: 'boolean',
  Json: 'string',
};

const generatedInterfaces = {
  METHODS: '',
  OBJECT: [],
  ENUM: [],
  METHODS_ARGS: [],
  QUERIES: '',
};

const transpile = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');

export const generate = (
  schema: GraphQLJSONSchema,
  prefix: string,
  suffix: string,
  customScalars: { [x: string]: string },
  generateMethods?: boolean,
  apolloHooks?: boolean,
  withGqlQueries?: boolean
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
      const { generatedEnums, generatedTypes } = generateInterfaces(
        schema,
        prefix,
        suffix,
        scalarList
      );
      const generatedMethodsArgs = generateMethodsArgsTypes(schema, prefix, suffix, scalarList);
      generatedInterfaces.OBJECT = generatedTypes;
      generatedInterfaces.ENUM = generatedEnums;
      generatedInterfaces.METHODS_ARGS = generatedMethodsArgs;
      if (generateMethods) {
        const oraMethods = ora('Generating queries and mutations...').start();
        try {
          const methods = await createMethods({
            schema,
            prefix,
            suffix,
            scalarList,
            apolloHooks,
          });
          generatedInterfaces.METHODS = methods;
          oraMethods.succeed('🏗 Queries and mutations successfully generated');
        } catch (e) {
          oraMethods.fail('Methods generation failed');
          return Promise.reject(e);
        }
      }
      if (withGqlQueries) {
        try {
          const methods = await createGqlQueries(schema, prefix, suffix, scalarList);
          generatedInterfaces.QUERIES = methods;
        } catch (e) {
          return Promise.reject(e);
        }
      }
    } catch (e) {
      transpile.fail('Transpiling failed');
      return reject(e);
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

      ${generatedInterfaces.OBJECT.join('\n')}
      ${generatedInterfaces.ENUM.join('\n')}
      ${generatedInterfaces.METHODS_ARGS.join('\n')}
      ${generatedInterfaces.METHODS}
      ${generatedInterfaces.QUERIES}
    `;

    resolve(modelsTemplate);
  });
};
