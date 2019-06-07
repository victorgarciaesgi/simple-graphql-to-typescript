import { generate } from './generateModel';
import path from 'path';
import { downloadSchema } from './getSchemas';
import chalk from 'chalk';

interface generatePayload {
  endpoint?: string;
  json?: string;
  output?: string;
  header?: string;
  prefix?: string;
  suffix?: string;
  removeNodes?: boolean;
  customScalars?: { [x: string]: string };
}
/**
 * Returns the transpiled file string
 */
export async function sgtsGenerate({
  endpoint,
  json,
  output = './generated.ts',
  customScalars,
  header,
  prefix,
  removeNodes,
  suffix,
}: generatePayload): Promise<string> {
  try {
    let schema: { [x: string]: any };
    if (endpoint) {
      const JSONschema = await downloadSchema(endpoint, header);
      schema = JSON.parse(JSONschema);
    } else if (json) {
      schema = require(path.resolve(process.cwd(), json));
    } else {
      console.warn(
        chalk.yellow(
          '\n ⚠️ You need to either provite a source url or a path to your json schema file'
        )
      );
      return;
    }

    let outputPath = path.resolve(process.cwd(), output);
    const formatedFile = await generate(
      schema,
      outputPath,
      prefix,
      suffix,
      removeNodes,
      customScalars
    );

    return formatedFile;
  } catch (e) {
    Promise.reject(e);
    console.log(e);
  }
}
