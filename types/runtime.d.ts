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
    apolloHooks?: boolean;
    download?: string;
    withGqlQueries?: boolean;
}
export declare function sgtsGenerate({ endpoint, json, output, customScalars, headers, prefix, suffix, jsMode, generateMethods, apolloHooks, withGqlQueries, download, }: generatePayload): Promise<string | undefined>;
export {};
