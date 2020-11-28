import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withFunctionsTemplate = (queries: string[], mutations: string[]): string => {
  return `

  interface Abortable {
    $abort(): void;
  }
  interface WithArgs<T, A> {
    $args(args: A): ExecutableQuery<T>;
  }
  interface Pendable {
    pending: boolean;
  }
  interface Executable<T> {
    $fetch(): Promise<T>;
  }
  
  export interface QueryWithArgs<T, A> extends WithArgs<T, A>, Abortable, Pendable {}
  export interface QueryWithOptionalArgs<T, A> extends QueryWithArgs<T, A>, Executable<T> {}
  
  export interface ExecutableQuery<T> extends Abortable, Pendable, Executable<T> {}
  export interface ExecutableQueryWithArgs<T, A> extends QueryWithArgs<T, A> {}
  export interface ExecutableQueryWithOptionalArgs<T, A> extends QueryWithOptionalArgs<T, A> {}
  
  export const apiProvider = (apolloClient: ApolloClient<any>) => {
    const abortableQuery = <T, A = null>(
      query: DocumentNode,
      args: boolean,
      optionalArgs: boolean
    ) => {
      let observableQuery: ZenObservable.Subscription;
      const parsedQuery = query.definitions[0] as OperationDefinitionNode;
      const queryName = parsedQuery?.name?.value;
      if (queryName) {
        let variables: { [x: string]: any } = {};
        let pending = false;
  
        function $abort() {
          if (observableQuery && !observableQuery.closed) {
            observableQuery.unsubscribe();
          }
        }
        async function $fetch() {
          pending = true;
          return new Promise<T>((resolve, reject) => {
            observableQuery = execute(apolloClient.link, {
              query,
              variables,
            }).subscribe({
              next: ({ data, errors }) => {
                if (data && queryName && data[queryName]) {
                  resolve(data[queryName]);
                } else {
                  reject(errors);
                }
              },
              error: (error) => reject(error),
              complete: () => {
                pending = false;
              },
            });
          });
        }
        function $args(args: Record<string, any>) {
          variables = args;
          return {
            $abort,
            $fetch,
            pending,
          };
        }
        if (args && !optionalArgs) {
          return {
            $abort,
            $args,
            pending,
          } as any;
        } else if (optionalArgs) {
          return {
            $abort,
            $args,
            $fetch,
            pending,
          } as any;
        } else {
          return {
            $abort,
            $fetch,
            pending,
          } as any;
        }
      } else {
        throw new Error('query argument is not a GraphQL definition');
      }
    };

    return {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  };

  `;
};
