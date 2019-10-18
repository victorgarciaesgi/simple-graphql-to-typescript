import { Field, MethodType } from '../models';
interface QueryBuilderArgs {
    isScalar: boolean;
    field: Field;
    type: MethodType;
    prefix: string;
    suffix: string;
    renderedFragmentInner: string;
}
export declare const queryBuilder: ({ isScalar, field, type, prefix, suffix, renderedFragmentInner, }: QueryBuilderArgs) => string;
export {};
