import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withApolloTemplate = (queries: string[], mutations: string[]): string => {
  return `  import ApolloClient, { QueryOptions, OperationVariables, MutationOptions, ObservableQuery } from 'apollo-client';
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
  
  
  ${guessFragmentTypeTemplate}
  
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
};
