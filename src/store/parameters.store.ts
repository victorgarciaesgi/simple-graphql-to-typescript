import { Dictionnary } from '@models';

interface SetParametersArgs {
  scalars?: Dictionnary<string>;
  prefix?: string;
  suffix?: string;
  genFragments?: boolean;
  codegenFunctions?: boolean;
  codegenReactHooks?: boolean;
  codegenTemplates?: boolean;
  codegenVueHooks?: boolean;
  apolloVersion?: 2 | 3;
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
  public codegenFunctions = false;
  public codegenReactHooks = false;
  public codegenTemplates = false;
  public codegenVueHooks = false;
  public apolloVersion = 3;

  get isCodeGen(): boolean {
    return (
      this.codegenReactHooks ||
      this.codegenFunctions ||
      this.codegenTemplates ||
      this.codegenVueHooks
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
    this.genFragments = !!data.genFragments;
    this.codegenFunctions = !!data.codegenFunctions;
    this.codegenReactHooks = !!data.codegenReactHooks;
    this.codegenVueHooks = !!data.codegenVueHooks;
    this.codegenTemplates = !!data.codegenTemplates;
    this.apolloVersion = data.apolloVersion ?? 3;
  }

  get listScalars() {
    return this.defaultScalars;
  }
}

export const ParametersStore = new ParametersConstructor();
