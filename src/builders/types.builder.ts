import { TypeKind } from '@models';
import { getObjectTSInterfaces, generateEnumType, generateUnionType } from '@generators';
import { SchemaStore } from '@store';

const OBJECT_TYPES = [TypeKind.OBJECT, TypeKind.INTERFACE, TypeKind.INPUT_OBJECT];

export function buildSchemaTypes(): string[] {
  const { schemaTypes } = SchemaStore;

  return schemaTypes.map((type) => {
    if (OBJECT_TYPES.includes(type.kind)) {
      return getObjectTSInterfaces(type, type.kind === TypeKind.INPUT_OBJECT);
    } else if (type.kind === TypeKind.UNION) {
      return generateUnionType(type);
    } else if (type.kind === TypeKind.ENUM) {
      return generateEnumType(type);
    } else {
      return '';
    }
  });
}
