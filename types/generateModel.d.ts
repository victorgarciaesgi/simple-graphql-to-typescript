export declare let scalarList: {
    ID: string;
    String: string;
    Int: string;
    Float: string;
    Upload: string;
    Boolean: string;
    Json: string;
};
export declare const generate: (schema: {
    [x: string]: any;
}, outfile: string, prefix: string, suffix: string, removeNodes: boolean, customScalars: {
    [x: string]: string;
}, generateMethods: boolean) => Promise<string>;
