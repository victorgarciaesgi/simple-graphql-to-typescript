import { GraphQLJSONSchema } from '../models';
interface createMethodsArgs {
    schema: GraphQLJSONSchema;
    prefix?: string;
    suffix?: string;
    apolloHooks?: boolean;
}
export declare const createMethods: ({ schema, apolloHooks, prefix, suffix }: createMethodsArgs) => Promise<string>;
export declare function retrieveQueriesList({ schema, ...rest }: createMethodsArgs & {
    withGqlQueries?: boolean;
}): [string[], string[]];
export declare function createGqlQueries(schema: GraphQLJSONSchema, prefix?: string, suffix?: string): string;
export {};
