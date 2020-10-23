import { Field, InputField, Arg, Type } from '../models';
import { capitalizeAllWord } from '../utilities';
import { ParametersStore } from '../store/parameters.store';
import { SchemaStore } from '@store';

// Generate Enum type (ex: export enum Gender { M = 'M', F = 'F'})
export const generateEnumType = (object: Type): string => {
  const { prefix, suffix } = ParametersStore;
  let ObjectName: string = object.name;
  const generatedFields = object.enumValues.map((field) => field.name);
  return `${object.description ? `/** ${object.description} */\n` : ''} export enum ${
    prefix ? prefix : ''
  }${ObjectName}${suffix ? suffix : ''} {
        ${generatedFields
          .map((enumType) => `${capitalizeAllWord(enumType)} = "${enumType}"`)
          .join(',\n')}
  }`;
};

// Generate UnionType type (ex: export type Union = Type1 | Type2)
export const generateUnionType = (object: Type): string => {
  const { prefix, suffix } = ParametersStore;
  let ObjectName: string = object.name;
  return `${object.description ? `/** ${object.description} */\n` : ''} export type ${
    prefix ? prefix : ''
  }${ObjectName}${suffix ? suffix : ''} = ${object.possibleTypes
    ?.map((type) => type.name)
    .join('|')}`;
};

/** Get the ts type from a Field (ex: 'string[]') */
export const getOneTSTypeDisplay = ({ field }: { field: Field | InputField | Arg }): string => {
  const { prefix, suffix, listScalars } = ParametersStore;
  const { isScalar, fieldName, isArray } = SchemaStore.getFieldProps(field);
  const returnedName = isScalar
    ? listScalars[fieldName]
    : `${prefix ? prefix : ''}${fieldName}${suffix ? suffix : ''}`;

  return returnedName + (isArray ? '[]' : '');
};

/** Generate interface fields (ex: ['firstName: string', 'birthDate: Date']) */
export const generatedTsFields = (fields: (Field | InputField)[], isInput?: boolean): string[] => {
  return fields.map((field) => {
    let propertyName = field.name;
    const { isRequired } = SchemaStore.getFieldProps(field);
    const TStypeName = getOneTSTypeDisplay({ field });
    return `${field.description ? `/** ${field.description}*/\n` : ''} ${propertyName}${
      isRequired ? '' : isInput ? '?' : ''
    }: ${isRequired || isInput ? TStypeName : `Maybe<${TStypeName}>`};`;
  });
};

/** Generate GQL queries and mutations args (ex: $args: Args[], $where: WhereInput!) */
export const generateQGLArg = (field: Arg): string => {
  const { isArray, isArrayRequired, isRequired, fieldName } = SchemaStore.getFieldProps(field);
  return `${isArray ? '[' : ''}${fieldName}${isArrayRequired ? '!' : ''}${isArray ? ']' : ''}${
    isRequired ? '!' : ''
  }`;
};

/** Generates TS interface of a given GraphqlType (ex: interface User {name: string, role?: UserRole}) */
export const getObjectTSInterfaces = (object: Type, isInput?: boolean): string => {
  let fields = isInput ? object.inputFields : object.fields;
  const generatedFields = generatedTsFields(fields, isInput);
  return buildTsInterfaceString(object, generatedFields);
};

/** Generate queries and mutations arguments types (ex: interface LoginArgs {email: string; password: string}) */
export const getQueriesArgsTSInterfaces = (object: Field) => {
  const generatedFields = generatedTsFields(object.args, true);
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
