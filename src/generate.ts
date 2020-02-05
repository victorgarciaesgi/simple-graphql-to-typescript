import ora from 'ora';
import { generateInterfaces, generateMethodsArgsTypes } from './generators';
import { GraphQLJSONSchema, Field } from './models';
import { createMethods } from './builders';
import { sharedTemplate } from './templates/shared.template';
import { ParametersStore } from './store/parameters.store';
import { defineImports } from './templates';

const generatedInterfaces = {
  METHODS: '',
  OBJECT: [] as string[],
  ENUM: [] as string[],
  METHODS_ARGS: [] as string[],
  QUERIES: '',
  HOOKS: '',
};

const transpile = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');

export const generate = async (
  schema: GraphQLJSONSchema,
  prefix?: string,
  suffix?: string,
  customScalars?: { [x: string]: string },
  codegenMethods?: boolean,
  codegenHooks?: boolean,
  codegenTemplates?: boolean
): Promise<string> => {
  ParametersStore.setParamaters({
    scalars: customScalars,
    prefix,
    suffix,
  });
  transpile.start();

  try {
    const { generatedEnums, generatedTypes } = generateInterfaces(schema);
    const generatedMethodsArgs = generateMethodsArgsTypes(schema);
    generatedInterfaces.OBJECT = generatedTypes;
    generatedInterfaces.ENUM = generatedEnums;
    generatedInterfaces.METHODS_ARGS = generatedMethodsArgs;
    if (codegenMethods) {
      const oraMethods = ora('Generating queries and mutations...').start();
      try {
        const methods = await createMethods({
          schema,
          mode: 'methods',
        });
        generatedInterfaces.METHODS = methods;
        oraMethods.succeed('🧬 Queries and mutations successfully generated');
      } catch (e) {
        oraMethods.fail('Methods generation failed');
        return Promise.reject(e);
      }
    }
    if (codegenHooks) {
      const oraMethods = ora('Generating React hooks...').start();
      try {
        const methods = await createMethods({
          schema,
          mode: 'hooks',
        });
        generatedInterfaces.HOOKS = methods;
        oraMethods.succeed('⚛️  React Hooks successfully generated');
      } catch (e) {
        oraMethods.fail('Hooks generation failed');
        return Promise.reject(e);
      }
    }
    if (codegenTemplates) {
      try {
        const methods = await createMethods({ schema, mode: 'template' });
        generatedInterfaces.QUERIES = methods;
      } catch (e) {
        return Promise.reject(e);
      }
    }
  } catch (e) {
    transpile.fail('Transpiling failed');
    return Promise.reject(e);
  }
  transpile.succeed(`📝 Schema transpiled to Typescript`);

  const signature = sharedTemplate;
  const imports = defineImports({
    codegenHooks: !!codegenHooks,
    codegenMethods: !!codegenMethods,
    codegenTemplates: !!codegenTemplates,
  });

  const modelsTemplate = `
      ${signature}

      ${generatedInterfaces.OBJECT.join('\n')}
      ${generatedInterfaces.ENUM.join('\n')}
      ${generatedInterfaces.METHODS_ARGS.join('\n')}
      ${imports}
      ${generatedInterfaces.METHODS}
      ${generatedInterfaces.HOOKS}
      ${generatedInterfaces.QUERIES}
    `;

  return modelsTemplate;
};
