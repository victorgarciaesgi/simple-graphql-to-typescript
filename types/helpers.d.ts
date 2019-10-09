import { Field, Type, InputField, Arg } from './schemaModel';
export declare const evaluateType: (field: Field | InputField | Arg) => {
    isOptional: boolean;
    isArray: boolean;
    isArrayOptional: boolean;
    isEdge: boolean;
    isScalar: boolean;
    typeName: string;
};
export declare const getOneTSType: ({ field, prefix, suffix, }: {
    field: Field | InputField | Arg;
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
