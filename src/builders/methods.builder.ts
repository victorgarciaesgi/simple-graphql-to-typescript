import { Field, GraphQLJSONSchema, Schema, MethodType, CodeGenType } from '../models';
import { buildMethod } from '../generators';
import {
  withMethodsTemplate,
  withDefinitionsTemplate,
  withReactHooksTemplate,
  withVueHooksTemplate,
} from '../templates';

interface CreateMethodsArgs {
  schema: GraphQLJSONSchema;
  mode?: CodeGenType;
}
export const createMethods = async ({ schema, mode }: CreateMethodsArgs) => {
  const [queries, mutations, subscriptions] = retrieveQueriesList({
    schema,
  });
  const ObjectTypes = schema.__schema.types.filter(f => f.kind === 'OBJECT');

  const parsedQueries = queries.map(field =>
    buildMethod({ field, type: MethodType.Query, mode, ObjectTypes })
  );
  const parsedMutations = mutations.map(field =>
    buildMethod({ field, type: MethodType.Mutation, mode, ObjectTypes })
  );
  // TODO
  const parsedSubscriptions = subscriptions.map(field =>
    buildMethod({ field, type: MethodType.Subscription, mode, ObjectTypes })
  );

  if (mode === 'react-hooks') {
    return withReactHooksTemplate(parsedQueries, parsedMutations);
  } else if (mode === 'vue-hooks') {
    return withVueHooksTemplate(parsedQueries, parsedMutations);
  } else if (mode === 'methods') {
    return withMethodsTemplate(parsedQueries, parsedMutations);
  } else {
    return withDefinitionsTemplate(parsedQueries, parsedMutations);
  }
};

const regexFilter = (field: Field) => !/^_{1,2}/.test(field.name);

/** Returns the list of Queries and Mutations from a schema */
export function retrieveQueriesList({ schema }: CreateMethodsArgs): [Field[], Field[], Field[]] {
  const QueryType = schema.__schema.queryType.name;
  const MutationType = schema.__schema.mutationType?.name ?? '';
  const SubscriptionType = schema.__schema.subscriptionType?.name ?? '';
  let listQueries = schema.__schema.types.find(f => f.name === QueryType)?.fields ?? [];

  let listMutations: Field[] = [];
  let listSubscription: Field[] = [];

  if (MutationType) {
    listMutations = schema.__schema.types.find(f => f.name === MutationType)?.fields ?? [];
  }
  if (SubscriptionType) {
    listSubscription = schema.__schema.types.find(f => f.name === SubscriptionType)?.fields ?? [];
  }

  const queries = listQueries.filter(regexFilter);
  const mutations = listMutations.filter(regexFilter);
  const subscription = listSubscription.filter(regexFilter);
  return [queries, mutations, subscription];
}
