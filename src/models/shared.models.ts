export type Dictionnary<T = any> = { [x: string]: T };
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
export type ObjectLiteral<K extends string = string, V = any> = Record<K, V>;
export type SgtsConfig = {
  generate?: string;
  output?: string;
  header?: string;
  customScalars?: Dictionnary<string>;
  prefix?: string;
  suffix?: string;
  jsMode?: boolean;
  download?: string;
  codegenFunctions?: boolean;
  codegenReactHooks?: boolean;
  codegenVueHooks?: boolean;
  codegenTemplates?: boolean;
  genFragments?: boolean;
  apolloVersion?: 2 | 3;
  tsCheck?: boolean;
  disableConnectionFragment?: boolean;
} & AtLeastOne<{ endpoint: string; json: string }>;

export enum CodeGenType {
  METHODS = 'methods',
  REACT_HOOKS = 'react-hooks',
  VUE_HOOKS = 'vue-hooks',
  TEMPLATE = 'template',
}
