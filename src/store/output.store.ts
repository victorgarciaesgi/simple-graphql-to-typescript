import { defineImports, sharedTemplate } from '@templates';
import {
  buildCodeGenFunctions,
  buildFragments,
  buildMethodsArgsTypes,
  buildSchemaTypes,
} from '@builders';
import { ParametersStore } from './parameters.store';
import { CodeGenType } from '@models';
import ora from 'ora';

class OutputConstructor {
  private signature = sharedTemplate;
  private loader = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');

  getRenderedFileString(): string {
    this.loader.start();
    try {
      const {
        genFragments,
        codegenFunctions,
        codegenReactHooks,
        codegenTemplates,
        codegenVueHooks,
      } = ParametersStore;
      const IMPORTS = defineImports();
      const INTERFACES = buildSchemaTypes();
      const FUNCTION_ARGS = buildMethodsArgsTypes();

      let FRAGMENTS: string[] = [];
      let CODEGEN_FUNCTIONS = '';
      let CODEGEN_REACT_HOOKS = '';
      let CODEGEN_VUE_HOOKS = '';
      let CODEGEN_TEMPLATES = '';

      if (genFragments) FRAGMENTS = buildFragments();
      if (codegenFunctions) CODEGEN_FUNCTIONS = buildCodeGenFunctions(CodeGenType.METHODS);
      if (codegenReactHooks) CODEGEN_REACT_HOOKS = buildCodeGenFunctions(CodeGenType.REACT_HOOKS);
      if (codegenVueHooks) CODEGEN_VUE_HOOKS = buildCodeGenFunctions(CodeGenType.VUE_HOOKS);
      if (codegenTemplates) CODEGEN_TEMPLATES = buildCodeGenFunctions(CodeGenType.TEMPLATE);

      this.loader.succeed(`📝 Schema transpiled to Typescript`);

      return `
      ${this.signature}
      ${IMPORTS}
      ${INTERFACES.join('\n')}
      ${FUNCTION_ARGS.join('\n')}
      ${FRAGMENTS.join('\n')}
      ${CODEGEN_FUNCTIONS}
      ${CODEGEN_REACT_HOOKS}
      ${CODEGEN_VUE_HOOKS}
      ${CODEGEN_TEMPLATES}
    `;
    } catch (e) {
      this.loader.fail('Transpiling failed');
      return e;
    }
  }
}

export const OutputStore = new OutputConstructor();
