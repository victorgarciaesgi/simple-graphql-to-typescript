import path from 'path';
import { SgtsConfig } from 'src/models';
import chalk from 'chalk';

require('dotenv').config();

export function getConfigParams(env: string): SgtsConfig | undefined {
  try {
    require('custom-env').env(env);
    return require(path.resolve(process.cwd(), '.sgtsrc.js'));
  } catch (e) {
    throw new Error(chalk.red("Couldn't find .sgtsrc.js. Please check that the file is present"));
  }
}
