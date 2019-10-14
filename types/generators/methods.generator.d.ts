import { Field, Type, MethodType } from '../models/schema.models';
export declare const createMethodsArgs: (field: Field, prefix: string, suffix: string) => {
    GQLVariables: string[];
    GQLArgs: string[];
    methodArgsType: string;
};
interface ScalarArgs {
    field: Field;
    prefix: string;
    suffix: string;
    ObjectTypes: Type[];
    type: MethodType;
    scalarList: {
        [x: string]: string;
    };
}
export declare const createGraphQLFunction: ({ field, ObjectTypes, prefix, suffix, type, scalarList, }: ScalarArgs) => string;
export declare const buildMethod: (field: Field, type: MethodType, prefix: string, suffix: string, ObjectTypes: Type[], scalarList: {
    [x: string]: string;
}) => string;
export {};
