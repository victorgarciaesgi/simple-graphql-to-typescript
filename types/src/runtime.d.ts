import { GraphQLJSONSchema } from './models/schema.models';
interface generatePayload {
    endpoint?: string;
    json?: string;
    output?: string;
    headers?: string;
    prefix?: string;
    suffix?: string;
    removeNodes?: boolean;
    jsMode?: boolean;
    customScalars?: {
        [x: string]: string;
    };
    generateMethods?: boolean;
}
export declare function sgtsGenerate({ endpoint, json, output, customScalars, headers, prefix, suffix, jsMode, generateMethods, }: generatePayload): Promise<string>;
export declare function fetchSchemas({ endpoint, headers, json, }: {
    endpoint: string;
    headers: string;
    json: string;
}): Promise<GraphQLJSONSchema>;
export {};
