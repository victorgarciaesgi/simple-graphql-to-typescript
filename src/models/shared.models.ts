export type Dictionnary<T = any> = { [x: string]: T };

export interface SgtsConfig {
  generate?: string;
  endpoint?: string;
  json?: string;
  output?: string;
  header?: string;
  customScalars?: Dictionnary<string>;
  prefix?: string;
  suffix?: string;
  jsMode?: boolean;
  download?: string;
  codegenMethods?: boolean;
  codegenHooks?: boolean;
  codegenTemplates?: boolean;
}
