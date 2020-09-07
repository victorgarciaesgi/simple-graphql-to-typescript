import { SgtsConfig } from './models';
export declare function sgtsGenerate({ endpoint, json, output, customScalars, header, prefix, suffix, jsMode, codegenMethods, codegenReactHooks, codegenVueHooks, codegenTemplates, download, genFragments, }: SgtsConfig): Promise<string | undefined>;
