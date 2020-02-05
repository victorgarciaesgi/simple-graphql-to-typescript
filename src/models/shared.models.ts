export type Dictionnary<T = any> = { [x: string]: T };
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type SgtsConfig = {
  generate?: string;
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
} & AtLeastOne<{ endpoint: string; json: string }>;
