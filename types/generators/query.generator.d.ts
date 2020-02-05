import { Field, MethodType } from '../models';
interface QueryBuilderArgs {
    isScalar: boolean;
    field: Field;
    type: MethodType;
    renderedFragmentInner: string;
}
export declare const queryBuilder: ({ isScalar, field, type, renderedFragmentInner, }: QueryBuilderArgs) => string;
interface CreateQueryFunctionArgs {
    field: Field;
    type: MethodType;
    renderedFragmentInner: string;
}
export declare const createQueryFunction: ({ field, type, renderedFragmentInner, }: CreateQueryFunctionArgs) => string;
export {};
