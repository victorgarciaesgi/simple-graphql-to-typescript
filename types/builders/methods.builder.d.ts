import { GraphQLJSONSchema } from '../models/schema.models';
export declare const createMethods: ({ schema, prefix, suffix, scalarList, }: {
    schema: GraphQLJSONSchema;
    prefix: string;
    suffix: string;
    scalarList: {
        [x: string]: string;
    };
}) => Promise<string>;
