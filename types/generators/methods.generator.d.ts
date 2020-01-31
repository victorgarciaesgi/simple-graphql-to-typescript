import { Field, Type, MethodType } from '../models';
export declare const createMethodsArgs: (field: Field, prefix?: string | undefined, suffix?: string | undefined) => {
    GQLVariables: string[];
    GQLArgs: string[];
    methodArgsType: string;
};
interface graphQLFunctionArgs {
    field: Field;
    prefix?: string;
    suffix?: string;
    ObjectTypes: Type[];
    type: MethodType;
    renderedFragmentInner: string;
}
export declare const createGraphQLFunction: ({ field, ObjectTypes, prefix, suffix, type, renderedFragmentInner, }: graphQLFunctionArgs) => string;
export declare type buildMethodsArgs = {
    field: Field;
    type: MethodType;
    ObjectTypes: Type[];
    withGqlQueries?: boolean;
    apolloHooks?: boolean;
    prefix?: string;
    suffix?: string;
};
export declare const buildMethod: ({ field, type, ObjectTypes, withGqlQueries, apolloHooks, prefix, suffix, }: buildMethodsArgs) => string;
export {};
