import { Dictionnary } from '../models';

interface SetParametersArgs {
  scalars?: Dictionnary<string>;
  prefix?: string;
  suffix?: string;
  genFragments?: boolean;
  codegenMethods?: boolean;
  codegenReactHooks?: boolean;
  codegenTemplates?: boolean;
  codegenVueHooks?: boolean;
}

class ParametersConstructor {
  private defaultScalars: Dictionnary<string> = {
    ID: 'string',
    String: 'string',
    Int: 'number',
    Float: 'number',
    Upload: 'File',
    Boolean: 'boolean',
    Json: 'string',
  };
  public prefix = '';
  public suffix = '';
  public genFragments = false;
  public codegenMethods = false;
  public codegenReactHooks = false;
  public codegenTemplates = false;
  public codegenVueHooks = false;

  get isCodeGen(): boolean {
    return (
      this.codegenReactHooks || this.codegenMethods || this.codegenTemplates || this.codegenVueHooks
    );
  }

  addScalars(scalars: Dictionnary<string>): void {
    this.defaultScalars = {
      ...this.defaultScalars,
      ...scalars,
    };
  }

  setParamaters(data: SetParametersArgs): void {
    if (data.scalars) this.addScalars(data.scalars);
    if (data.prefix != null) this.prefix = data.prefix;
    if (data.suffix != null) this.suffix = data.suffix;
    if (data.genFragments) this.genFragments = data.genFragments;
  }

  get listScalars() {
    return this.defaultScalars;
  }
}

export const ParametersStore = new ParametersConstructor();
