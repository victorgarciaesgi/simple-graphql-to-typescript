export const configTemplate = (config: string): string => {
  return `
// @ts-check
// Simple-graphql-to-typescript configuration file, see link for more information
// https://sgts.netlify.com/configuration/config.html


/**
 * @type { import("simple-graphql-to-typescript").SgtsConfig }
 */
${config}
`;
};
