export const configTemplate = `
// @ts-check
// Simple-graphql-to-typescript configuration file, see link for more information
// https://sgts.netlify.com/configuration/config.html


/**
 * @type { import("simple-graphql-to-typescript").SgtsConfig }
 */
module.exports = {
  endpoint: null;
  json: null;
  output: null;
  codegenMethods: false;
  codegenReactHooks: false;
  codegenVueHooks: false;
  codegenTemplates: false;
  customScalars: {};
  header: null;
  prefix: null;
  suffix: null;
  compileToJs: false;
  download: null;
}
`;
