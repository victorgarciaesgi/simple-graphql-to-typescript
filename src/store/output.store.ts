import { Dictionnary } from '../models';
import { sharedTemplate } from 'src/templates/shared.template';
import { defineImports } from 'src/templates';

class OutputConstructor {
  private signature = sharedTemplate;

  getRenderedFileString(): string {
    const IMPORTS = defineImports();
  }
}

export const OutputStore = new OutputConstructor();
