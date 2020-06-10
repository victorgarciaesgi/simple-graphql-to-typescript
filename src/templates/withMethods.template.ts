import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withMethodsTemplate = (queries: string[], mutations: string[]): string => {
  return `
  export type AbortableQueryWithArgs<T, A> = {
    $args(args: A): AbortableQuery<T>;
    $abort(): void;
  };

  export type AbortableQueryWithOptionalArgs<T, A> = {
    $fetch(): Promise<T>;
    $args(args: A): AbortableQuery<T>;
    $abort(): void;
  };
  
  export type AbortableQuery<T> = {
    $fetch(): Promise<T>;
    $abort(): void;
  };
  export interface FragmentableQueryWithArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbortableQueryWithArgs<T, A>;
  }
  export interface FragmentableQueryWithOptionalArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbortableQueryWithOptionalArgs<T, A>;
  }
  export interface FragmentableQuery<T> {
    $fragment(fragment: string | DocumentNode): AbortableQuery<T>;
  }
  
  export type AbortableMutationWithArgs<T, A> = {
    $args(args: A): AbortableMutation<T>;
    $abort(): void;
  };

  export type AbortableMutationWithOptionalArgs<T, A> = {
    $post(): Promise<T>;
    $args(args: A): AbortableMutation<T>;
    $abort(): void;
  };
  
  export type AbortableMutation<T> = {
    $post(): Promise<T>;
    $abort(): void;
  };
  
  export interface FragmentableMutationWithArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbortableMutationWithArgs<T, A>;
  }
  export interface FragmentableMutationWithOptionalArgs<T, A> {
    $fragment(fragment: string | DocumentNode): AbortableMutationWithOptionalArgs<T, A>;
  }
  export interface FragmentableMutation<T> {
    $fragment(fragment: string | DocumentNode): AbortableMutation<T>;
  }
  
  
  export const apiProvider = (apolloClient: ApolloClient<any>) => {
    const abortableQuery = <T, A = null>(
      query: DocumentNode,
      args: boolean,
      optionalArgs: boolean
    ): A extends null ? AbortableQuery<T> : AbortableQueryWithArgs<T, A> => {
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
              if (errors) {
                reject(errors);
              } else {
                resolve(data[queryName]);
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
      if (args && !optionalArgs) {
        return {
          $abort,
          $args,
        } as any;
      } else if (optionalArgs) {
        return {
          $abort,
          $args,
          $fetch,
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
      args: boolean,
      optionalArgs: boolean
    ): AbortableMutationWithArgs<T, A> => {
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
              if (errors) {
                reject(errors);
              } else {
                resolve(data[mutationName]);
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
      if (args && !optionalArgs) {
        return {
          $abort,
          $args,
        } as any;
      } else if (optionalArgs) {
        return {
          $abort,
          $args,
          $post,
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
