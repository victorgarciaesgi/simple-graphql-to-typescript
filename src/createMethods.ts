import { buildMethod } from './helpers';
import { GraphQLJSONSchema } from './schemaModel';

export const createMethods = async ({
  schema,
  prefix,
  suffix,
}: {
  schema: GraphQLJSONSchema;
  prefix: string;
  suffix: string;
}) => {
  const QueryType = schema.__schema.queryType.name;
  const MutationType = schema.__schema.mutationType.name;
  const listQueries = schema.__schema.types.find(f => f.name === QueryType).fields;
  const listMutations = schema.__schema.types.find(f => f.name === MutationType).fields;

  const queries = listQueries
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(query => {
      const type = {
        little: 'query' as const,
        high: 'Query' as const,
      };
      return buildMethod(query, type, prefix, suffix);
    });
  const mutations = listMutations
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(mutation => {
      const type = {
        little: 'mutation' as const,
        high: 'Mutation' as const,
      };
      return buildMethod(mutation, type, prefix, suffix);
    });

  const finalMethods = `
  import ApolloClient, { QueryOptions, OperationVariables, MutationOptions, ObservableQuery } from 'apollo-client';
  import { execute } from 'apollo-link';
  import { OperationDefinitionNode, DocumentNode } from 'graphql';
  import graphQlTag from 'graphql-tag';


  type AbordableQueryWithArgs<T, A> = {
    $args(args: A): AbordableQuery<T>;
    $fetch(): Promise<T>;
    $abort(): void;
  };
  
  type AbordableQuery<T> = {
    $fetch(): Promise<T>;
    $abort(): void;
  };
  interface FragmentableQueryWithArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbordableQueryWithArgs<T, A>;
  }
  interface FragmentableQuery<T> {
    $fragment(fragment: string | DocumentNode): AbordableQuery<T>;
  }
  
  type AbordableMutationWithArgs<T, A> = {
    $args(args: A): AbordableMutation<T>;
    $post(): Promise<T>;
    $abort(): void;
  };
  
  type AbordableMutation<T> = {
    $post(): Promise<T>;
    $abort(): void;
  };
  
  interface FragmentableMutationWithArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbordableMutationWithArgs<T, A>;
  }
  interface FragmentableMutation<T> {
    $fragment(fragment: string | DocumentNode): AbordableMutation<T>;
  }
  
  
  const guessFragmentType = (fragment: string | DocumentNode) => {
    let isString,
      isFragment = false;
    let fragmentName = '';
    if (typeof fragment === 'string') {
      isString = true;
    } else if (fragment instanceof Object && fragment.definitions) {
      isFragment = true;
      if (fragment.definitions.length > 1) {
        console.error('You can only pass one raw fragment to the function');
        return;
      }
      const definition = fragment.definitions[0];
      if (definition.kind === 'FragmentDefinition') {
        fragmentName = definition.name.value;
      } else {
        console.error(
          \`The argument passed is not a fragment definition, got \${definition.kind} instead\`
        );
        return;
      }
    }
    return { isString, isFragment, fragmentName };
  };
  
  export const apiProvider = (apolloClient: ApolloClient<any>) => {
    const abortableQuery = <T, A = null>(
      query: DocumentNode
    ): A extends null ? AbordableQuery<T> : AbordableQueryWithArgs<T, A> => {
      let observableQuery: ZenObservable.Subscription;
      const parsedQuery = query.definitions[0] as OperationDefinitionNode;
      const queryName = parsedQuery.name.value;
      let variables: { [x: string]: any } = {};
  
      function $abort() {
        if (observableQuery && !observableQuery.closed) {
          observableQuery.unsubscribe();
        }
      }
      async function $fetch() {
        return new Promise<T>((resolve, reject) => {
          observableQuery = execute(apolloClient.link, {
            query,
            variables,
          }).subscribe({
            next: ({ data, errors }) => {
              if (data) {
                resolve(data[queryName]);
              } else {
                reject(errors);
              }
            },
            error: error => reject(error),
          });
        });
      }
      function $args(args) {
        variables = args;
        return {
          $abort,
          $fetch,
        };
      }
      return {
        $abort,
        $args,
      } as any;
    };
    const abortableMutation = <T, A = null>(
      mutation: DocumentNode
    ): AbordableMutationWithArgs<T, A> => {
      let observableQuery: ZenObservable.Subscription;
      const parsedQuery = mutation.definitions[0] as OperationDefinitionNode;
      const mutationName = parsedQuery.name.value;
      let variables: { [x: string]: any } = {};
  
      function $abort() {
        if (observableQuery && !observableQuery.closed) {
          observableQuery.unsubscribe();
        }
      }
      async function $post() {
        return new Promise<T>((resolve, reject) => {
          observableQuery = execute(apolloClient.link, {
            query: mutation,
            variables,
          }).subscribe({
            next: ({ data, errors }) => {
              if (data) {
                resolve(data[mutationName]);
              } else {
                reject(errors);
              }
            },
            error: error => reject(error),
          });
        });
      }
      function $args(args) {
        variables = args;
        return {
          $abort,
          $post,
        };
      }
      return {
        $abort,
        $args,
      } as any;
    };

    return {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  };

  `;
  return finalMethods;
};
