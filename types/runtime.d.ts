import { GraphQLJSONSchema } from './models';
interface generatePayload {
    endpoint?: string;
    json?: string;
    output?: string;
    headers?: string;
    prefix?: string;
    suffix?: string;
    jsMode?: boolean;
    customScalars?: {
        [x: string]: string;
    };
    generateMethods?: boolean;
    onlyDefinition: boolean;
    apolloHooks: boolean;
}
export declare function sgtsGenerate({ endpoint, json, output, customScalars, headers, prefix, suffix, jsMode, generateMethods, onlyDefinition, apolloHooks, }: generatePayload): Promise<string>;
export declare function fetchSchemas({ endpoint, headers, json, }: {
    endpoint: string;
    headers: string;
    json: string;
}): Promise<GraphQLJSONSchema>;
export {};
