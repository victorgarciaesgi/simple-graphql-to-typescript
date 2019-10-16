import { Field, GraphQLJSONSchema } from '../models/schema.models';
import { oc } from 'ts-optchain';
import { buildMethod } from '../generators/methods.generator';

export const createMethods = async ({
  schema,
  prefix,
  suffix,
  scalarList,
}: {
  schema: GraphQLJSONSchema;
  prefix: string;
  suffix: string;
  scalarList: { [x: string]: string };
}) => {
  const QueryType = schema.__schema.queryType.name;
  const MutationType = schema.__schema.mutationType ? schema.__schema.mutationType.name : '';
  const listQueries = schema.__schema.types.find(f => f.name === QueryType).fields;
  let listMutations: Field[] = [];
  if (MutationType) {
    listMutations = schema.__schema.types.find(f => f.name === MutationType).fields;
  }
  const objectTypes = oc(schema)
    .__schema.types()
    .filter(f => f.kind === 'OBJECT');
  const queries = listQueries
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(query => {
      const type = {
        little: 'query' as const,
        high: 'Query' as const,
      };
      return buildMethod(query, type, prefix, suffix, objectTypes, scalarList);
    });
  const mutations = listMutations
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(mutation => {
      const type = {
        little: 'mutation' as const,
        high: 'Mutation' as const,
      };
      return buildMethod(mutation, type, prefix, suffix, objectTypes, scalarList);
    });

  const finalMethods = `
  import ApolloClient, { QueryOptions, OperationVariables, MutationOptions, ObservableQuery } from 'apollo-client';
  import { execute } from 'apollo-link';
  import { OperationDefinitionNode, DocumentNode } from 'graphql';
  import graphQlTag from 'graphql-tag';


  export type AbordableQueryWithArgs<T, A> = {
    $args(args: A): AbordableQuery<T>;
    $abort(): void;
  };

  export type AbordableQueryWithOptionalArgs<T, A> = {
    $fetch(): Promise<T>;
    $args(args: A): AbordableQuery<T>;
    $abort(): void;
  };
  
  export type AbordableQuery<T> = {
    $fetch(): Promise<T>;
    $abort(): void;
  };
  export interface FragmentableQueryWithArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbordableQueryWithArgs<T, A>;
  }
  export interface FragmentableQueryWithOptionalArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbordableQueryWithOptionalArgs<T, A>;
  }
  export interface FragmentableQuery<T> {
    $fragment(fragment: string | DocumentNode): AbordableQuery<T>;
  }
  
  export type AbordableMutationWithArgs<T, A> = {
    $args(args: A): AbordableMutation<T>;
    $abort(): void;
  };

  export type AbordableMutationWithOptionalArgs<T, A> = {
    $post(): Promise<T>;
    $args(args: A): AbordableMutation<T>;
    $abort(): void;
  };
  
  export type AbordableMutation<T> = {
    $post(): Promise<T>;
    $abort(): void;
  };
  
  export interface FragmentableMutationWithArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbordableMutationWithArgs<T, A>;
  }
  export interface FragmentableMutationWithOptionalArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbordableMutationWithOptionalArgs<T, A>;
  }
  export interface FragmentableMutation<T> {
    $fragment(fragment: string | DocumentNode): AbordableMutation<T>;
  }
  
  
  const guessFragmentType = (fragment: string | DocumentNode) => {
    let isString,
      isFragment = false;
    let fragmentName = '';
    if (typeof fragment === 'string') {
      isString = true;
    } else if (typeof fragment === 'object' && fragment.definitions.length) {
      isFragment = true;
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
      query: DocumentNode,
      args: boolean
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
      if (args) {
        return {
          $abort,
          $args,
        } as any;
      } else {
        return {
          $abort,
          $fetch,
        } as any;
      }
    };
    const abortableMutation = <T, A = null>(
      mutation: DocumentNode,
      args: boolean
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
      if (args) {
        return {
          $abort,
          $args,
        } as any;
      } else {
        return {
          $abort,
          $post,
        } as any;
      }
    };

    return {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  };

  `;
  return finalMethods;
};
