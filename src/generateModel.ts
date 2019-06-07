import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';
import path from 'path';
import * as prettier from 'prettier';

let scalarList = {
  ID: 'string',
  String: 'string',
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
  let fieldsKey =
    object.kind === 'OBJECT' || object.kind === 'INTERFACE' ? 'fields' : 'inputFields';
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
  schema: { [x: string]: any },
  outfile: string,
  prefix: string,
  suffix: string,
  removeNodes: boolean,
  customScalars: { [x: string]: string }
): Promise<string> => {
  return new Promise((resolve, reject) => {
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
      schemaTypes.forEach(item => {
        if (!/^_{2}/.test(item.name)) {
          if (['OBJECT', 'INPUT_OBJECT', 'INTERFACE'].includes(item.kind)) {
            getObjectTypes(item, prefix, suffix, removeNodes);
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
