import { defineImports, sharedTemplate } from '@templates';
import {
  buildCodeGenFunctions,
  buildFragments,
  buildMethodsArgsTypes,
  buildSchemaTypes,
} from '@builders';

class OutputConstructor {
  private signature = sharedTemplate;
  private interfaces: string[] = [];

  getRenderedFileString() {
    const IMPORTS = defineImports();
    const INTERFACES = buildSchemaTypes();
    const FUNCTION_ARGS = buildMethodsArgsTypes();
  }
}

export const OutputStore = new OutputConstructor();
