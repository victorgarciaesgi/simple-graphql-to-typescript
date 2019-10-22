import { Field, GraphQLJSONSchema } from '../models';
import { oc } from 'ts-optchain';
import { buildMethod } from '../generators';
import { withApolloTemplate, withDefinitionsTemplate, withHooksTemplate } from '../templates';

export const createMethods = async ({
  schema,
  prefix,
  suffix,
  scalarList,
  onlyDefinition,
  apolloHooks,
}: {
  schema: GraphQLJSONSchema;
  prefix: string;
  suffix: string;
  scalarList: { [x: string]: string };
  onlyDefinition: boolean;
  apolloHooks: boolean;
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
      return buildMethod(
        query,
        type,
        prefix,
        suffix,
        objectTypes,
        scalarList,
        onlyDefinition,
        apolloHooks
      );
    });
  const mutations = listMutations
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(mutation => {
      const type = {
        little: 'mutation' as const,
        high: 'Mutation' as const,
      };
      return buildMethod(
        mutation,
        type,
        prefix,
        suffix,
        objectTypes,
        scalarList,
        onlyDefinition,
        apolloHooks
      );
    });

  if (onlyDefinition) {
    return withDefinitionsTemplate(queries, mutations);
  } else if (apolloHooks) {
    return withHooksTemplate(queries, mutations);
  } else {
    return withApolloTemplate(queries, mutations);
  }
};
