import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withDefinitionsTemplate = (queries: string[], mutations: string[]): string => {
  return `
    export const GqlQueries = {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  `;
};
