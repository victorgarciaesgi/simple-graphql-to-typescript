import { MethodType, TypeKind } from '@models';
import { generateNormalFragment } from '@generators';
import { SchemaStore } from '@store';

const TYPES_TO_PARSE = [TypeKind.OBJECT, TypeKind.INTERFACE];
const forbiddenTypes = [MethodType.Query, MethodType.Mutation, MethodType.Subscription];

export function buildFragments(): string[] {
  const { schemaTypes } = SchemaStore;

  return schemaTypes
    .map((type) => {
      if (TYPES_TO_PARSE.includes(type.kind) && !forbiddenTypes.includes(type.name as MethodType)) {
        const isConnection = SchemaStore.isTypeConnection(type.name);
        const fragment = generateNormalFragment(type, isConnection);
        if (fragment) {
          return `export const ${type.name}Fragment = gql\` 
  fragment ${type.name}Fragment on ${type.name} {
    ${fragment}
  }
\`;`;
        }
      }
    })
    .filter((value): value is string => !!value);
}
