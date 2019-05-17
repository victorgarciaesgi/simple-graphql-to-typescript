export declare const generate: (schema: {
    [x: string]: any;
}, outfile: string, prefix: string, suffix: string, removeNodes: boolean, customScalars: {
    [x: string]: any;
}[]) => Promise<string>;
