interface generatePayload {
    endpoint?: string;
    json?: string;
    output?: string;
    header?: string;
    prefix?: string;
    suffix?: string;
    removeNodes?: boolean;
    watch?: boolean;
    customScalars?: {
        [x: string]: string;
    };
    generateMethods?: string;
}
export declare function sgtsGenerate({ endpoint, json, output, customScalars, header, prefix, removeNodes, suffix, generateMethods, }: generatePayload): Promise<string>;
export {};
