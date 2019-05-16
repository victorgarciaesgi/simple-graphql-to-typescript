#!/usr/bin/env node

import program from 'commander';
import { generate } from './generateModel';
import path from 'path';
import { downloadSchema } from './getSchemas';
import fs from 'fs';

const sgts = async () => {
  program
    .version(require('../package.json').version)
    .option('-s, --source <source>', 'GraphQl Api url')
    .option('-j, --json <json>', 'Json file of your GraphQL Api schema')
    .option('-o, --output <output>', 'Output path of your generated file')
    .option('-h, --header <header>', 'Additional header option to fetch your schema from endpoint')
    .option(
      '--suffix <suffix>',
      'Add suffix to all your types (ex: User becomes IUser with --suffix I)'
    )
    .option(
      '--curstomScalar <scalars>',
      'Provide your custum scalars in format [{"myScalar": "MyType"} ...]'
    )
    .parse(process.argv);

  let schemaSource: string;
  if (program.source) {
    await downloadSchema(program.source);
    schemaSource = path.resolve(__dirname, '../schema.json');
  } else if (program.json) {
    schemaSource = path.resolve(process.cwd(), program.json);
  } else {
    console.warn('You need to either provite a source url or a path to your json schema file');
  }

  let output = path.resolve(process.cwd(), program.output || 'generated.ts');

  await generate(schemaSource, output, program.suffix);
  if (!program.json) {
    fs.unlink(path.resolve(__dirname, '../schema.json'), err => {});
  }
};

sgts();
