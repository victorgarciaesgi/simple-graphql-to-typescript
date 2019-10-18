import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withDefinitionsTemplate = (queries: string[], mutations: string[]): string => {
  return `
    import { DocumentNode } from 'graphql';
    import graphQlTag from 'graphql-tag';

    ${guessFragmentTypeTemplate}

    export const ApiQueryDefinitions = {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  `;
};
