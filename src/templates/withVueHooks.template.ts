export const withVueHooksTemplate = (allQueries: string[]): string => {
  return `
    ${allQueries.join('\n')}
  `;
};
