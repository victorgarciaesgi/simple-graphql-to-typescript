import ora from 'ora';
import * as prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import * as ts from 'typescript';
import chalk from 'chalk';
import mkdirp from 'mkdirp';

let saveModels: ora.Ora;

export async function saveFile(
  template: string,
  output?: string,
  jsMode?: boolean
): Promise<string> {
  try {
    const pretty = ora('\nRunning Prettier with your config on the generated output').start();
    let prettierFoundOptions = await prettier.resolveConfig(process.cwd());
    let message = 'using your Prettier config';

    if (!prettierFoundOptions) {
      message = 'using default Prettier config';
      prettierFoundOptions = {
        printWidth: 100,
        tabWidth: 2,
        trailingComma: 'es5',
        singleQuote: true,
        semi: true,
        bracketSpacing: true,
        htmlWhitespaceSensitivity: 'strict',
      };
    }
    const formatedModelsFile = prettier.format(template, {
      ...prettierFoundOptions,
      parser: 'typescript',
    });
    pretty.succeed('💄 Your file has been formated using your Prettier config');

    if (output) {
      const outputfile = path.resolve(process.cwd(), output);
      if (fs.existsSync(outputfile)) {
        const content = await writeOutput(outputfile, formatedModelsFile, jsMode);
        return content;
      } else {
        let dirList = outputfile.split('/');
        dirList.pop();
        const dirPath = dirList.join('/');
        await mkdirp(dirPath);
        return await writeOutput(outputfile, formatedModelsFile, jsMode);
      }
    }
    return formatedModelsFile;
  } catch (e) {
    return Promise.reject(e);
  }
}

function TypescriptCompile(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  program.emit();
}

async function writeOutput(path: string, content: string, jsMode?: boolean): Promise<string> {
  try {
    saveModels = ora('Saving models file...').start();
    await fs.writeFileSync(path, content);
    saveModels.succeed(`🎉 Output saved at ${chalk.bold(`${path}`)}`);
    if (jsMode) {
      try {
        TypescriptCompile([path], {
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
        fs.unlinkSync(path);
        return content;
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      return content;
    }
  } catch (e) {
    saveModels.fail('Saving models file failed');
    console.log(e.message);
    return Promise.reject('Error in saving file');
  }
}
