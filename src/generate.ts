import ora from 'ora';
import { generateInterfaces, generateMethodsArgsTypes } from './generators';
import { GraphQLJSONSchema, Field, CodeGenType, Schema } from './models';
import { createMethods } from './builders';
import { sharedTemplate } from './templates/shared.template';
import { ParametersStore } from './store/parameters.store';
import { defineImports } from './templates';

const generatedInterfaces = {
  codeGen: '',
  OBJECT: [] as string[],
  ENUM: [] as string[],
  METHODS_ARGS: [] as string[],
};

const transpile = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');

export const generate = async (
  schema: GraphQLJSONSchema,
  prefix?: string,
  suffix?: string,
  customScalars?: { [x: string]: string },
  codegenMethods?: boolean,
  codegenReactHooks?: boolean,
  codegenVueHooks?: boolean,
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
      codeGenerateFromConfig({
        schema,
        mode: 'methods',
        message: 'queries and mutations',
        emoji: '🧬',
      });
    }
    if (codegenReactHooks) {
      codeGenerateFromConfig({ schema, mode: 'react-hooks', message: 'React hooks', emoji: '⚛️ ' });
    }
    if (codegenVueHooks) {
      codeGenerateFromConfig({ schema, mode: 'vue-hooks', message: 'Vue Hooks', emoji: '🅅 ' });
    }
    if (codegenTemplates) {
      codeGenerateFromConfig({ schema, mode: 'template', message: 'templates' });
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

      ${generatedInterfaces.OBJECT.join('\n')}
      ${generatedInterfaces.ENUM.join('\n')}
      ${generatedInterfaces.METHODS_ARGS.join('\n')}
      ${imports}
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
    generatedInterfaces.codeGen += methods;
    oraMethods.succeed(`${emoji} ${message} successfully generated`);
  } catch (e) {
    oraMethods.fail(`${message} generation failed`);
    return Promise.reject(e);
  }
}
