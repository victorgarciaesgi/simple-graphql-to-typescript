import ora from 'ora';
import { generateInterfaces, generateMethodsArgsTypes } from './generators';
import { GraphQLJSONSchema, Field } from './models';
import { createMethods, createGqlQueries } from './builders';
import { sharedTemplate } from './templates/shared.template';
import ScalarStore from './store/scalars.store';

const generatedInterfaces = {
  METHODS: '',
  OBJECT: [] as string[],
  ENUM: [] as string[],
  METHODS_ARGS: [] as string[],
  QUERIES: '',
};

const transpile = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');

export const generate = (
  schema: GraphQLJSONSchema,
  prefix?: string,
  suffix?: string,
  customScalars?: { [x: string]: string },
  generateMethods?: boolean,
  apolloHooks?: boolean,
  withGqlQueries?: boolean
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (customScalars) {
      ScalarStore.addScalars(customScalars);
    }
    transpile.start();

    try {
      const { generatedEnums, generatedTypes } = generateInterfaces(schema, prefix, suffix);
      const generatedMethodsArgs = generateMethodsArgsTypes(schema, prefix, suffix);
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
          const methods = await createGqlQueries(schema, prefix, suffix);
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

    const signature = sharedTemplate;

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
