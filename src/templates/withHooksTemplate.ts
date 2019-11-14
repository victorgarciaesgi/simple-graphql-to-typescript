import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withHooksTemplate = (queries: string[], mutations: string[]): string => {
  return `
    import { DocumentNode } from 'graphql';
    import graphQlTag from 'graphql-tag';
    import { useMutation, useQuery, QueryHookOptions, MutationHookOptions, MutationTuple } from '@apollo/react-hooks'

    ${guessFragmentTypeTemplate}

    export const ApiHooks = {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  `;
};
