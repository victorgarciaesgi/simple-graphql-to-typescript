import { generate } from './generateModel';
import path from 'path';
import { downloadSchema } from './getSchemas';
import chalk from 'chalk';
import * as prettier from 'prettier';
import ora = require('ora');
import fs from 'fs';
import { GraphQLJSONSchema } from './schemaModel';

interface generatePayload {
  endpoint?: string;
  json?: string;
  output?: string;
  header?: string;
  prefix?: string;
  suffix?: string;
  removeNodes?: boolean;
  customScalars?: { [x: string]: string };
  generateMethods?: boolean;
}
const saveModels = ora('Saving models file...');

/**
 * Returns the transpiled file string
 */
export async function sgtsGenerate({
  endpoint,
  json,
  output = './__generated.ts',
  customScalars,
  header,
  prefix,
  removeNodes,
  suffix,
  generateMethods,
}: generatePayload): Promise<string> {
  try {
    const schema = await fetchSchemas({ endpoint, header, json });
    if (schema) {
      const generatedString = await generate(
        schema,
        prefix,
        suffix,
        customScalars,
        generateMethods
      );

      const formatedString = await saveFile(generatedString, output);

      return formatedString;
    } else {
      console.warn(
        chalk.yellow(
          '\n ⚠️ You need to either provite a source url or a path to your json schema file'
        )
      );
    }
  } catch (e) {
    Promise.reject(e);
    console.log(e);
  }
}

function saveFile(template: string, output: string): Promise<string> {
  saveModels.start();
  return new Promise((res, rej) => {
    const formatedModelsFile = prettier.format(template, {
      config: path.resolve(__dirname, '../.prettierrc'),
      semicolons: true,
      singleQuote: true,
      printWidth: 100,
      bracketSpacing: true,
      parser: 'typescript',
    });

    const outputfile = path.resolve(process.cwd(), output);

    fs.writeFile(outputfile, formatedModelsFile || template, err => {
      if (err) {
        saveModels.fail('Saving models file failed: \n');
        console.log(err.message);
        rej('error in saving');
      } else {
        saveModels.succeed(`🗃 Typescript models saved at ${chalk.bold(`${output}`)}`);
        res(formatedModelsFile);
      }
    });
  });
}

async function fetchSchemas({ endpoint, header, json }): Promise<GraphQLJSONSchema> {
  if (endpoint) {
    const JSONschema = await downloadSchema(endpoint, header);
    return JSON.parse(JSONschema);
  } else if (json) {
    return require(path.resolve(process.cwd(), json));
  } else {
    return null;
  }
}
