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
}, prefix: string, suffix: string, customScalars: {
    [x: string]: string;
}) => Promise<string>;
