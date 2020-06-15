import { GraphQLJSONSchema, Field } from '../models';
import {
  getObjectTSInterfaces,
  generateEnumType,
  getQueriesArgsTSInterfaces,
} from './types.generator';
import { retrieveQueriesList } from '../builders';

const typesToParse = ['OBJECT', 'INPUT_OBJECT', 'INTERFACE'];

export function generateInterfaces(schema: GraphQLJSONSchema) {
  const schemaTypes = schema.__schema.types;
  const generatedTypes: string[] = [];
  const generatedEnums: string[] = [];

  schemaTypes.forEach((item) => {
    if (!/^_{1,2}/.test(item.name)) {
      if (typesToParse.includes(item.kind)) {
        const generatedInterface = getObjectTSInterfaces(item);
        generatedTypes.push(generatedInterface);
      } else if (item.kind === 'ENUM') {
        const enumTypes = generateEnumType(item);
        generatedEnums.push(enumTypes);
      }
    }
  });
  return {
    generatedTypes,
    generatedEnums,
  };
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
