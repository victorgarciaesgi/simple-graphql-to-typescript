import { Type, Field, OfType } from '../models';
import { SchemaStore } from '@store';

/** Generate a connection fragment for fields like `pageInfo`, and a placeholder for insertable content */
export function generateConnectionFragment(typeName: string, fragment: string): string | null {
  const foundType = SchemaStore.findType(typeName);
  if (foundType) {
    let outputFragment = '';
    const containsNode = !!foundType.fields.find((field) => field.name === 'node');
    const generateLines = (field: Field, level: number): void => {
      outputFragment += `${field.name} `;
      const { typeName, isScalar } = SchemaStore.getFieldProps(field);
      if (!isScalar) {
        if (field.name === 'node') {
          outputFragment += `{${fragment}} `;
        } else if (level < 4) {
          outputFragment += `{ `;
          const type = SchemaStore.findType(typeName);
          type?.fields?.forEach((f) => generateLines(f, level + 1));
          outputFragment += `} `;
        }
      }
    };
    foundType.fields.map((m) => generateLines(m, 0));
    return outputFragment;
  }
  return null;
}

/** Generate a normal Type fragment usable everywhere */
export function generateNormalFragment(type: Type, connection?: boolean): string | null {
  let outputFragment = '';
  const THRESHOLD = connection ? 4 : 2;

  const createFragmentWithDeps = (field: Field, level: number): void => {
    try {
      let { typeName, isScalar, isEnum } = SchemaStore.getFieldProps(field);
      if (!isScalar && !isEnum) {
        const type = SchemaStore.findType(typeName);
        if (level < THRESHOLD) {
          const allChildrenFragmentable = type?.fields.some((s) => {
            if (level + 1 >= THRESHOLD) {
              const { isEnum, isScalar } = SchemaStore.getFieldProps(s);
              return isEnum || isScalar;
            } else {
              return true;
            }
          });
          if (allChildrenFragmentable) {
            outputFragment += `${field.name} {`;

            type?.fields?.forEach((field) => createFragmentWithDeps(field, level + 1));
            outputFragment += `} `;
          }
        } else if (type?.fields && type.fields.length < 7) {
          const allChildrenFragmentable = type?.fields.some((s) => {
            if (level + 1 >= THRESHOLD) {
              const { isEnum, isScalar } = SchemaStore.getFieldProps(s);
              return isEnum || isScalar;
            } else {
              return true;
            }
          });
          if (allChildrenFragmentable) {
            outputFragment += `${field.name} {`;
            type?.fields?.forEach((field) => createFragmentNoDeps(field));
            outputFragment += `} `;
          }
        }
      } else {
        outputFragment += `${field.name} `;
      }
    } catch (e) {
      new Error(e);
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
