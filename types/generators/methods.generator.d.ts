import { Field, Type, MethodType, CodeGenType } from '../models';
export declare const createMethodsArgs: (field: Field) => {
    GQLVariables: string[];
    GQLArgs: string[];
    methodArgsType: string;
};
interface GraphQLFunctionArgs {
    field: Field;
    type: MethodType;
    renderedFragmentInner: string;
}
export declare const createGraphQLFunction: ({ field, type, renderedFragmentInner, }: GraphQLFunctionArgs) => string;
export declare type buildMethodsArgs = {
    field: Field;
    type: MethodType;
    ObjectTypes: Type[];
    mode?: CodeGenType;
};
export declare const buildMethod: ({ field, type, ObjectTypes, mode }: buildMethodsArgs) => string;
export {};
