import { GraphQLJSONSchema, Field, TypeKind } from '../models';
import {
  getObjectTSInterfaces,
  generateEnumType,
  getQueriesArgsTSInterfaces,
  generateUnionType,
} from './types.generator';
import { retrieveQueriesList } from '../builders';
import { SchemaStore } from 'src/store';

export function generateInterfaces(schema: GraphQLJSONSchema): string[] {
  const { schemaTypes } = SchemaStore;
  const OBJECT_TYPES = [TypeKind.OBJECT, TypeKind.INTERFACE, TypeKind.INPUT_OBJECT];

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

export function generateMethodsArgsTypes(schema: GraphQLJSONSchema) {
  const [queries, mutations, subscriptions] = retrieveQueriesList({
    schema,
  });

  const generatedMethodsArgs: string[] = [];
  [...queries, ...mutations, ...subscriptions].forEach((item) => {
    const generatedInterface = getQueriesArgsTSInterfaces(item);
    generatedMethodsArgs.push(generatedInterface);
  });
  return generatedMethodsArgs;
}
