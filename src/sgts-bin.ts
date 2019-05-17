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
    .option(
      '-s, --suffix <suffix>',
      'Add suffix to all your types (ex: User becomes UserModel with --suffix Model)'
    )
    .option('-rmNodes, --removeNodes', 'Remove node property from all [edges] results')
    .option(
      '--customScalars <scalars>',
      'Provide your custum scalars in format [{"myScalar": "MyType"} ...]'
    )
    .parse(process.argv);

  const { endpoint, json, output, customScalars, header, prefix, removeNodes, suffix } = program;

  sgtsGenerate({ endpoint, json, output, customScalars, header, prefix, removeNodes, suffix });
};

sgts();
