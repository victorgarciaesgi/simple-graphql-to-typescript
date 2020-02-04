import { SgtsConfig } from './models';
export declare function sgtsGenerate({ endpoint, json, output, customScalars, header, prefix, suffix, jsMode, codegenMethods, codegenHooks, codegenTemplates, download, }: SgtsConfig): Promise<string | undefined>;
