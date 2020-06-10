import { Type, Field } from '../models';
import { evaluateType } from '../utilities';

export const createConnectionFragment = (
  typeName: string,
  allTypes: Type[],
  fragment: string
): string | null => {
  const foundType = allTypes.find(f => f.name === typeName);
  if (foundType) {
    let outputFragment = '';

    const createLines = (field: Field) => {
      outputFragment += `${field.name} `;
      const { typeName, isScalar } = evaluateType(field);
      if (!isScalar) {
        if (field.name === 'node') {
          outputFragment += `{${fragment}}`;
        } else {
          outputFragment += ` {`;
          const type = allTypes.find(f => f.name === typeName);
          type?.fields?.forEach(createLines);
          outputFragment += `}`;
        }
      }
    };
    foundType.fields.map(createLines);
    return outputFragment;
  }
  return null;
};
