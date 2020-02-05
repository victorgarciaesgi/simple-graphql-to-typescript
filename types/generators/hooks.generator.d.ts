import { Field, MethodType } from '../models';
interface GraphQLFunctionArgs {
    field: Field;
    type: MethodType;
    renderedFragmentInner: string;
}
export declare const createApolloHook: ({ field, type, renderedFragmentInner, }: GraphQLFunctionArgs) => string;
export {};
