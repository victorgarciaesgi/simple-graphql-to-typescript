/* eslint-disable */
/* tslint-disable */
// *******************************************************
// *******************************************************
//
// GENERATED FILE, DO NOT MODIFY
//
// Made by Victor Garcia ®
//
// https://github.com/victorgarciaesgi
// *******************************************************
// *******************************************************
// 💙

export interface IRootQueryType {
  post?: IPost;
  posts?: IPost[];
  comment?: IComment;
  comments?: IComment[];
  album?: IAlbum;
  albums?: IAlbum[];
  photo?: IPhoto;
  photos?: IPhoto[];
  todo?: ITodo;
  todos?: ITodo[];
  user?: IUser;
  users?: IUser[];
}

export interface IPost {
  user?: IUser;
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface IComment {
  post?: IPost;
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}

export interface IAlbum {
  user?: IUser;
  userId?: number;
  id?: number;
  title?: string;
}

export interface IPhoto {
  album?: IAlbum;
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

export interface ITodo {
  user?: IUser;
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}

export interface IpostArgs {
  id?: number;
}

export interface IpostsArgs {
  userId?: number;
}

export interface IcommentArgs {
  id?: number;
}

export interface IcommentsArgs {
  postId?: number;
}

export interface IalbumArgs {
  id?: number;
}

export interface IalbumsArgs {
  userId?: number;
}

export interface IphotoArgs {
  id?: number;
}

export interface IphotosArgs {
  albumId?: number;
}

export interface ItodoArgs {
  id?: number;
}

export interface ItodosArgs {
  userId?: number;
  completed?: boolean;
}

export interface IuserArgs {
  id?: number;
}

export interface IusersArgs {}

import ApolloClient, {
  QueryOptions,
  OperationVariables,
  MutationOptions,
  ObservableQuery
} from 'apollo-client';
import { execute } from 'apollo-link';
import { OperationDefinitionNode, DocumentNode } from 'graphql';
import graphQlTag from 'graphql-tag';

export type AbordableQueryWithArgs<T, A> = {
  $args(args: A): AbordableQuery<T>;
  $fetch(): Promise<T>;
  $abort(): void;
};

export type AbordableQuery<T> = {
  $fetch(): Promise<T>;
  $abort(): void;
};
export interface FragmentableQueryWithArgs<T, A> {
  $fragment(fragment: string | DocumentNode): AbordableQueryWithArgs<T, A>;
}
export interface FragmentableQuery<T> {
  $fragment(fragment: string | DocumentNode): AbordableQuery<T>;
}

export type AbordableMutationWithArgs<T, A> = {
  $args(args: A): AbordableMutation<T>;
  $post(): Promise<T>;
  $abort(): void;
};

export type AbordableMutation<T> = {
  $post(): Promise<T>;
  $abort(): void;
};

export interface FragmentableMutationWithArgs<T, A> {
  $fragment(fragment: string | DocumentNode): AbordableMutationWithArgs<T, A>;
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
        `The argument passed is not a fragment definition, got ${definition.kind} instead`
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
          variables
        }).subscribe({
          next: ({ data, errors }) => {
            if (data) {
              resolve(data[queryName]);
            } else {
              reject(errors);
            }
          },
          error: error => reject(error)
        });
      });
    }
    function $args(args) {
      variables = args;
      return {
        $abort,
        $fetch
      };
    }
    return {
      $abort,
      $args
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
          variables
        }).subscribe({
          next: ({ data, errors }) => {
            if (data) {
              resolve(data[mutationName]);
            } else {
              reject(errors);
            }
          },
          error: error => reject(error)
        });
      });
    }
    function $args(args) {
      variables = args;
      return {
        $abort,
        $post
      };
    }
    return {
      $abort,
      $args
    } as any;
  };

  return {
    post: (): FragmentableQueryWithArgs<IPost, { id?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query post ($id: Int) {
          post(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IPost, { id?: number }>(query);
        }
      };
    },
    posts: (): FragmentableQueryWithArgs<IPost[], { userId?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query posts ($userId: Int) {
          posts(userId: $userId) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IPost[], { userId?: number }>(query);
        }
      };
    },
    comment: (): FragmentableQueryWithArgs<IComment, { id?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query comment ($id: Int) {
          comment(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IComment, { id?: number }>(query);
        }
      };
    },
    comments: (): FragmentableQueryWithArgs<IComment[], { postId?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query comments ($postId: Int) {
          comments(postId: $postId) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IComment[], { postId?: number }>(query);
        }
      };
    },
    album: (): FragmentableQueryWithArgs<IAlbum, { id?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query album ($id: Int) {
          album(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IAlbum, { id?: number }>(query);
        }
      };
    },
    albums: (): FragmentableQueryWithArgs<IAlbum[], { userId?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query albums ($userId: Int) {
          albums(userId: $userId) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IAlbum[], { userId?: number }>(query);
        }
      };
    },
    photo: (): FragmentableQueryWithArgs<IPhoto, { id?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query photo ($id: Int) {
          photo(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IPhoto, { id?: number }>(query);
        }
      };
    },
    photos: (): FragmentableQueryWithArgs<IPhoto[], { albumId?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query photos ($albumId: Int) {
          photos(albumId: $albumId) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IPhoto[], { albumId?: number }>(query);
        }
      };
    },
    todo: (): FragmentableQueryWithArgs<ITodo, { id?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query todo ($id: Int) {
          todo(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<ITodo, { id?: number }>(query);
        }
      };
    },
    todos: (): FragmentableQueryWithArgs<ITodo[], { userId?: number; completed?: boolean }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query todos ($userId: Int,$completed: Boolean) {
          todos(userId: $userId,completed: $completed) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<ITodo[], { userId?: number; completed?: boolean }>(query);
        }
      };
    },
    user: (): FragmentableQueryWithArgs<IUser, { id?: number }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query user ($id: Int) {
          user(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IUser, { id?: number }>(query);
        }
      };
    },
    users: (): FragmentableQuery<IUser[]> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query users  {
          users {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IUser[]>(query);
        }
      };
    }
  };
};
