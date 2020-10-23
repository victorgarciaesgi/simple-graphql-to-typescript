import { Field, MethodType, Type } from '@models';
import { capitalizeFirstLetter } from '@utilities';
import { getOneTSTypeDisplay } from './types.generator';
import { generateQueryFunction } from './templates.generator';
import { SchemaStore } from '@store';

interface GraphQLFunctionArgs {
  field: Field;
  functionType: MethodType;
  innerFragment: string;
}

export const createReactApolloHook = ({
  field,
  functionType,
  innerFragment,
}: GraphQLFunctionArgs): string => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { functionArgsTypeName } = SchemaStore.getFunctionFieldArgs(field);
  const { isScalar } = SchemaStore.getFieldProps(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({
    field,
  });

  const typeNameLower = functionType;
  const typeNameUpper = capitalizeFirstLetter(functionType);

  const Query = generateQueryFunction({
    field,
    innerFragment,
    functionType,
  });

  const TOptions = `{${methodName}: ${returnedTypeDisplay}}${
    hasArgs ? ', ' + functionArgsTypeName : ''
  }`;

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
  functionType,
  innerFragment,
}: GraphQLFunctionArgs): string => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { functionArgsTypeName } = SchemaStore.getFunctionFieldArgs(field);
  const { isScalar } = SchemaStore.getFieldProps(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({
    field,
  });

  const typeNameLower = functionType;
  const typeNameUpper = capitalizeFirstLetter(functionType);

  const Query = generateQueryFunction({
    field,
    innerFragment,
    functionType,
  });

  const TOptions = `{${methodName}: ${returnedTypeDisplay}${
    hasArgs ? ', ' + functionArgsTypeName : ''
  }}`;
  const TOptionsArgs = `Use${typeNameUpper}Options<${TOptions}>`;
  const vueApolloParams = `${
    hasArgs
      ? `variables?: ${functionArgsTypeName} | Ref<${functionArgsTypeName}> | ReactiveFunction<${functionArgsTypeName}>,`
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
