import { getObjectGQLTypesArgs, getOneTSType, buildMethod } from './helpers';

export const createMethods = async ({ schema, prefix, suffix }) => {
  const QueryType = schema.__schema.queryType.name;
  const MutationType = schema.__schema.mutationType.name;
  const listQueries = schema.__schema.types.find(f => f.name === QueryType).fields;
  const listMutations = schema.__schema.types.find(f => f.name === MutationType).fields;

  const queries = listQueries.map(query => {
    const type = {
      little: 'query',
      high: 'Query',
    };
    return buildMethod(query, type, prefix, suffix);
  });
  const mutations = listMutations.map(mutation => {
    const type = {
      little: 'mutation',
      high: 'Mutation',
    };
    return buildMethod(mutation, type, prefix, suffix);
  });
  const queryKey = (prefix ? prefix : '') + QueryType + (suffix ? suffix : '');
  const mutationKey = (prefix ? prefix : '') + MutationType + (suffix ? suffix : '');

  const queriesKeys = listQueries.map(query => `${query.name}: '',`);
  const mutationsKeys = listMutations.map(mutation => `${mutation.name}: '',`);
  const finalMethods = `
  import { apolloMutation, apolloQuery } from '@services';
  import gql from 'graphql-tag';

  const Fragments: {[T in keyof (${queryKey} & ${mutationKey})]?: string} = {
    ${[...new Set([...queriesKeys, ...mutationsKeys])].join('\n')}
  }

  export const declareFragments = (fragments: { [T in keyof (${queryKey} & ${mutationKey})]?: string }) => {
    Object.keys(fragments).map(key => {
      Fragments[key] = fragments[key];
    });
  };

  ${queries.join('\n')}
  ${mutations.join('\n')}
  `;
  return finalMethods;
};
