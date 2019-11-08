import { GraphQLJSONSchema } from '../models';
interface createMethodsArgs {
    schema: GraphQLJSONSchema;
    prefix: string;
    suffix: string;
    scalarList: {
        [x: string]: string;
    };
    apolloHooks?: boolean;
}
export declare const createMethods: ({ schema, prefix, suffix, scalarList, apolloHooks, }: createMethodsArgs) => Promise<string>;
export declare function createGqlQueries(schema: GraphQLJSONSchema, prefix: string, suffix: string, scalarList: {
    [x: string]: string;
}): string;
export {};
