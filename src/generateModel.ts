import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';
import path from 'path';
import * as prettier from 'prettier';
import { createMethods } from './createMethods';
import { getObjectTSInterfaces } from './helpers';

export let scalarList = {
  ID: 'string',
  String: 'string',
  Int: 'number',
  Float: 'number',
  Upload: 'File',
  Boolean: 'boolean',
  Json: 'string',
};

const generatedTypes = {
  METHODS: '',
  OBJECT: [],
  ENUM: [],
};

const getEnumTypes = (object, prefix: string, suffix: string) => {
  let ObjectName: string = object.name;
  const generatedFields = object.enumValues.map(field => {
    return `| '${field.name}'`;
  });
  const generatedInterface = `export type ${prefix ? prefix : ''}${ObjectName}${
    suffix ? suffix : ''
  } = 
        ${generatedFields.join('\n')}
    `;
  generatedTypes.ENUM.push(generatedInterface);
};

export const generate = (
  schema: { [x: string]: any },
  outfile: string,
  prefix: string,
  suffix: string,
  removeNodes: boolean,
  customScalars: { [x: string]: string },
  generateMethods: boolean
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (customScalars) {
      scalarList = {
        ...scalarList,
        ...customScalars,
      };
    }
    const transpile = ora('🔄 Transpiling GraphQL schema to Typescript interfaces');
    transpile.start();

    try {
      const schemaTypes = schema.__schema.types;

      if (generateMethods) {
        const methods = await createMethods({ schema, prefix, suffix });
        generatedTypes.METHODS = methods;
      }
      schemaTypes.forEach(item => {
        if (!/^_{2}/.test(item.name)) {
          if (['OBJECT', 'INPUT_OBJECT', 'INTERFACE'].includes(item.kind)) {
            const generatedInterface = getObjectTSInterfaces(item, prefix, suffix, removeNodes);
            generatedTypes.OBJECT.push(generatedInterface);
          } else if (item.kind === 'ENUM') {
            getEnumTypes(item, prefix, suffix);
          }
        }
      });
    } catch (e) {
      transpile.text = 'Transpiling failed';
      transpile.fail();
      console.log(e);
      reject(e);
      return;
    }
    transpile.text = `🖋Transpiling done`;
    transpile.succeed();
    const save = ora('Saving file...');
    save.start();

    const fileTemplate = `
      /* eslint-disable */
      /* tslint-disable */
      // *******************************************************
      // *******************************************************
      //
      // GENERATED FILE, DO NOT MODIFY
      //
      // Made by Victor Garcia ®
      // https://github.com/victorgarciaesgi
      // *******************************************************
      // *******************************************************
      ${generatedTypes.METHODS}
      ${generatedTypes.OBJECT.join('\n')}
      ${generatedTypes.ENUM.join('\n')}
    `;
    const formatedFile = prettier.format(fileTemplate, {
      config: path.resolve(__dirname, '../.prettierrc'),
      semicolons: true,
      singleQuote: true,
      printWidth: 100,
      bracketSpacing: true,
      parser: 'typescript',
    });

    const outputfile = path.resolve(process.cwd(), outfile);

    fs.writeFile(outputfile, formatedFile || fileTemplate, err => {
      if (err) {
        save.text = 'Saving file failed:';
        save.fail();
        console.log(err.message);
      } else {
        save.text = `🗃 Typescript models saved at ${chalk.bold(`${outfile}`)}`;
        save.succeed();
        resolve(formatedFile);
      }
    });
  });
};
