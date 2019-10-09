import { Field, Type, InputField, Arg } from './schemaModel';
export declare const evaluateType: (field: Arg | Field | InputField) => {
    isOptional: boolean;
    isArray: boolean;
    isArrayOptional: boolean;
    isEdge: boolean;
    isScalar: boolean;
    typeName: string;
};
export declare const getOneTSType: ({ field, prefix, suffix, }: {
    field: Arg | Field | InputField;
    prefix: string;
    suffix: string;
}) => string;
export declare const getObjectTSInterfaces: (object: Type, prefix: string, suffix: string) => string;
export declare const getQueriesArgsTSInterfaces: (object: Field, prefix: string, suffix: string) => string;
export declare const getObjectGQLTypesArgs: (field: Arg) => string;
export declare const buildMethod: (data: Field, type: {
    little: "query" | "mutation";
    high: "Query" | "Mutation";
}, prefix: string, suffix: string) => string;
