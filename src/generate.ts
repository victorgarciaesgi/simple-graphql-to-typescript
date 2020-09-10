import ora from 'ora';
import { generateInterfaces, generateMethodsArgsTypes } from './generators';
import { GraphQLJSONSchema, CodeGenType, Schema } from './models';
import { createMethods, generateFragments } from './builders';
import { sharedTemplate } from './templates/shared.template';
import { ParametersStore } from './store/parameters.store';
import { defineImports } from './templates';

const generatedInterfaces = {
  codeGen: '',
  fragments: '',
  OBJECT: [] as string[],
  ENUM: [] as string[],
  METHODS_ARGS: [] as string[],
};

const transpile = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');

type GenerateArgs = {
  schema: GraphQLJSONSchema;
  prefix?: string;
  suffix?: string;
  customScalars?: { [x: string]: string };
  codegenMethods?: boolean;
  codegenReactHooks?: boolean;
  codegenVueHooks?: boolean;
  codegenTemplates?: boolean;
  genFragments?: boolean;
};

export const generate = async ({
  schema,
  codegenMethods,
  codegenReactHooks,
  codegenTemplates,
  codegenVueHooks,
  customScalars,
  genFragments,
  prefix,
  suffix,
}: GenerateArgs): Promise<string> => {
  ParametersStore.setParamaters({
    scalars: customScalars,
    prefix,
    suffix,
    genFragments,
  });
  transpile.start();

  try {
    const { generatedEnums, generatedTypes } = generateInterfaces(schema);
    const generatedMethodsArgs = generateMethodsArgsTypes(schema);
    generatedInterfaces.OBJECT = generatedTypes;
    generatedInterfaces.ENUM = generatedEnums;
    generatedInterfaces.METHODS_ARGS = generatedMethodsArgs;

    if (genFragments) generatedInterfaces.fragments = generateFragments(schema).join('\n');

    if (codegenMethods) {
      await codeGenerateFromConfig({
        schema,
        mode: 'methods',
        message: 'queries and mutations',
        emoji: '🧬',
      });
    }
    if (codegenReactHooks) {
      await codeGenerateFromConfig({
        schema,
        mode: 'react-hooks',
        message: 'React hooks',
        emoji: '⚛️ ',
      });
    }
    if (codegenVueHooks) {
      await codeGenerateFromConfig({
        schema,
        mode: 'vue-hooks',
        message: 'Vue Hooks',
        emoji: '🅅 ',
      });
    }
    if (codegenTemplates) {
      await codeGenerateFromConfig({ schema, mode: 'template', message: 'templates' });
    }
  } catch (e) {
    transpile.fail('Transpiling failed');
    return Promise.reject(e);
  }
  transpile.succeed(`📝 Schema transpiled to Typescript`);

  const signature = sharedTemplate;
  const imports = defineImports({
    codegenReactHooks: !!codegenReactHooks,
    codegenVueHooks: !!codegenVueHooks,
    codegenMethods: !!codegenMethods,
    codegenTemplates: !!codegenTemplates,
  });

  const modelsTemplate = `
      ${signature}
      ${imports}
      ${generatedInterfaces.OBJECT.join('\n')}
      ${generatedInterfaces.ENUM.join('\n')}
      ${generatedInterfaces.METHODS_ARGS.join('\n')}
      ${generatedInterfaces.fragments}
      ${generatedInterfaces.codeGen}
    `;

  return modelsTemplate;
};

interface CodeGenerateFromConfigArgs {
  schema: GraphQLJSONSchema;
  mode: CodeGenType;
  message: string;
  emoji?: string;
}

async function codeGenerateFromConfig({
  schema,
  mode,
  message,
  emoji,
}: CodeGenerateFromConfigArgs) {
  const oraMethods = ora(`Generating ${message}...`).start();
  try {
    const methods = await createMethods({
      schema,
      mode,
    });
    generatedInterfaces.codeGen = generatedInterfaces.codeGen + methods;
    oraMethods.succeed(`${emoji ? emoji + ' ' : ''}${message} successfully generated`);
  } catch (e) {
    oraMethods.fail(`${message} generation failed`);
    return Promise.reject(e);
  }
}
