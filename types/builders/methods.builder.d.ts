import { GraphQLJSONSchema } from '../models';
export declare const createMethods: ({ schema, prefix, suffix, scalarList, onlyDefinition, }: {
    schema: GraphQLJSONSchema;
    prefix: string;
    suffix: string;
    scalarList: {
        [x: string]: string;
    };
    onlyDefinition: boolean;
}) => Promise<string>;
