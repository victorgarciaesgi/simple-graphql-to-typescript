import { GraphQLJSONSchema } from '../models';
interface CreateMethodsArgs {
    schema: GraphQLJSONSchema;
    prefix?: string;
    suffix?: string;
    mode?: 'methods' | 'hooks' | 'template';
}
export declare const createMethods: ({ schema, prefix, suffix, mode }: CreateMethodsArgs) => Promise<string>;
export declare function retrieveQueriesList({ schema, ...rest }: CreateMethodsArgs): [string[], string[]];
export {};
