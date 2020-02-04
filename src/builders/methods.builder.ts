import { Field, GraphQLJSONSchema, Schema } from '../models';
import { buildMethod } from '../generators';
import { withMethodsTemplate, withDefinitionsTemplate, withReactHooksTemplate } from '../templates';

interface CreateMethodsArgs {
  schema: GraphQLJSONSchema;
  prefix?: string;
  suffix?: string;
  mode?: 'methods' | 'hooks' | 'template';
}

export const createMethods = async ({ schema, prefix, suffix, mode }: CreateMethodsArgs) => {
  const [queries, mutations] = retrieveQueriesList({
    schema,
    prefix,
    suffix,
    mode,
  });

  if (mode === 'hooks') {
    return withReactHooksTemplate(queries, mutations);
  } else if (mode === 'methods') {
    return withMethodsTemplate(queries, mutations);
  } else {
    return withDefinitionsTemplate(queries, mutations);
  }
};

/** Returns the list of Queries and Mutations from a schema */
export function retrieveQueriesList({ schema, ...rest }: CreateMethodsArgs): [string[], string[]] {
  const QueryType = schema.__schema.queryType.name;
  const MutationType = schema.__schema.mutationType ? schema.__schema.mutationType.name : '';
  let listQueries = schema.__schema.types.find(f => f.name === QueryType)?.fields ?? [];

  let listMutations: Field[] = [];
  if (MutationType) {
    listMutations = schema.__schema.types.find(f => f.name === MutationType)?.fields ?? [];
  }

  const ObjectTypes = schema.__schema.types.filter(f => f.kind === 'OBJECT');

  const queries = listQueries
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(query => {
      const type = {
        little: 'query' as const,
        high: 'Query' as const,
      };
      return buildMethod({ field: query, type, ...rest, ObjectTypes });
    });

  const mutations = listMutations
    .filter(mutation => !/^_{1,2}/.test(mutation.name))
    .map(mutation => {
      const type = {
        little: 'mutation' as const,
        high: 'Mutation' as const,
      };
      return buildMethod({ field: mutation, type, ...rest, ObjectTypes });
    });

  return [queries, mutations];
}
