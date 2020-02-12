import { Field, MethodType, Type } from '../models';
import { createMethodsArgs } from './methods.generator';
import { evaluateType, areAllArgsOptional, capitalizeFirstLetter } from '../utilities';
import { getOneTSTypeDisplay } from './types.generator';
import { queryBuilder } from './templates.generator';

interface GraphQLFunctionArgs {
  field: Field;
  type: MethodType;
  renderedFragmentInner: string;
}

export const createReactApolloHook = ({
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
  const typeNameUpper = capitalizeFirstLetter(type);

  const Query = queryBuilder({
    field,
    isScalar,
    renderedFragmentInner,
    type,
  });

  const TOptions = `{${methodName}: ${returnedTypeDisplay}}${hasArgs ? ', ' + methodArgsType : ''}`;

  let useHookOutput = `return use${typeNameUpper}<${TOptions}>(${typeNameLower}, options);`;

  if (isScalar) {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    export const use${capitalizeFirstLetter(
      field.name
    )} = (options?: ${typeNameUpper}HookOptions<${TOptions}>) =>  {
      const ${typeNameLower} = ${Query}
      ${useHookOutput}
    },`;
  } else {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    export const use${capitalizeFirstLetter(
      field.name
    )} = (fragment: string | DocumentNode, options?: ${typeNameUpper}HookOptions<${TOptions}>) => {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      const ${typeNameLower} = ${Query}

      ${useHookOutput}
    }
  ,`;
  }
};

export const createVueApolloHook = ({
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
  const typeNameUpper = capitalizeFirstLetter(type);

  const Query = queryBuilder({
    field,
    isScalar,
    renderedFragmentInner,
    type,
  });

  const TOptions = `{${methodName}: ${returnedTypeDisplay}${hasArgs ? ', ' + methodArgsType : ''}}`;
  const TOptionsArgs = `Use${typeNameUpper}Options<${TOptions}>`;
  const vueApolloParams = `${
    hasArgs
      ? `variables?: ${methodArgsType} | Ref<${methodArgsType}> | ReactiveFunction<${methodArgsType}>,`
      : ''
  } options?: ${TOptionsArgs} | Ref<${TOptionsArgs}> | ReactiveFunction<${TOptionsArgs}>`;

  let useHookOutput = `return use${typeNameUpper}<${TOptions}>(${typeNameLower}, ${
    hasArgs ? 'variables,' : 'null,'
  } options);`;

  if (isScalar) {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    export const use${capitalizeFirstLetter(field.name)} = (${vueApolloParams}) =>  {
      const ${typeNameLower} = ${Query}
      ${useHookOutput}
    }`;
  } else {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    export const use${capitalizeFirstLetter(
      field.name
    )} = (fragment: string | DocumentNode, ${vueApolloParams}) => {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      const ${typeNameLower} = ${Query}

      ${useHookOutput}
    }`;
  }
};
