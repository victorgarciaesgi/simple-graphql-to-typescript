import { GraphQLJSONSchema } from './models/schema.models';
export declare let scalarList: {
    [x: string]: string;
};
export declare const generate: (schema: GraphQLJSONSchema, prefix: string, suffix: string, customScalars: {
    [x: string]: string;
}, generateMethods?: boolean) => Promise<string>;
