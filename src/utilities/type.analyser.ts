import { Field, InputField, Arg, OfType, Type } from '../models';

/** Get strucuture properties from a field */
export const evaluateType = (field: Field | InputField | Arg) => {
  let propertyName = field.name;
  let isOptional = true;
  let isArray = false;
  let isArrayOptional = false;
  let isEdge = false;
  let isScalar = false;
  let isEnum = false;
  let typeName = '';

  function getFieldInfos(type: OfType): string {
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
        isScalar = true;
      } else if (type.kind === 'ENUM') {
        isEnum = true;
      }
      typeName = type.name;
    }
  }
  getFieldInfos(field.type);

  return {
    isOptional,
    isArray,
    isArrayOptional,
    isEdge,
    isScalar,
    typeName,
    isEnum,
  };
};

export const isReturnTypeEdge = (ObjectTypes: Type[], typeName: string): boolean => {
  return ObjectTypes.find(f => f.name === typeName)
    .fields.map(evaluateType)
    .some(s => s.isEdge);
};

export const areAllArgsOptional = (args: Arg[]): boolean => {
  return args.map(evaluateType).every(m => m.isOptional);
};
