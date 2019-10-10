interface generatePayload {
    endpoint?: string;
    json?: string;
    output?: string;
    header?: string;
    prefix?: string;
    suffix?: string;
    removeNodes?: boolean;
    jsMode?: boolean;
    customScalars?: {
        [x: string]: string;
    };
    generateMethods?: boolean;
}
export declare function sgtsGenerate({ endpoint, json, output, customScalars, header, prefix, removeNodes, suffix, jsMode, generateMethods, }: generatePayload): Promise<string>;
export {};
