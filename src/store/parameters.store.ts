import { Dictionnary } from '../models';

interface SetParametersArgs {
  scalars?: Dictionnary<string>;
  prefix?: string;
  suffix?: string;
  genFragments?: boolean;
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

  addScalars(scalars: Dictionnary<string>): void {
    this.defaultScalars = {
      ...this.defaultScalars,
      ...scalars,
    };
  }

  setParamaters({ prefix, suffix, scalars, genFragments }: SetParametersArgs): void {
    if (scalars) this.addScalars(scalars);
    if (prefix != null) this.prefix = prefix;
    if (suffix != null) this.suffix = suffix;
    if (genFragments) this.genFragments = genFragments;
  }

  get listScalars() {
    return this.defaultScalars;
  }
}

export const ParametersStore = new ParametersConstructor();
