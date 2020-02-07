export const withReactHooksTemplate = (queries: string[], mutations: string[]): string => {
  return `
      ${queries.join('\n')}
      ${mutations.join('\n')}
  `;
};
