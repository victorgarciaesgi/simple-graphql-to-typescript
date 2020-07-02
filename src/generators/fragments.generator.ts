import { Type, Field, OfType } from '../models';
import { evaluateType } from '../utilities';

export const createConnectionFragment = (
  typeName: string,
  allTypes: Type[],
  fragment: string
): string | null => {
  const foundType = allTypes.find((f) => f.name === typeName);
  if (foundType) {
    let outputFragment = '';

    const createLines = (field: Field) => {
      outputFragment += `${field.name} `;
      const { typeName, isScalar } = evaluateType(field);
      if (!isScalar) {
        if (field.name === 'node') {
          outputFragment += `{${fragment}} `;
        } else {
          outputFragment += `{ `;
          const type = allTypes.find((f) => f.name === typeName);
          type?.fields?.forEach(createLines);
          outputFragment += `} `;
        }
      }
    };
    foundType.fields.map(createLines);
    return outputFragment;
  }
  return null;
};

export const createNormalFragment = (
  type: Type,
  allTypes: Type[]
): { fragment: string; foundName: string } | null => {
  let foundType = allTypes.find((f) => f.name === type.name);
  if (foundType) {
    let outputFragment = '';
    let nestedTypes: string[] = [foundType.name];

    const createLines = (field: Field) => {
      let { typeName, isScalar, isEnum } = evaluateType(field);
      if (!isScalar && !isEnum && !nestedTypes.includes(typeName)) {
        outputFragment += `${field.name} {`;
        const type = allTypes.find((f) => f.name === typeName);
        nestedTypes.push(typeName);
        type?.fields?.forEach(createLines);
        outputFragment += `} `;
      } else if (!nestedTypes.includes(typeName)) {
        outputFragment += `${field.name} `;
      }
    };
    foundType.fields.map(createLines);
    return {
      fragment: outputFragment,
      foundName: foundType.name,
    };
  }
  return null;
};
