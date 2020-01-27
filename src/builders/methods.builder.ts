import { Field, GraphQLJSONSchema, Schema } from '../models';
import { buildMethod } from '../generators';
import { withApolloTemplate, withDefinitionsTemplate, withReactHooksTemplate } from '../templates';

interface createMethodsArgs {
  schema: GraphQLJSONSchema;
  prefix?: string;
  suffix?: string;
  scalarList: { [x: string]: string };
  apolloHooks?: boolean;
}

export const createMethods = async ({
  schema,
  scalarList,
  apolloHooks,
  prefix,
  suffix,
}: createMethodsArgs) => {
  const [queries, mutations] = retrieveQueriesList({
    schema,
    scalarList,
    apolloHooks,
    prefix,
    suffix,
  });

  if (apolloHooks) {
    return withReactHooksTemplate(queries, mutations);
  } else {
    return withApolloTemplate(queries, mutations);
  }
};

export function retrieveQueriesList({
  schema,
  ...rest
}: createMethodsArgs & { withGqlQueries?: boolean }): [string[], string[]] {
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

export function createGqlQueries(
  schema: GraphQLJSONSchema,
  scalarList: { [x: string]: string },
  prefix?: string,
  suffix?: string
) {
  const [queries, mutations] = retrieveQueriesList({
    schema,
    scalarList,
    withGqlQueries: true,
    prefix,
    suffix,
  });

  return withDefinitionsTemplate([...queries, ...mutations]);
}
