#!/usr/bin/env node

import program from 'commander';
import { generate } from './generateModel';
import path from 'path';
import { downloadSchema } from './getSchemas';

const sgts = async () => {
  program
    .version(require('../package.json').version)
    .option('-s, --source <source>', 'GraphQl Api url')
    .option('-j, --json <json>', 'Json file of your GraphQL Api schema')
    .option('-o, --output <output>', 'Output path of your generated file')
    .option(
      '--suffix <suffix>',
      'Add suffix to all your types (ex: User becomes IUser with --suffix I)'
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

  generate(schemaSource, output);
};

sgts();
