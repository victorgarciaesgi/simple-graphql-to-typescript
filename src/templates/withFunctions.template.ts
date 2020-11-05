import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withFunctionsTemplate = (queries: string[], mutations: string[]): string => {
  return `

  interface Abortable {
    $abort(): void;
  }
  interface WithArgs<T, A> {
    $args(args: A): ExecutableQuery<T>;
  }
  interface Loadable {
    loading: boolean;
  }
  interface Executable<T> {
    $fetch(): Promise<T>;
  }
  
  export interface QueryWithArgs<T, A> extends WithArgs<T, A>, Abortable, Loadable {}
  export interface QueryWithOptionalArgs<T, A> extends QueryWithArgs<T, A>, Executable<T> {}
  
  export interface ExecutableQuery<T> extends Abortable, Loadable, Executable<T> {}
  export interface ExecutableQueryWithArgs<T, A> extends QueryWithArgs<T, A> {}
  export interface ExecutableQueryWithOptionalArgs<T, A> extends QueryWithOptionalArgs<T, A> {}
  
  
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
      let loading = false;

      function $abort() {
        if (observableQuery && !observableQuery.closed) {
          observableQuery.unsubscribe();
        }
      }
      async function $fetch() {
        loading = true;
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
            error: (error) => reject(error),
            complete: () => {
              loading = false;
            },
          });
        });
      }
      function $args(args) {
        variables = args;
        return {
          $abort,
          $fetch,
          loading
        };
      }
      if (args && !optionalArgs) {
        return {
          $abort,
          $args,
          loading
        } as any;
      } else if (optionalArgs) {
        return {
          $abort,
          $args,
          $fetch,
          loading
        } as any;
      } else {
        return {
          $abort,
          $fetch,
          loading
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
