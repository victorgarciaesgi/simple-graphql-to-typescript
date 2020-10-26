import { Type, Field, OfType } from '../models';
import { SchemaStore } from '@store';

/** Generate a connection fragment for fields like `pageInfo`, and a placeholder for insertable content */
export function generateConnectionFragment(typeName: string, fragment: string): string | null {
  const foundType = SchemaStore.findType(typeName);
  if (foundType) {
    let outputFragment = '';

    const generateLines = (field: Field): void => {
      outputFragment += `${field.name} `;
      const { typeName, isScalar } = SchemaStore.getFieldProps(field);
      if (!isScalar) {
        if (field.name === 'node') {
          outputFragment += `{${fragment}} `;
        } else {
          outputFragment += `{ `;
          const type = SchemaStore.findType(typeName);
          type?.fields?.forEach(generateLines);
          outputFragment += `} `;
        }
      }
    };
    foundType.fields.map(generateLines);
    return outputFragment;
  }
  return null;
}

/** Generate a normal Type fragment usable everywhere */
export function generateNormalFragment(type: Type, connection?: boolean): string | null {
  let outputFragment = '';
  const THRESHOLD = connection ? 4 : 2;

  const createFragmentWithDeps = (field: Field, level: number): void => {
    let { typeName, isScalar, isEnum } = SchemaStore.getFieldProps(field);
    if (!isScalar && !isEnum) {
      const type = SchemaStore.findType(typeName);
      if (level < THRESHOLD) {
        outputFragment += `${field.name} {`;
        type?.fields?.forEach((field) => createFragmentWithDeps(field, level + 1));
        outputFragment += `} `;
      } else if (type?.fields && type.fields.length < 7) {
        outputFragment += `${field.name} {`;
        type?.fields?.forEach((field) => createFragmentNoDeps(field));
        outputFragment += `} `;
      }
    } else {
      outputFragment += `${field.name} `;
    }
  };
  const createFragmentNoDeps = (field: Field) => {
    let { isScalar, isEnum } = SchemaStore.getFieldProps(field);
    if (isScalar || isEnum) {
      outputFragment += `${field.name} `;
    }
  };
  type.fields.map((m) => createFragmentWithDeps(m, 0));
  return outputFragment;
}
