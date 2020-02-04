import { guessFragmentTypeTemplate } from './fragmentType.template';

export const withReactHooksTemplate = (queries: string[], mutations: string[]): string => {
  return `
    export const ApiHooks = {
      ${queries.join('\n')}
      ${mutations.join('\n')}
    }
  `;
};
