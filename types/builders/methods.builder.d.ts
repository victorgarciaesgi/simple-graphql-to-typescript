import { Field, GraphQLJSONSchema } from '../models';
interface CreateMethodsArgs {
    schema: GraphQLJSONSchema;
    mode?: 'methods' | 'hooks' | 'template';
}
export declare const createMethods: ({ schema, mode }: CreateMethodsArgs) => Promise<string>;
export declare function retrieveQueriesList({ schema }: CreateMethodsArgs): [Field[], Field[], Field[]];
export {};
