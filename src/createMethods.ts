import { buildMethod } from './helpers';

export const createMethods = async ({ schema, prefix, suffix }) => {
  const QueryType = schema.__schema.queryType.name;
  const MutationType = schema.__schema.mutationType.name;
  const listQueries = schema.__schema.types.find(f => f.name === QueryType).fields;
  const listMutations = schema.__schema.types.find(f => f.name === MutationType).fields;

  const queries = listQueries
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(query => {
      const type = {
        little: 'query',
        high: 'Query',
      };
      return buildMethod(query, type, prefix, suffix);
    });
  const mutations = listMutations
    .filter(query => !/^_{1,2}/.test(query.name))
    .map(mutation => {
      const type = {
        little: 'mutation',
        high: 'Mutation',
      };
      return buildMethod(mutation, type, prefix, suffix);
    });

  const finalMethods = `
  import { apolloMutation, apolloQuery } from '@services';
  import graphQlTag from 'graphql-tag';
  import { oc } from 'ts-optchain'

  function getFragmentName(fragment) {
    return oc(fragment.definitions[0].name).value();
  }


  ${queries.join('\n')}
  ${mutations.join('\n')}
  `;
  return finalMethods;
};
