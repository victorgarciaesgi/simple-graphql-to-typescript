import { Field, InputField, Arg, Type } from '../models';
import { evaluateType, capitalize } from '../utilities';

export const generateEnumType = (object: Type, prefix?: string, suffix?: string): string => {
  let ObjectName: string = object.name;
  const generatedFields = object.enumValues.map(field => field.name);
  return `enum ${prefix ? prefix : ''}${ObjectName}${suffix ? suffix : ''} {
        ${generatedFields.map(enumType => `${capitalize(enumType)} = "${enumType}"`).join(',\n')}
  }`;
};

/** Get the ts type from a Field (ex: 'string[]') */
export const getOneTSTypeDisplay = ({
  field,
  prefix,
  suffix,
  scalarList,
}: {
  field: Field | InputField | Arg;

  scalarList: { [x: string]: string };
  prefix?: string;
  suffix?: string;
}): string => {
  const { isScalar, typeName, isArray } = evaluateType(field);
  const returnedName = isScalar
    ? scalarList[typeName]
    : `${prefix ? prefix : ''}${typeName}${suffix ? suffix : ''}`;

  return returnedName + (isArray ? '[]' : '');
};

/** Generate interface fields (ex: ['firstName: string', 'birthDate: Date']) */
export const generatedTsFields = (
  fields: (Field | InputField)[],
  scalarList: { [x: string]: string },
  prefix?: string,
  suffix?: string
): string[] => {
  return fields.map(field => {
    let propertyName = field.name;
    const { isOptional } = evaluateType(field);
    const TStypeName = getOneTSTypeDisplay({ field, prefix, suffix, scalarList });
    return `${propertyName}${isOptional ? '?' : ''}: ${
      isOptional ? `Maybe<${TStypeName}>` : TStypeName
    };`;
  });
};

/** Generate GQL queries and mutations args (ex: ) */
export const generateQGLArg = (field: Arg): string => {
  const { isArray, isArrayOptional, isOptional, typeName } = evaluateType(field);
  return `${isArray ? '[' : ''}${typeName}${isOptional ? '' : '!'}${isArray ? ']' : ''}${
    isArrayOptional ? '!' : ''
  }`;
};

/** Generates TS interface of a given GraphqlType */
export const getObjectTSInterfaces = (
  object: Type,
  scalarList: { [x: string]: string },
  prefix?: string,
  suffix?: string
): string => {
  let ObjectName: string = object.name;
  let fieldsKey =
    object.kind === 'OBJECT' || object.kind === 'INTERFACE' ? 'fields' : 'inputFields';
  const generatedFields = generatedTsFields(object[fieldsKey], scalarList, prefix, suffix);
  return buildTsInterfaceString(ObjectName, generatedFields, prefix, suffix);
};

/** Generate queries and mutations arguments types */
export const getQueriesArgsTSInterfaces = (
  object: Field,
  scalarList: { [x: string]: string },
  prefix?: string,
  suffix?: string
) => {
  let ObjectName: string = object.name;
  const parsedSuffix = 'Args' + (suffix ? suffix : '');
  const generatedFields = generatedTsFields(object.args, scalarList, prefix, suffix);
  return buildTsInterfaceString(ObjectName, generatedFields, prefix, parsedSuffix);
};

/** Returns generated ts interface (ex: interface User {firstName: string; id: string}) */
export const buildTsInterfaceString = (
  name: string,
  fields: string[],
  prefix?: string,
  suffix?: string
): string => {
  return `interface ${prefix ? prefix : ''}${name}${suffix ? suffix : ''} {
    ${fields.join('\n')}
  }
`;
};
