import { Type, Field, OfType } from '../models';
import { evaluateType } from '../utilities';
import { range } from 'lodash';

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

    const createFragmentWithDeps = (field: Field, level: number) => {
      let { typeName, isScalar, isEnum } = evaluateType(field);
      if (!isScalar && !isEnum) {
        outputFragment += `${field.name} {`;
        const type = allTypes.find((f) => f.name === typeName);
        if (level > 2 && type?.fields && type.fields.length < 7) {
          type?.fields?.forEach((m) => createFragmentWithDeps(m, level + 1));
          outputFragment += `} `;
        } else {
          type?.fields?.forEach((m) => createFragmentNoDeps(m, level + 1));
        }
      } else {
        outputFragment += `${field.name} `;
      }
    };
    const createFragmentNoDeps = (field: Field, level: number) => {
      let { typeName, isScalar, isEnum } = evaluateType(field);
      if (isScalar || isEnum) {
        outputFragment += `${field.name} `;
      }
    };
    foundType.fields.map((m) => createFragmentWithDeps(m, 1));
    return {
      fragment: outputFragment,
      foundName: foundType.name,
    };
  }
  return null;
};
