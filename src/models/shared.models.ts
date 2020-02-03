export type Dictionnary<T = any> = { [x: string]: T };

export interface SgtsConfig {
  generate?: string;
  endpoint?: string;
  json?: string;
  output?: string;
  generateMethods?: boolean;
  apolloHooks?: boolean;
  headers?: string;
  customScalars?: Dictionnary<string>;
  withGqlQueries?: boolean;
  prefix?: string;
  suffix?: string;
  jsMode?: boolean;
  download?: string;
}
