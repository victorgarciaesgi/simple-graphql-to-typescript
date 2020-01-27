import { GraphQLJSONSchema, Field } from 'src/models';
import { getObjectTSInterfaces, generateEnumType, getQueriesArgsTSInterfaces } from './types.generator';

const typesToParse = ['OBJECT', 'INPUT_OBJECT', 'INTERFACE'];

export function generateInterfaces(
  schema: GraphQLJSONSchema,
  scalarList: { [x: string]: string },
  prefix?: string,
  suffix?: string,
) {
  const schemaTypes = schema.__schema.types;
  const generatedTypes: string[] = [];
  const generatedEnums: string[] = [];

  schemaTypes.forEach(item => {
    if (!/^_{1,2}/.test(item.name)) {
      if (typesToParse.includes(item.kind)) {
        const generatedInterface = getObjectTSInterfaces(item, scalarList, prefix, suffix);
        generatedTypes.push(`export ${generatedInterface}`);
      } else if (item.kind === 'ENUM') {
        const enumTypes = generateEnumType(item, prefix, suffix);
        generatedEnums.push(`export ${enumTypes}`);
      }
    }
  });
  return {
    generatedTypes,
    generatedEnums
  }
}


export function generateMethodsArgsTypes(schema: GraphQLJSONSchema,
  scalarList: { [x: string]: string },
  prefix?: string,
  suffix?: string,
) {
    const QueryType = schema.__schema.queryType?.name;
    const MutationType = schema.__schema.mutationType?.name;
    const listQueries = schema.__schema.types.find(f => f.name === QueryType)?.fields ?? [];
    let listMutations: Field[] = [];

    const generatedMethodsArgs: string[] = [];

    if (MutationType) {
      listMutations = schema.__schema.types.find(f => f.name === MutationType)?.fields ?? [];
    }
    [...listQueries, ...listMutations].forEach(item => {
      if (!/^_{1,2}/.test(item.name)) {
        const generatedInterface = getQueriesArgsTSInterfaces(item,scalarList, prefix, suffix );
        generatedMethodsArgs.push(`export ${generatedInterface}`);
      }
    });
    return generatedMethodsArgs
  }
