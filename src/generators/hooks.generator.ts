import { Field, MethodType, Type } from 'src/models';
import { createMethodsArgs } from './methods.generator';
import { evaluateType, areAllArgsOptional } from '../utilities';
import { getOneTSTypeDisplay } from './types.generator';
import { queryBuilder } from './query.generator';

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface graphQLFunctionArgs {
  field: Field;
  prefix: string;
  suffix: string;
  ObjectTypes: Type[];
  type: MethodType;
  scalarList: { [x: string]: string };
  renderedFragmentInner: string;
}

export const createApolloHook = ({
  field,
  ObjectTypes,
  prefix,
  suffix,
  type,
  scalarList,
  renderedFragmentInner,
}: graphQLFunctionArgs): string => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { methodArgsType } = createMethodsArgs(field, prefix, suffix);
  const { isScalar } = evaluateType(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({ field, prefix, suffix, scalarList });

  const Query = queryBuilder({ field, isScalar, prefix, suffix, renderedFragmentInner, type });

  if (isScalar) {
    return `
    use${capitalize(field.name)}()  {
      const ${type.little} = ${Query}
      return use${type.high}<{${methodName}: ${returnedTypeDisplay}}>(${type.little});
      }
    ,`;
  } else {
    return `use${capitalize(field.name)}(fragment: string | DocumentNode)  {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      const ${type.little} = ${Query}

      return use${type.high}<{${methodName}: ${returnedTypeDisplay}}${
      hasArgs ? ', ' + methodArgsType : ''
    }>(${type.little});
      }
  ,`;
  }
};
