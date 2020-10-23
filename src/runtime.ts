import { generate } from './generate';
import chalk from 'chalk';
import { retrieveIntrospectionSchema } from './utilities';
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
  jsMode,
  download,
  ...rest
}: SgtsConfig): Promise<string | undefined> {
  console.log(`\n Sgts v${require('../package.json').version}`);

  try {
    const introspectionSchema = await retrieveIntrospectionSchema({
      endpoint,
      header,
      json,
      download,
    });
    if (introspectionSchema) {
      const generatedString = await generate({
        schema: introspectionSchema,
        customScalars,
        ...rest,
      });
      return await saveFile(generatedString, output, jsMode);
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
