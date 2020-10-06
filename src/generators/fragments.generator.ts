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
  allTypes: Type[],
  connection?: boolean
): { fragment: string; foundName: string } | null => {
  let foundType = allTypes.find((f) => f.name === type.name);
  if (foundType) {
    let outputFragment = '';
    const THRESHOLD = connection ? 4 : 2;

    const createFragmentWithDeps = (field: Field, level: number) => {
      let { typeName, isScalar, isEnum, isEdge } = evaluateType(field);
      if (!isScalar && !isEnum) {
        const type = allTypes.find((f) => f.name === typeName);
        if (level < THRESHOLD) {
          outputFragment += `${field.name} {`;
          type?.fields?.forEach((m) => createFragmentWithDeps(m, level + 1));
          outputFragment += `} `;
        } else if (type?.fields && type.fields.length < 7) {
          outputFragment += `${field.name} {`;
          type?.fields?.forEach((m) => createFragmentNoDeps(m, level + 1));
          outputFragment += `} `;
        }
      } else {
        outputFragment += `${field.name} `;
      }
    };
    const createFragmentNoDeps = (field: Field, level: number) => {
      let { isScalar, isEnum } = evaluateType(field);
      if (isScalar || isEnum) {
        outputFragment += `${field.name} `;
      }
    };
    foundType.fields.map((m) => createFragmentWithDeps(m, 0));
    return {
      fragment: outputFragment,
      foundName: foundType.name,
    };
  }
  return null;
};
