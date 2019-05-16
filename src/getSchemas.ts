import chalk from 'chalk';
import ora from 'ora';
import { spawn } from 'child_process';
import path from 'path';

export const downloadSchema = (schemaUrl: string, header: string) => {
  return new Promise((res, rej) => {
    const download = ora(`Downloading schemas from ${chalk.blue(schemaUrl)}`).start();
    const args = [
      'service:download',
      '--endpoint',
      schemaUrl,
      path.resolve(__dirname, `../schema.json`),
    ];
    if (header) {
      args.push('--header', header);
    }
    const fetchSchema = spawn(path.resolve(__dirname, '../node_modules/.bin/apollo'), args);

    fetchSchema.on('error', err => {
      download.text = err.message;
      download.fail();
      rej(err.message);
    });

    fetchSchema.on('exit', async data => {
      download.succeed();
      res();
    });
  });
};
