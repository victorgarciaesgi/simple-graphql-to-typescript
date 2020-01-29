import { Field, MethodType, Type } from 'src/models';
interface graphQLFunctionArgs {
    field: Field;
    prefix?: string;
    suffix?: string;
    ObjectTypes: Type[];
    type: MethodType;
    scalarList: {
        [x: string]: string;
    };
    renderedFragmentInner: string;
}
export declare const createApolloHook: ({ field, ObjectTypes, prefix, suffix, type, scalarList, renderedFragmentInner, }: graphQLFunctionArgs) => string;
export {};
