import { Field, Type, InputField, Arg } from './schemaModel';
export declare const evaluateType: (field: Arg | Field | InputField) => {
    isOptional: boolean;
    isArray: boolean;
    isArrayOptional: boolean;
    isEdge: boolean;
    isScalar: boolean;
    typeName: string;
    isEnum: boolean;
};
export declare const getOneTSTypeDisplay: ({ field, prefix, suffix, }: {
    field: Arg | Field | InputField;
    prefix: string;
    suffix: string;
}) => string;
export declare const getObjectTSInterfaces: (object: Type, prefix: string, suffix: string) => string;
export declare const getQueriesArgsTSInterfaces: (object: Field, prefix: string, suffix: string) => string;
export declare const createConnectionFragment: (typeName: string, allTypes: Type[], fragment: string) => string;
export declare const getObjectGQLTypesArgs: (field: Arg) => string;
export declare const createMethodsArgs: (args: Arg[], prefix: string, suffix: string) => {
    $args: any[];
    args: any[];
    variables: any[];
    tsArgs: any[];
};
export declare const buildMethod: (field: Field, type: {
    little: "query" | "mutation";
    high: "Query" | "Mutation";
}, prefix: string, suffix: string, ObjectTypes: Type[]) => string;
