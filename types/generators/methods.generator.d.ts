import { Field, Type, MethodType } from '../models';
export declare const createMethodsArgs: (field: Field, prefix?: string | undefined, suffix?: string | undefined) => {
    GQLVariables: string[];
    GQLArgs: string[];
    methodArgsType: string;
};
interface GraphQLFunctionArgs {
    field: Field;
    prefix?: string;
    suffix?: string;
    ObjectTypes: Type[];
    type: MethodType;
    renderedFragmentInner: string;
}
export declare const createGraphQLFunction: ({ field, ObjectTypes, prefix, suffix, type, renderedFragmentInner, }: GraphQLFunctionArgs) => string;
export declare type buildMethodsArgs = {
    field: Field;
    type: MethodType;
    ObjectTypes: Type[];
    mode?: 'methods' | 'hooks' | 'template';
    prefix?: string;
    suffix?: string;
};
export declare const buildMethod: ({ field, type, ObjectTypes, mode, prefix, suffix, }: buildMethodsArgs) => string;
export {};
