import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withReactHooksTemplate = (queries: string[], mutations: string[]): string => {
  return `
    import { DocumentNode } from 'graphql';
    import gql from 'graphql-tag';
    import { useMutation, useQuery, QueryHookOptions, MutationHookOptions, MutationTuple } from '@apollo/react-hooks'

    ${guessFragmentTypeTemplate}

    export const ApiHooks = {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  `;
};
