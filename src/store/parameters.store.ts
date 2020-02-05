import { Dictionnary } from '../models';

interface SetParametersArgs {
  scalars?: Dictionnary<string>;
  prefix?: string;
  suffix?: string;
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

  addScalars(scalars: Dictionnary<string>): void {
    this.defaultScalars = {
      ...this.defaultScalars,
      ...scalars,
    };
  }

  setParamaters({ prefix, suffix, scalars }: SetParametersArgs): void {
    if (scalars) this.addScalars(scalars);
    if (prefix != null) this.prefix = prefix;
    if (suffix != null) this.suffix = suffix;
  }

  get listScalars() {
    return this.defaultScalars;
  }
}

export const ParametersStore = new ParametersConstructor();
