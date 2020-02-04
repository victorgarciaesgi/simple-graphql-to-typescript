import { generate } from './generate';
import chalk from 'chalk';
import { fetchSchemas } from './utilities';
import { saveFile } from './save';
import { SgtsConfig } from './models';

/**
 * Returns the transpiled file string
 */
export async function sgtsGenerate({
  endpoint,
  json,
  output,
  customScalars,
  header,
  prefix,
  suffix,
  jsMode,
  codegenMethods,
  codegenHooks,
  codegenTemplates,
  download,
}: SgtsConfig): Promise<string | undefined> {
  try {
    console.log(`\n Sgts v${require('../package.json').version}`);
    const schema = await fetchSchemas({ endpoint, header, json, download });
    if (schema) {
      const generatedString = await generate(
        schema,
        prefix,
        suffix,
        customScalars,
        codegenMethods,
        codegenHooks,
        codegenTemplates
      );
      const formatedString = await saveFile(generatedString, output, jsMode);
      return formatedString;
    } else {
      console.warn(
        chalk.yellow(
          '\n ⚠️ You need to either provite a source url or a path to your json schema file'
        )
      );
    }
  } catch (e) {
    console.error(chalk.red(e));
    return Promise.reject(e);
  }
}
