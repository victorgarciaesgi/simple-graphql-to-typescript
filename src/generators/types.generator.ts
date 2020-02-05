import { Field, InputField, Arg, Type } from '../models';
import { evaluateType, capitalize } from '../utilities';
import { ParametersStore } from '../store/parameters.store';

// Generate Enum type (ex: export enum Gender { M = 'M', F = 'F'})
export const generateEnumType = (object: Type): string => {
  const { prefix, suffix } = ParametersStore;
  let ObjectName: string = object.name;
  const generatedFields = object.enumValues.map(field => field.name);
  return `${object.description ? `/** ${object.description} */\n` : ''} export enum ${
    prefix ? prefix : ''
  }${ObjectName}${suffix ? suffix : ''} {
        ${generatedFields.map(enumType => `${capitalize(enumType)} = "${enumType}"`).join(',\n')}
  }`;
};

/** Get the ts type from a Field (ex: 'string[]') */
export const getOneTSTypeDisplay = ({ field }: { field: Field | InputField | Arg }): string => {
  const { prefix, suffix, listScalars } = ParametersStore;
  const { isScalar, typeName, isArray } = evaluateType(field);
  const returnedName = isScalar
    ? listScalars[typeName]
    : `${prefix ? prefix : ''}${typeName}${suffix ? suffix : ''}`;

  return returnedName + (isArray ? '[]' : '');
};

/** Generate interface fields (ex: ['firstName: string', 'birthDate: Date']) */
export const generatedTsFields = (fields: (Field | InputField)[]): string[] => {
  return fields.map(field => {
    let propertyName = field.name;
    const { isOptional } = evaluateType(field);
    const TStypeName = getOneTSTypeDisplay({ field });
    return `${field.description ? `/** ${field.description}*/\n` : ''} ${propertyName}${
      isOptional ? '?' : ''
    }: ${isOptional ? `Maybe<${TStypeName}>` : TStypeName};`;
  });
};

/** Generate GQL queries and mutations args (ex: $args: Args[], $where: WhereInput!) */
export const generateQGLArg = (field: Arg): string => {
  const { isArray, isArrayOptional, isOptional, typeName } = evaluateType(field);
  return `${isArray ? '[' : ''}${typeName}${isOptional ? '' : '!'}${isArray ? ']' : ''}${
    isArrayOptional ? '!' : ''
  }`;
};

/** Generates TS interface of a given GraphqlType (ex: interface User {name: string, role?: UserRole}) */
export const getObjectTSInterfaces = (object: Type): string => {
  let fieldsKey =
    object.kind === 'OBJECT' || object.kind === 'INTERFACE' ? 'fields' : 'inputFields';
  const generatedFields = generatedTsFields(object[fieldsKey]);
  return buildTsInterfaceString(object, generatedFields);
};

/** Generate queries and mutations arguments types (ex: interface LoginArgs {email: string; password: string}) */
export const getQueriesArgsTSInterfaces = (object: Field) => {
  const generatedFields = generatedTsFields(object.args);
  return buildTsInterfaceString(object, generatedFields, 'Args');
};

/** Returns generated ts interface (ex: interface User {firstName: string; id: string}) */
export const buildTsInterfaceString = (
  type: Type | Field,
  fields: string[],
  additionalSuffix?: string
): string => {
  const { prefix, suffix } = ParametersStore;
  return `${type.description ? `/** ${type.description} */\n` : ''} export interface ${
    prefix ? prefix : ''
  }${type.name}${suffix ? suffix : ''}${additionalSuffix ? additionalSuffix : ''} {
    ${fields.join('\n')}
  }
`;
};
