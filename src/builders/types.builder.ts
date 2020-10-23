import { TypeKind } from '@models';
import { getObjectTSInterfaces, generateEnumType, generateUnionType } from '@generators';
import { SchemaStore } from '@store';

const OBJECT_TYPES = [TypeKind.OBJECT, TypeKind.INTERFACE, TypeKind.INPUT_OBJECT];

export function buildSchemaTypes(): string[] {
  const { schemaTypes } = SchemaStore;

  return schemaTypes.map((type) => {
    let typeOutput = '';
    if (OBJECT_TYPES.includes(type.kind)) {
      typeOutput = getObjectTSInterfaces(type, type.kind === TypeKind.INPUT_OBJECT);
    } else if (type.kind === TypeKind.UNION) {
      typeOutput = generateUnionType(type);
    } else if (type.kind === TypeKind.ENUM) {
      typeOutput = generateEnumType(type);
    }
    return typeOutput;
  });
}
