#!/usr/bin/env node

import program from 'commander';
import { sgtsGenerate } from './runtime';
import chalk from 'chalk';
import { Dictionnary, SgtsConfig } from './models';
import { getConfigParams } from './rc';

const sgts = () => {
  program
    .version(require('../package.json').version)
    .option('generate [generate]', "Generate using config file '.sgtsrc.js'")
    .option('-e, --endpoint <endpoint>', 'GraphQl Api endpoint')
    .option('-j, --json <json>', 'Json file of your GraphQL Api schema')
    .option('-o, --output <output>', 'Output path of your generated file')
    .option(
      '-G, --generateMethods',
      'Generate all your graphQL methods fully typed (Inspired by Prisma)'
    )
    .option('-A, --apolloHooks', 'Generate useMutation and useQuery hooks typed')
    .option('-H, --headers <header>', 'Additional header option to fetch your schema from endpoint')
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
    .option('-J, --jsMode', 'Generate the methods in Js with declaration files instead of Ts')
    .option('--withGqlQueries', 'Add gql query strings to the generated output')
    .option(
      '-D, --download <download>',
      'Specify the path to download the GraphQL introspection schema'
    )
    .parse(process.argv);

  let {
    generate,
    endpoint,
    json,
    output,
    customScalars,
    headers,
    prefix,
    suffix,
    generateMethods,
    jsMode,
    apolloHooks,
    withGqlQueries,
    download,
  } = program;

  if (generate) {
    const env = typeof generate === 'boolean' ? 'development' : generate;
    const config = getConfigParams(env);
    if (config) generateUsingConfig(config);
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
      headers,
      prefix,
      suffix,
      generateMethods,
      jsMode,
      apolloHooks,
      withGqlQueries,
      download,
    });
  }
};

const generateUsingConfig = async (config: SgtsConfig) => {
  try {
    sgtsGenerate(config);
  } catch (e) {
    throw new Error('Generation failed');
  }
};

sgts();
