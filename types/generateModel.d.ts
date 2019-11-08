import { GraphQLJSONSchema } from './models';
export declare let scalarList: {
    [x: string]: string;
};
export declare const generate: (schema: GraphQLJSONSchema, prefix: string, suffix: string, customScalars: {
    [x: string]: string;
}, generateMethods?: boolean, apolloHooks?: boolean, withGqlQueries?: boolean) => Promise<string>;
