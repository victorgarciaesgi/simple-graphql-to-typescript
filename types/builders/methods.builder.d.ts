import { GraphQLJSONSchema } from '../models';
interface createMethodsArgs {
    schema: GraphQLJSONSchema;
    prefix?: string;
    suffix?: string;
    scalarList: {
        [x: string]: string;
    };
    apolloHooks?: boolean;
}
export declare const createMethods: ({ schema, scalarList, apolloHooks, prefix, suffix, }: createMethodsArgs) => Promise<string>;
export declare function retrieveQueriesList({ schema, ...rest }: createMethodsArgs & {
    withGqlQueries?: boolean;
}): [string[], string[]];
export declare function createGqlQueries(schema: GraphQLJSONSchema, scalarList: {
    [x: string]: string;
}, prefix?: string, suffix?: string): string;
export {};
