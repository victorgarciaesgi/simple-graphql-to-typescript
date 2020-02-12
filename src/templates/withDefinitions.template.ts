export const withDefinitionsTemplate = (allQueries: string[]): string => {
  return `
    ${allQueries.join('\n')}
  `;
};
