import { SgtsConfig } from './models';
export declare function sgtsGenerate({ endpoint, json, output, customScalars, headers, prefix, suffix, jsMode, generateMethods, apolloHooks, withGqlQueries, download, }: SgtsConfig): Promise<string | undefined>;
