import ora from 'ora';
import * as prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import * as ts from 'typescript';
import chalk from 'chalk';

const saveModels = ora('Saving models file...');

export function saveFile(
  template: string,
  output: string = './__generated.ts',
  jsMode?: boolean,
  json?: boolean
): Promise<string> {
  saveModels.start();
  return new Promise((res, rej) => {
    try {
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
          saveModels.fail('Saving models file failed');
          console.log(err.message);
          return rej('Error in saving file');
        } else {
          saveModels.succeed(`🗃 Typescript models saved at ${chalk.bold(`${output}`)}`);
          if (jsMode) {
            try {
              TypescriptCompile([outputfile], {
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
    } catch (e) {
      saveModels.fail('Saving models file failed');
      return rej(e);
    }
  });
}

function TypescriptCompile(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  program.emit();
}
