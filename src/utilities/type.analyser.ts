import { Field, InputField, Arg, OfType, Type } from '../models';

/** Get strucuture properties from a field */
export const evaluateType = (field: Field | InputField | Arg) => {
  let propertyName = field.name;
  let isRequired = false;
  let isArray = false;
  let isArrayRequired = false;
  let isEdge = false;
  let isScalar = false;
  let isEnum = false;
  let typeName = '';

  function getFieldInfos(type: OfType): string | null {
    if (propertyName === 'edges') isEdge = true;
    else if (type.kind === 'NON_NULL') {
      if (isArray) {
        isArrayRequired = true;
      } else {
        isRequired = true;
      }
    }
    if (type.kind === 'LIST') {
      isArray = true;
    }
    if (type.ofType) {
      return getFieldInfos(type.ofType);
    } else {
      if (type.kind === 'SCALAR') {
        isScalar = true;
      } else if (type.kind === 'ENUM') {
        isEnum = true;
      }
      typeName = type.name;
    }
    return null;
  }
  getFieldInfos(field.type);

  return {
    isRequired,
    isArray,
    isArrayRequired,
    isEdge,
    isScalar,
    typeName,
    isEnum,
  };
};

export const isReturnTypeEdge = (ObjectTypes: Type[], typeName: string): boolean => {
  const type = ObjectTypes.find((f) => f.name === typeName);
  if (type) {
    return type.fields.map(evaluateType).some((s) => s.isEdge);
  }
  return false;
};

export const areAllArgsOptional = (args: Arg[]): boolean => {
  return args.map(evaluateType).every((m) => !m.isRequired);
};
