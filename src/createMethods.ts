import { buildMethod } from './helpers';

export const createMethods = async ({ schema, prefix, suffix }) => {
  const QueryType = schema.__schema.queryType.name;
  const MutationType = schema.__schema.mutationType.name;
  const listQueries = schema.__schema.types.find(f => f.name === QueryType).fields;
  const listMutations = schema.__schema.types.find(f => f.name === MutationType).fields;

  const queries = listQueries
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(query => {
      const type = {
        little: 'query',
        high: 'Query',
      };
      return buildMethod(query, type, prefix, suffix);
    });
  const mutations = listMutations
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(mutation => {
      const type = {
        little: 'mutation',
        high: 'Mutation',
      };
      return buildMethod(mutation, type, prefix, suffix);
    });

  const finalMethods = `
  import ApolloClient, { QueryOptions, OperationVariables, MutationOptions } from 'apollo-client';
  import { OperationDefinitionNode, DocumentNode } from 'graphql';
  import graphQlTag from 'graphql-tag';

  interface AbordableRequest<T> {
    abort: () => void;
    get: () => Promise<T>;
  }
  export interface Fragmentable<T> {
    $fragment(fragment: string | DocumentNode): Promise<AbordableRequest<T>>;
  }

  export const apiProvider = (apolloClient: ApolloClient<any>) => {
    const abortableQuery = <T>(query: QueryOptions<OperationVariables>): AbordableRequest<T> => {
      const controller = new AbortController();
      const signal = controller.signal;

      return {
        abort: () => controller.abort(),
        get: async () => {
          try {
            const { data, errors } = await apolloClient.query({
              ...query,
              context: {
                fetchOptions: {
                  signal,
                },
              },
            });
            const parsedQuery = query.query.definitions[0] as OperationDefinitionNode;
            const queryName = parsedQuery.name.value;
            if (data) {
              return Promise.resolve(data[queryName]);
            } else {
              return Promise.reject(errors);
            }
          } catch (e) {
            return Promise.reject(e);
          }
        },
      };
    };
    const abortableMutation = <T>(
      mutation: MutationOptions<OperationVariables>
    ): AbordableRequest<T> => {
      const controller = new AbortController();
      const signal = controller.signal;

      return {
        abort: () => controller.abort(),
        get: async () => {
          try {
            const { data, errors } = await apolloClient.mutate({
              ...mutation,
              context: {
                fetchOptions: {
                  signal,
                },
              },
            });
            const parsedQuery = mutation.mutation.definitions[0] as OperationDefinitionNode;
            const mutationName = parsedQuery.name.value;
            if (data) {
              return Promise.resolve(data[mutationName]);
            } else {
              return Promise.reject(errors);
            }
          } catch (e) {
            return Promise.reject(e);
          }
        },
      };
    };

    return {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  };

  `;
  return finalMethods;
};
