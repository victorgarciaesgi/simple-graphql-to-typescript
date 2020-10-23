import { GraphQLJSONSchema } from '../models';
import { isReturnTypeEdge } from '../utilities';
import { getObjectTSInterfaces, createNormalFragment } from '../generators';

const typesToParse = ['OBJECT', 'INTERFACE'];
const forbiddenTypes = ['Query', 'Mutation', 'Subscription'];

export function generateFragments(schema: GraphQLJSONSchema) {
  const schemaTypes = schema.__schema.types;
  const generatedFragments: string[] = [];
  const ObjectTypes = schema.__schema.types.filter((f) => f.kind === 'OBJECT');

  schemaTypes.forEach((type) => {
    if (!/^_{1,2}/.test(type.name)) {
      if (typesToParse.includes(type.kind) && !forbiddenTypes.includes(type.name)) {
        const isConnection = isReturnTypeEdge(ObjectTypes, type.name);
        const fragment = createNormalFragment(type, ObjectTypes, isConnection);
        if (fragment) {
          const output = `export const ${fragment.foundName}Fragment = sgtsQL\` 
  fragment ${fragment.foundName}Fragment on ${fragment.foundName} {
    ${fragment.fragment}
  }
\`;`;
          generatedFragments.push(output);
        }
      }
    }
  });
  return generatedFragments;
}
