import { Field, MethodType } from '../models';
interface GraphQLFunctionArgs {
    field: Field;
    type: MethodType;
    renderedFragmentInner: string;
}
export declare const createReactApolloHook: ({ field, type, renderedFragmentInner, }: GraphQLFunctionArgs) => string;
export declare const createVueApolloHook: ({ field, type, renderedFragmentInner, }: GraphQLFunctionArgs) => string;
export {};
