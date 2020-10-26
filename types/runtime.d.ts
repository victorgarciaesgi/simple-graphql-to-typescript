import { SgtsConfig } from "./models/index";
export declare function sgtsGenerate({ endpoint, json, output, customScalars, header, jsMode, download, ...rest }: SgtsConfig): Promise<string | undefined>;
