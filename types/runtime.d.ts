interface generatePayload {
    endpoint?: string;
    json?: string;
    output?: string;
    header?: string;
    prefix?: string;
    suffix?: string;
    removeNodes?: boolean;
    customScalars?: {
        [x: string]: string;
    };
}
export declare function sgtsGenerate({ endpoint, json, output, customScalars, header, prefix, removeNodes, suffix, }: generatePayload): Promise<string>;
export {};
