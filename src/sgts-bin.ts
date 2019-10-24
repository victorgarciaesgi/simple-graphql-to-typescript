#!/usr/bin/env node

import program from 'commander';
import { sgtsGenerate } from './runtime';
import chalk from 'chalk';

const sgts = () => {
  program
    .version(require('../package.json').version)
    .option('-e, --endpoint <endpoint>', 'GraphQl Api endpoint')
    .option('-j, --json <json>', 'Json file of your GraphQL Api schema')
    .option('-o, --output <output>', 'Output path of your generated file')
    .option('-H, --headers <header>', 'Additional header option to fetch your schema from endpoint')
    .option(
      '-p, --prefix <prefix>',
      'Add prefix to all your types (ex: User becomes IUser with --suffix I)'
    )
    .option(
      '-s, --suffix <suffix>',
      'Add suffix to all your types (ex: User becomes UserModel with --suffix Model)'
    )
    .option(
      '-G, --generateMethods',
      'Generate all your graphQL methods fully typed (Inspired by Prisma)'
    )
    .option('-A, --apolloHooks', 'Generate useMutation and useQuery hooks typed')
    .option('--onlyDefinition', 'Generate only the gql schema of the query')
    .option('-J, --jsMode', 'Generate the methods in Js with declaration files instead of Ts')
    .option(
      '--customScalars <scalars>',
      'Provide your custum scalars in format [{"myScalar": "MyType"} ...]'
    )
    .parse(process.argv);

  let {
    endpoint,
    json,
    output,
    customScalars,
    headers,
    prefix,
    suffix,
    generateMethods,
    jsMode,
    onlyDefinition,
    apolloHooks,
  } = program;
  if (customScalars) {
    try {
      customScalars = JSON.parse(customScalars);
    } catch (e) {
      console.error(
        chalk.red('Invalid custom scalars format, expected [{"myScalar": "MyType"} ...]')
      );
      return;
    }
  }

  try {
    sgtsGenerate({
      endpoint,
      json,
      output,
      customScalars,
      headers,
      prefix,
      suffix,
      generateMethods,
      jsMode,
      onlyDefinition,
      apolloHooks,
    });
  } catch (e) {
    return;
  }
};

try {
  sgts();
} catch (e) {}
