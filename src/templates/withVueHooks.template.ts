export const withVueHooksTemplate = (queries: string[], mutations: string[]): string => {
  return `
      ${queries.join('\n')}
      ${mutations.join('\n')}
  `;
};
