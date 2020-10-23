import { SchemaStore } from '@store';
import { getQueriesArgsTSInterfaces } from '@generators';

export function buildMethodsArgsTypes(): string[] {
  const schemaFunctions = SchemaStore.schemaFunctions;

  return schemaFunctions.flat().map((field) => {
    return getQueriesArgsTSInterfaces(field);
  });
}
