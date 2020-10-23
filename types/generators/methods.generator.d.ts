import { Field, MethodType, CodeGenType } from '../models';
interface GraphQLFunctionArgs {
    field: Field;
    functionType: MethodType;
    innerFragment: string;
}
export declare function createGraphQLFunction({ field, functionType, innerFragment, }: GraphQLFunctionArgs): string;
declare type generateFunctionArgs = {
    field: Field;
    functionType: MethodType;
    mode?: CodeGenType;
};
export declare function generateFunction({ field, functionType, mode }: generateFunctionArgs): string;
export {};
