import chalk from 'chalk';
import fs from 'fs';
import { spawn } from 'child_process';
import ora from 'ora';
import path from 'path';

const scalarList = {
  ID: 'string',
  String: 'string',
  DateTime: 'Date',
  Int: 'number',
  Float: 'number',
  Upload: 'File',
  Boolean: 'boolean',
  Json: 'string',
};

const generatedTypes = {
  OBJECT: [],
  ENUM: [],
};

const getObjectTypes = (object, suffix: string): void => {
  let ObjectName: string = object.name;
  let fieldsKey = object.kind === 'OBJECT' ? 'fields' : 'inputFields';
  const generatedFields = object[fieldsKey].map(field => {
    let propertyName = field.name;
    let isOptional = true;
    let isArray = false;
    let isArrayOptional = false;

    function getFieldInfos(type): string {
      if (type.kind === 'NON_NULL' || type.kind === 'LIST') {
        if (type.kind === 'LIST') {
          isArray = true;
          if (isOptional) isArrayOptional = true;
        }
        if (type.kind === 'NON_NULL' && !isArrayOptional) isOptional = false;
        return getFieldInfos(type.ofType);
      } else {
        if (type.kind === 'SCALAR') {
          return scalarList[type.name];
        }
        return (suffix ? suffix : '') + type.name;
      }
    }

    const typeName = getFieldInfos(field.type);

    const generatedProperty = `${propertyName}${isOptional ? '?' : ''}: ${typeName}${
      isArray ? '[]' : ''
    };`;

    return generatedProperty;
  });
  const generatedInterface = `export interface ${suffix ? suffix : ''}${ObjectName} {
        ${generatedFields.join('\n')}
      }
    `;
  generatedTypes.OBJECT.push(generatedInterface);
};

const getEnumTypes = (object, suffix) => {
  let ObjectName: string = object.name;
  const generatedFields = object.enumValues.map(field => {
    return `| '${field.name}'`;
  });
  const generatedInterface = `export type ${suffix ? suffix : ''}${ObjectName} = 
        ${generatedFields.join('\n')}
    `;
  generatedTypes.ENUM.push(generatedInterface);
};

export const generate = (origin: string, outfile: string, suffix: string) => {
  return new Promise((resolve, reject) => {
    const transpile = ora('Transpiling GraphQL schema to Typescript interfaces');
    transpile.start();

    try {
      const schemaTypes = require(origin).__schema.types;
      schemaTypes.forEach(item => {
        if (!/^_{2}/.test(item.name)) {
          if (item.kind === 'OBJECT' || item.kind === 'INPUT_OBJECT') {
            getObjectTypes(item, suffix);
          } else if (item.kind === 'ENUM') {
            getEnumTypes(item, suffix);
          }
        }
      });
    } catch (e) {
      transpile.text = e.message;
      transpile.fail();
      reject();
    }
    transpile.text = `Transpiling done`;
    transpile.succeed();
    const save = ora('Saving file...');
    save.start();

    const fileTemplate = `
    // *******************************************************
    // *******************************************************
    //
    // GENERATED FILE, DO NOT MODIFY
    //
    // Made by Victor Garcia ®
    // https://github.com/victorgarciaesgi
    // *******************************************************
    // *******************************************************

    ${generatedTypes.OBJECT.join('\n')}
    ${generatedTypes.ENUM.join('\n')}
`;

    fs.writeFile(path.resolve(__dirname, outfile), fileTemplate, err => {
      if (err) {
        save.text = err.message;
        save.fail();
      } else {
        const prettier = spawn(
          path.resolve(__dirname, '../node_modules/prettier/bin-prettier.js'),
          ['--config', path.resolve(__dirname, '../.prettierrc'), '--write', outfile]
        );

        prettier.on('error', err => {
          save.text = err.message;
          save.fail();
          reject();
        });

        prettier.on('exit', () => {
          save.text = `Models saved at ${chalk.bold(`${outfile}`)}`;
          save.succeed();
          resolve();
          console.log('');
        });
      }
    });
  });
};
