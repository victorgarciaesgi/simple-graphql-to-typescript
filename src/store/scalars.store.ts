import { Dictionnary } from 'src/models';

class ScalarStore {
  private defaultScalars: Dictionnary<string> = {
    ID: 'string',
    String: 'string',
    Int: 'number',
    Float: 'number',
    Upload: 'File',
    Boolean: 'boolean',
    Json: 'string',
  };

  addScalars(scalars: Dictionnary<string>) {
    this.defaultScalars = {
      ...this.defaultScalars,
      ...scalars,
    };
  }

  get listScalars() {
    return this.defaultScalars;
  }
}

export default new ScalarStore();
