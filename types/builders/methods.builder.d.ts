import { Field, GraphQLJSONSchema, CodeGenType } from '../models';
interface CreateMethodsArgs {
    schema: GraphQLJSONSchema;
    mode?: CodeGenType;
}
export declare const createMethods: ({ schema, mode }: CreateMethodsArgs) => Promise<string>;
export declare function retrieveQueriesList({ schema }: CreateMethodsArgs): [Field[], Field[], Field[]];
export {};
