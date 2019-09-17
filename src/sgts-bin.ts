#!/usr/bin/env node

import program from 'commander';
import { sgtsGenerate } from './runtime';

const sgts = () => {
  program
    .version(require('../package.json').version)
    .option('-e, --endpoint <endpoint>', 'GraphQl Api endpoint')
    .option('-j, --json <json>', 'Json file of your GraphQL Api schema')
    .option('-o, --output <output>', 'Output path of your generated file')
    .option(
      '-head, --header <header>',
      'Additional header option to fetch your schema from endpoint'
    )
    .option(
      '-p, --prefix <prefix>',
      'Add prefix to all your types (ex: User becomes IUser with --suffix I)'
    )
    .option('-w, --watch', 'Fetch types every 5s and retranspile if models changes')
    .option(
      '-s, --suffix <suffix>',
      'Add suffix to all your types (ex: User becomes UserModel with --suffix Model)'
    )
    .option(
      '-G, --generateMethods <path>',
      'Generate all your queries and mutations typed functions (Personal use for now)'
    )
    .option('-rmNodes, --removeNodes', 'Remove node property from all [edges] results')
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
    header,
    prefix,
    removeNodes,
    suffix,
    generateMethods,
    watch,
  } = program;
  if (customScalars) {
    try {
      customScalars = JSON.parse(customScalars);
    } catch (e) {
      console.error('Invalid custom scalars format');
      return;
    }
  }

  sgtsGenerate({
    endpoint,
    json,
    output,
    customScalars,
    header,
    prefix,
    watch,
    removeNodes,
    suffix,
    generateMethods,
  });
};

sgts();
