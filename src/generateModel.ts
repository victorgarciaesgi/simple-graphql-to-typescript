import chalk from 'chalk';
import fs from 'fs';
import { spawn } from 'child_process';
import ora from 'ora';
import path from 'path';

let scalarList = {
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

const getObjectTypes = (object, prefix: string, suffix: string, removeNodes: boolean): void => {
  let ObjectName: string = object.name;
  let fieldsKey = object.kind === 'OBJECT' ? 'fields' : 'inputFields';
  const generatedFields = object[fieldsKey].map(field => {
    let propertyName = field.name;
    let isOptional = true;
    let isArray = false;
    let isArrayOptional = false;
    let isEdge = false;

    function getFieldInfos(type): string {
      if (propertyName === 'edges') isEdge = true;
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
        return (prefix ? prefix : '') + type.name + (suffix ? suffix : '');
      }
    }

    const typeName = getFieldInfos(field.type);

    const generatedProperty = `${propertyName}${isOptional ? '?' : ''}: ${typeName}${
      removeNodes && isEdge ? '["node"]' : ''
    }${isArray ? '[]' : ''};`;

    return generatedProperty;
  });
  const generatedInterface = `export interface ${prefix ? prefix : ''}${ObjectName}${
    suffix ? suffix : ''
  } {
        ${generatedFields.join('\n')}
      }
    `;
  generatedTypes.OBJECT.push(generatedInterface);
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
  origin: string,
  outfile: string,
  prefix: string,
  suffix: string,
  removeNodes: boolean,
  customScalars: Array<{ [x: string]: any }>
) => {
  return new Promise((resolve, reject) => {
    if (customScalars) {
      scalarList = {
        ...scalarList,
        ...customScalars,
      };
    }
    const transpile = ora('Transpiling GraphQL schema to Typescript interfaces');
    transpile.start();

    try {
      const schemaTypes = require(origin).__schema.types;
      schemaTypes.forEach(item => {
        if (!/^_{2}/.test(item.name)) {
          if (item.kind === 'OBJECT' || item.kind === 'INPUT_OBJECT') {
            getObjectTypes(item, prefix, suffix, removeNodes);
          } else if (item.kind === 'ENUM') {
            getEnumTypes(item, prefix, suffix);
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
        const prettier = spawn(path.resolve(__dirname, '../node_modules/.bin/prettier'), [
          '--config',
          path.resolve(__dirname, '../.prettierrc'),
          '--write',
          outfile,
        ]);

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
