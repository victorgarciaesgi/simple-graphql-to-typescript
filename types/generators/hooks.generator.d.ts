import { Field, MethodType } from "../models";
interface GraphQLFunctionArgs {
    field: Field;
    functionType: MethodType;
    innerFragment: string;
}
export declare const createReactApolloHook: ({ field, functionType, innerFragment, }: GraphQLFunctionArgs) => string;
export declare const createVueApolloHook: ({ field, functionType, innerFragment, }: GraphQLFunctionArgs) => string;
export {};
