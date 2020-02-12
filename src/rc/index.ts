import path from 'path';
import { SgtsConfig } from '../models';
import chalk from 'chalk';
import fs from 'fs';

require('dotenv').config();

export function getConfigParams(env: string): SgtsConfig | null {
  require('custom-env').env(env);
  const configPath = path.resolve(process.cwd(), '.sgtsrc.js');
  if (fs.existsSync(configPath)) return require(path.resolve(process.cwd(), '.sgtsrc.js'));
  return null;
}
