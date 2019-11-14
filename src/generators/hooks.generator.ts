import { Field, MethodType, Type } from 'src/models';
import { createMethodsArgs } from './methods.generator';
import { evaluateType, areAllArgsOptional } from '../utilities';
import { getOneTSTypeDisplay } from './types.generator';
import { queryBuilder } from './query.generator';
import { types } from 'util';

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

  const TOptions = `${returnedTypeDisplay}${hasArgs ? ', ' + methodArgsType : ''}`;

  let useHookOutput = '';

  if (type.little === 'query') {
    useHookOutput = `
      const {data, ...rest} = use${type.high}<${TOptions}>(${type.little}, options);
      return {
        data: (data ? data[queryName]: null) as ${returnedTypeDisplay},
        ...rest
      }`;
  } else {
    useHookOutput = `const [mut, data] = use${type.high}<${TOptions}>(${type.little}, options);
      return [
        mut,
        (data ? data[queryName]: null)
      ] as MutationTuple<${returnedTypeDisplay}${hasArgs ? ', ' + methodArgsType : ''}>`;
  }

  if (isScalar) {
    return `
    use${capitalize(field.name)}(options?: ${type.high}HookOptions<${TOptions}>)   {
      const ${type.little} = ${Query}
      const parsedQuery = ${type.little}.definitions[0];
      const queryName = parsedQuery.name.value;
      ${useHookOutput}
    },`;
  } else {
    return `use${capitalize(field.name)}(fragment: string | DocumentNode, options?: ${
      type.high
    }HookOptions<${TOptions}>) {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      const ${type.little} = ${Query}
      const parsedQuery = ${type.little}.definitions[0];
      const queryName = parsedQuery.name.value;

      ${useHookOutput}
    }
  ,`;
  }
};
