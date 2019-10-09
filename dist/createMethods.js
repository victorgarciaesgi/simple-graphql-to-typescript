"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
exports.createMethods = function (_a) {
    var schema = _a.schema, prefix = _a.prefix, suffix = _a.suffix;
    return __awaiter(void 0, void 0, void 0, function () {
        var QueryType, MutationType, listQueries, listMutations, queries, mutations, finalMethods;
        return __generator(this, function (_b) {
            QueryType = schema.__schema.queryType.name;
            MutationType = schema.__schema.mutationType.name;
            listQueries = schema.__schema.types.find(function (f) { return f.name === QueryType; }).fields;
            listMutations = schema.__schema.types.find(function (f) { return f.name === MutationType; }).fields;
            queries = listQueries
                .filter(function (query) { return !/^_{1,2}/.test(query.name); })
                .map(function (query) {
                var type = {
                    little: 'query',
                    high: 'Query',
                };
                return helpers_1.buildMethod(query, type, prefix, suffix);
            });
            mutations = listMutations
                .filter(function (query) { return !/^_{1,2}/.test(query.name); })
                .map(function (mutation) {
                var type = {
                    little: 'mutation',
                    high: 'Mutation',
                };
                return helpers_1.buildMethod(mutation, type, prefix, suffix);
            });
            finalMethods = "\n  import ApolloClient, { QueryOptions, OperationVariables, MutationOptions, ObservableQuery } from 'apollo-client';\n  import { execute } from 'apollo-link';\n  import { OperationDefinitionNode, DocumentNode } from 'graphql';\n  import graphQlTag from 'graphql-tag';\n\n\n  export type AbordableQueryWithArgs<T, A> = {\n    $args(args: A): AbordableQuery<T>;\n    $fetch(): Promise<T>;\n    $abort(): void;\n  };\n  \n  export type AbordableQuery<T> = {\n    $fetch(): Promise<T>;\n    $abort(): void;\n  };\n  export interface FragmentableQueryWithArgs<T, A> {\n    $fragment(fragment: string | DocumentNode): AbordableQueryWithArgs<T, A>;\n  }\n  export interface FragmentableQuery<T> {\n    $fragment(fragment: string | DocumentNode): AbordableQuery<T>;\n  }\n  \n  export type AbordableMutationWithArgs<T, A> = {\n    $args(args: A): AbordableMutation<T>;\n    $post(): Promise<T>;\n    $abort(): void;\n  };\n  \n  export type AbordableMutation<T> = {\n    $post(): Promise<T>;\n    $abort(): void;\n  };\n  \n  export interface FragmentableMutationWithArgs<T, A> {\n    $fragment(fragment: string | DocumentNode): AbordableMutationWithArgs<T, A>;\n  }\n  export interface FragmentableMutation<T> {\n    $fragment(fragment: string | DocumentNode): AbordableMutation<T>;\n  }\n  \n  \n  const guessFragmentType = (fragment: string | DocumentNode) => {\n    let isString,\n      isFragment = false;\n    let fragmentName = '';\n    if (typeof fragment === 'string') {\n      isString = true;\n    } else if (fragment instanceof Object && fragment.definitions) {\n      isFragment = true;\n      if (fragment.definitions.length > 1) {\n        console.error('You can only pass one raw fragment to the function');\n        return;\n      }\n      const definition = fragment.definitions[0];\n      if (definition.kind === 'FragmentDefinition') {\n        fragmentName = definition.name.value;\n      } else {\n        console.error(\n          `The argument passed is not a fragment definition, got ${definition.kind} instead`\n        );\n        return;\n      }\n    }\n    return { isString, isFragment, fragmentName };\n  };\n  \n  export const apiProvider = (apolloClient: ApolloClient<any>) => {\n    const abortableQuery = <T, A = null>(\n      query: DocumentNode\n    ): A extends null ? AbordableQuery<T> : AbordableQueryWithArgs<T, A> => {\n      let observableQuery: ZenObservable.Subscription;\n      const parsedQuery = query.definitions[0] as OperationDefinitionNode;\n      const queryName = parsedQuery.name.value;\n      let variables: { [x: string]: any } = {};\n  \n      function $abort() {\n        if (observableQuery && !observableQuery.closed) {\n          observableQuery.unsubscribe();\n        }\n      }\n      async function $fetch() {\n        return new Promise<T>((resolve, reject) => {\n          observableQuery = execute(apolloClient.link, {\n            query,\n            variables,\n          }).subscribe({\n            next: ({ data, errors }) => {\n              if (data) {\n                resolve(data[queryName]);\n              } else {\n                reject(errors);\n              }\n            },\n            error: error => reject(error),\n          });\n        });\n      }\n      function $args(args) {\n        variables = args;\n        return {\n          $abort,\n          $fetch,\n        };\n      }\n      return {\n        $abort,\n        $args,\n      } as any;\n    };\n    const abortableMutation = <T, A = null>(\n      mutation: DocumentNode\n    ): AbordableMutationWithArgs<T, A> => {\n      let observableQuery: ZenObservable.Subscription;\n      const parsedQuery = mutation.definitions[0] as OperationDefinitionNode;\n      const mutationName = parsedQuery.name.value;\n      let variables: { [x: string]: any } = {};\n  \n      function $abort() {\n        if (observableQuery && !observableQuery.closed) {\n          observableQuery.unsubscribe();\n        }\n      }\n      async function $post() {\n        return new Promise<T>((resolve, reject) => {\n          observableQuery = execute(apolloClient.link, {\n            query: mutation,\n            variables,\n          }).subscribe({\n            next: ({ data, errors }) => {\n              if (data) {\n                resolve(data[mutationName]);\n              } else {\n                reject(errors);\n              }\n            },\n            error: error => reject(error),\n          });\n        });\n      }\n      function $args(args) {\n        variables = args;\n        return {\n          $abort,\n          $post,\n        };\n      }\n      return {\n        $abort,\n        $args,\n      } as any;\n    };\n\n    return {\n      " + queries.join('\n') + "\n      " + mutations.join('\n') + "\n    }\n  };\n\n  ";
            return [2, finalMethods];
        });
    });
};
