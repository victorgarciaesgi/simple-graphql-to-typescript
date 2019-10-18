import { generate } from './generateModel';
import path from 'path';
import chalk from 'chalk';
import * as prettier from 'prettier';
import ora = require('ora');
import fs from 'fs';
import * as ts from 'typescript';
import { GraphQLJSONSchema } from './models';
import { downloadSchema } from './utilities';

interface generatePayload {
  endpoint?: string;
  json?: string;
  output?: string;
  headers?: string;
  prefix?: string;
  suffix?: string;
  jsMode?: boolean;
  customScalars?: { [x: string]: string };
  generateMethods?: boolean;
  onlyDefinition: boolean;
}
const saveModels = ora('Saving models file...');

/**
 * Returns the transpiled file string
 */
export async function sgtsGenerate({
  endpoint,
  json,
  output,
  customScalars,
  headers,
  prefix,
  suffix,
  jsMode,
  generateMethods,
  onlyDefinition,
}: generatePayload): Promise<string> {
  try {
    const schema = await fetchSchemas({ endpoint, headers, json });
    if (schema) {
      const generatedString = await generate(
        schema,
        prefix,
        suffix,
        customScalars,
        generateMethods,
        onlyDefinition
      );

      const formatedString = await saveFile(generatedString, output, jsMode, onlyDefinition);

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

function saveFile(
  template: string,
  output: string = './__generated.ts',
  jsMode: boolean,
  onlyDefinition: boolean
): Promise<string> {
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
        if (jsMode) {
          try {
            compile([outputfile], {
              module: ts.ModuleKind.CommonJS,
              target: ts.ScriptTarget.ESNext,
              moduleResolution: ts.ModuleResolutionKind.NodeJs,
              allowSyntheticDefaultImports: true,
              experimentalDecorators: true,
              emitDecoratorMetadata: true,
              resolveJsonModule: true,
              esModuleInterop: true,
              removeComments: true,
              noImplicitAny: false,
              noUnusedLocals: false,
              pretty: true,
              sourceMap: false,
              downlevelIteration: true,
              declaration: true,
              skipLibCheck: true,
              types: ['node'],
            });
            fs.unlinkSync(outputfile);
            res(formatedModelsFile);
          } catch (e) {
            rej(e);
          }
        } else {
          res(formatedModelsFile);
        }
      }
    });
  });
}

export async function fetchSchemas({
  endpoint,
  headers,
  json,
}: {
  endpoint: string;
  headers: string;
  json: string;
}): Promise<GraphQLJSONSchema> {
  if (endpoint) {
    const JSONschema = await downloadSchema(endpoint, headers);
    return JSON.parse(JSONschema);
  } else if (json) {
    return require(path.resolve(process.cwd(), json));
  } else {
    return null;
  }
}

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  program.emit();
}
