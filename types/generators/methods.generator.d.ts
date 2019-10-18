import { Field, Type, MethodType } from '../models';
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
    renderedFragmentInner: string;
}
export declare const createGraphQLFunction: ({ field, ObjectTypes, prefix, suffix, type, scalarList, renderedFragmentInner, }: ScalarArgs) => string;
export declare const buildMethod: (field: Field, type: MethodType, prefix: string, suffix: string, ObjectTypes: Type[], scalarList: {
    [x: string]: string;
}, onlyDefinition: boolean) => string;
export {};
