import chalk from 'chalk';
import { retrieveIntrospectionSchema } from './utilities';
import { saveFile } from './save';
import { SgtsConfig } from './models';
import { SchemaStore, OutputStore, ParametersStore } from './store';

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
      SchemaStore.setSchema(introspectionSchema);
      ParametersStore.setParamaters({
        scalars: customScalars,
        ...rest,
      });
      const generatedString = OutputStore.getRenderedFileString();
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
