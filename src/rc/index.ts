import path from 'path';
import { SgtsConfig } from '../models';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { configTemplate } from '../templates';

require('dotenv').config();

export function getConfigParams(env: string): SgtsConfig | null {
  require('custom-env').env(env);
  const configPath = path.resolve(process.cwd(), '.sgtsrc.js');
  if (fs.existsSync(configPath)) return require(path.resolve(process.cwd(), '.sgtsrc.js'));
  return null;
}

export const createConfig = async (): Promise<void> => {
  try {
    console.log(
      chalk.magenta(
        figlet.textSync('SGTS', {
          horizontalLayout: 'full',
        })
      )
    );
    const sourceType = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Where does your GraphQL schema comes from?',
        choices: [
          {
            name: 'From an http endpoint',
            value: 'endpoint',
          },
          {
            name: 'From a JSON file',
            value: 'json',
          },
        ],
      },
    ]);
    const sourceValue = await inquirer.prompt([
      {
        type: 'input',
        name: 'source',
        message:
          sourceType.type === 'endpoint'
            ? "What's the url of your GraphQL api endpoint?"
            : "What's the absolute path to your GraphQL JSON schema?",
      },
    ]);
    const outputPath = await inquirer.prompt([
      {
        type: 'input',
        name: 'ouput',
        message: 'Where do you want to save your generated file?',
        default: './__generated.ts',
      },
    ]);
    const codeGen = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'codeGens',
        message: 'What do you want to generate?',
        choices: [
          new inquirer.Separator('------'),
          {
            name: 'Typescript definitions',
            checked: true,
            disabled: 'Sgts will always generate definitions by default',
          },
          new inquirer.Separator('------'),
          {
            name: 'Vanilla es6 helpers functions',
            value: 'codegenMethods',
          },
          {
            name: 'Apollo React Hooks',
            value: 'codegenReactHooks',
          },
          {
            name: 'Vue Apollo Hooks',
            value: 'codegenVueHooks',
          },
          {
            name: 'Only GraphQL string templates',
            value: 'codegenTemplates',
          },
        ],
      },
    ]);
    const configPath = path.resolve(process.cwd(), '.sgtsrc.js');

    if (fs.existsSync(configPath)) {
      const replace = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'delete',
          message: 'A config file already exists in this folder, do you want to replace it?',
        },
      ]);
      if (!replace.delete) {
        console.log('Ok bye!');
        return;
      }
    }
    const codeGenDisplay = codeGen.codeGens.map((m) => `${m}: true,`);
    const configValue = `module.exports = {
  ${sourceType.type}: "${sourceValue.source}",
  output: "${outputPath.ouput}",
  ${codeGenDisplay.join('\n  ')}
}
    `;
    await fs.writeFileSync(configPath, configTemplate(configValue));
    console.log(chalk.green(`Configuration file created at ${chalk.bold(configPath)}`));
  } catch (e) {
    return Promise.reject(e);
  }
};
