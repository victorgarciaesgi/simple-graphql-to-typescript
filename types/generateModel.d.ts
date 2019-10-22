import { GraphQLJSONSchema } from './models';
export declare let scalarList: {
    [x: string]: string;
};
export declare const generate: (schema: GraphQLJSONSchema, prefix: string, suffix: string, customScalars: {
    [x: string]: string;
}, generateMethods?: boolean, onlyDefinition?: boolean, jsMode?: boolean, apolloHooks?: boolean) => Promise<string>;
