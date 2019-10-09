import { GraphQLJSONSchema } from './schemaModel';
export declare const createMethods: ({ schema, prefix, suffix, }: {
    schema: GraphQLJSONSchema;
    prefix: string;
    suffix: string;
}) => Promise<string>;
