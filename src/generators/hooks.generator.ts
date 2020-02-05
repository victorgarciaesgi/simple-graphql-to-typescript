import { Field, MethodType, Type } from '../models';
import { createMethodsArgs } from './methods.generator';
import { evaluateType, areAllArgsOptional } from '../utilities';
import { getOneTSTypeDisplay } from './types.generator';
import { queryBuilder } from './query.generator';

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface GraphQLFunctionArgs {
  field: Field;
  type: MethodType;
  renderedFragmentInner: string;
}

export const createApolloHook = ({
  field,
  type,
  renderedFragmentInner,
}: GraphQLFunctionArgs): string => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { methodArgsType } = createMethodsArgs(field);
  const { isScalar } = evaluateType(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({
    field,
  });

  const typeNameLower = type;
  const typeNameUpper = capitalize(type);

  const Query = queryBuilder({
    field,
    isScalar,
    renderedFragmentInner,
    type,
  });

  const TOptions = `{${methodName}: ${returnedTypeDisplay}}${hasArgs ? ', ' + methodArgsType : ''}`;

  let useHookOutput = '';

  if (typeNameLower === MethodType.Query) {
    useHookOutput = `
      return use${typeNameUpper}<${TOptions}>(${typeNameLower}, options);`;
  } else {
    useHookOutput = `return use${typeNameUpper}<${TOptions}>(${typeNameLower}, options);`;
  }

  if (isScalar) {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    use${capitalize(field.name)}(options?: ${typeNameUpper}HookOptions<${TOptions}>)   {
      const ${typeNameLower} = ${Query}
      ${useHookOutput}
    },`;
  } else {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    use${capitalize(
      field.name
    )}(fragment: string | DocumentNode, options?: ${typeNameUpper}HookOptions<${TOptions}>) {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      const ${typeNameLower} = ${Query}

      ${useHookOutput}
    }
  ,`;
  }
};
