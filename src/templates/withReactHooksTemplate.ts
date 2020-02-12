export const withReactHooksTemplate = (allQueries: string[]): string => {
  return `
    ${allQueries.join('\n')}
  `;
};
