import { Type, Field } from '../models/schema.models';
import { evaluateType } from '../utilities/type.analyser';

export const createConnectionFragment = (
  typeName: string,
  allTypes: Type[],
  fragment: string
): string => {
  const { fields } = allTypes.find(f => f.name === typeName);
  let outputFragment = '';

  const createLines = (field: Field) => {
    outputFragment += `
    ${field.name}`;
    const { typeName, isScalar } = evaluateType(field);
    if (!isScalar) {
      if (field.name === 'node') {
        outputFragment += `{${fragment}}`;
      } else {
        outputFragment += ` {
        `;
        const type = allTypes.find(f => f.name === typeName);
        type.fields.forEach(createLines);
        outputFragment += ` }`;
      }
    }
  };
  fields.map(createLines);
  return outputFragment;
};
