export declare const evaluateType: (field: any) => {
    isOptional: boolean;
    isArray: boolean;
    isArrayOptional: boolean;
    isEdge: boolean;
    isScalar: boolean;
    typeName: string;
};
export declare const getOneTSType: ({ field, prefix, suffix }: {
    field: any;
    prefix: any;
    suffix: any;
}) => any;
export declare const getObjectTSInterfaces: (object: any, prefix: string, suffix: string) => string;
export declare const getQueriesArgsTSInterfaces: (object: any, prefix: string, suffix: string) => string;
export declare const getObjectGQLTypesArgs: (field: any) => string;
export declare const buildMethod: (data: any, type: any, prefix: any, suffix: any) => string;
