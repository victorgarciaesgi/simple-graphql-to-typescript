#!/usr/bin/env node

import program from 'commander';
import { sgtsGenerate } from './runtime';
import chalk from 'chalk';
import { SgtsConfig } from './models';
import { getConfigParams, createConfig } from './rc';

const runSgtsCLI = () => {
  program
    .version(require('../package.json').version)
    .option('generate [generate]', "Generate using config file '.sgtsrc.js'")
    .option('init', 'Init your config file')
    .option('-e, --endpoint <endpoint>', 'GraphQl Api endpoint')
    .option('-j, --json <json>', 'Json file of your GraphQL Api schema')
    .option('-o, --output <output>', 'Output path of your generated file')
    .option(
      '--codegen-methods',
      'Generate all your graphQL methods fully typed (Inspired by Prisma)'
    )
    .option('--codegen-react-hooks', 'Generate useMutation and useQuery React hooks typed')
    .option('--codegen-vue-hooks', 'Generate useMutation and useQuery React hooks typed')
    .option('--codegen-templates', 'Add gql query strings to the generated output')
    .option('--gen-fragments', 'Auto-generates fragment and include them in queries')
    .option('--header <header>', 'Additional header option to fetch your schema from endpoint')
    .option(
      '--customScalars <scalars>',
      'Provide your custum scalars in format {"myScalar": "MyType"...}'
    )
    .option(
      '-p, --prefix <prefix>',
      'Add prefix to all your types (ex: User becomes IUser with --suffix I)'
    )
    .option(
      '-s, --suffix <suffix>',
      'Add suffix to all your types (ex: User becomes UserModel with --suffix Model)'
    )
    .option('--compileToJs', 'Generate the methods in Js with declaration files instead of Ts')
    .option(
      '-D, --download <download>',
      'Specify the path to download the GraphQL introspection schema'
    )
    .parse(process.argv);

  let {
    generate,
    endpoint,
    json,
    output = './__generated.ts',
    customScalars,
    header,
    prefix,
    suffix,
    codegenMethods,
    jsMode,
    codegenReactHooks,
    codegenVueHooks,
    codegenTemplates,
    download,
    genFragments,
    init,
  } = program;

  if (generate) {
    const env = typeof generate === 'boolean' ? 'development' : generate;
    const config = getConfigParams(env);
    if (config) generateUsingConfig(config);
    else createConfig();
  } else if (init) {
    createConfig();
  } else {
    if (customScalars) {
      try {
        customScalars = JSON.parse(customScalars);
      } catch (e) {
        console.error(
          chalk.red('Invalid custom scalars format, expected {"myScalar": "MyType" ...}')
        );
        return;
      }
    }

    generateUsingConfig({
      endpoint,
      json,
      output,
      customScalars,
      header,
      prefix,
      suffix,
      codegenMethods,
      jsMode,
      codegenReactHooks,
      codegenVueHooks,
      codegenTemplates,
      download,
      genFragments,
    });
  }
};

const generateUsingConfig = async (config: SgtsConfig) => {
  try {
    await sgtsGenerate(config);
  } catch (e) {
    console.error(chalk.red('💔 Generation failed'));
  }
};

runSgtsCLI();
