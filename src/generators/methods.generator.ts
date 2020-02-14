import { Field, Type, Arg, MethodType, CodeGenType } from '../models';
import { getOneTSTypeDisplay, generateQGLArg } from './types.generator';
import {
  evaluateType,
  isReturnTypeEdge,
  areAllArgsOptional,
  capitalizeAllWord,
  capitalizeFirstLetter,
} from '../utilities';
import { createConnectionFragment } from './fragments.generator';
import { queryBuilder, createQueryFunction } from './templates.generator';
import { createReactApolloHook, createVueApolloHook } from './hooks.generator';
import { ParametersStore } from '../store';

export const createMethodsArgs = (
  field: Field
): {
  GQLVariables: string[];
  GQLArgs: string[];
  methodArgsType: string;
} => {
  const { prefix, suffix } = ParametersStore;
  const { GQLVariables, GQLArgs } = field.args.reduce(
    (acc, arg) => {
      const argName = arg.name;
      const type = generateQGLArg(arg);
      acc.GQLVariables.push(`$${argName}: ${type}`);
      acc.GQLArgs.push(`${argName}: $${argName}`);
      return acc;
    },
    {
      GQLVariables: [] as string[],
      GQLArgs: [] as string[],
    }
  );
  let methodArgsType = '';
  if (field.args.length) {
    const parsedSuffix = (suffix ? suffix : '') + 'Args';
    methodArgsType = `${prefix ? prefix : ''}${field.name}${parsedSuffix}`;
  }
  return {
    GQLArgs,
    GQLVariables,
    methodArgsType,
  };
};

interface GraphQLFunctionArgs {
  field: Field;
  type: MethodType;
  renderedFragmentInner: string;
}

export const createGraphQLFunction = ({
  field,
  type,
  renderedFragmentInner,
}: GraphQLFunctionArgs): string => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { methodArgsType } = createMethodsArgs(field);
  const { isScalar } = evaluateType(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({ field });

  const Query = queryBuilder({ field, isScalar, renderedFragmentInner, type });

  const typeNameLower = type;
  const typeNameUpper = capitalizeFirstLetter(type);

  const withArgs = hasArgs
    ? areAllArgsOptional(field.args)
      ? 'WithOptionalArgs'
      : 'WithArgs'
    : '';

  if (isScalar) {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    ${methodName}(): Abortable${typeNameUpper}${withArgs}<${returnedTypeDisplay}${
      hasArgs ? ',' + methodArgsType : ''
    }> {
      const ${typeNameLower} = ${Query}
      return abortable${typeNameUpper}(${typeNameLower}, ${hasArgs});
        }
    ,`;
  } else {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    ${methodName}(): Fragmentable${typeNameUpper}${withArgs}<${returnedTypeDisplay}${
      hasArgs ? ',' + methodArgsType : ''
    }> {
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const ${typeNameLower} = ${Query}
        return abortable${typeNameUpper}(${typeNameLower}, ${hasArgs});
      }
    }
      }
  ,`;
  }
};

export type buildMethodsArgs = {
  field: Field;
  type: MethodType;
  ObjectTypes: Type[];
  mode?: CodeGenType;
};

export const buildMethod = ({ field, type, ObjectTypes, mode }: buildMethodsArgs) => {
  const { isScalar, isEnum, typeName } = evaluateType(field);

  let renderedFragmentInner = `\${isString ? fragment : '...' + fragmentName}`;

  if (!isScalar && !isEnum && isReturnTypeEdge(ObjectTypes, typeName)) {
    renderedFragmentInner =
      createConnectionFragment(typeName, ObjectTypes, renderedFragmentInner) ??
      renderedFragmentInner;
  }
  const createParams = { field, type, renderedFragmentInner };

  if (mode === 'template') {
    return createQueryFunction(createParams);
  } else if (mode === 'react-hooks') {
    return createReactApolloHook(createParams);
  } else if (mode === 'vue-hooks') {
    return createVueApolloHook(createParams);
  } else {
    return createGraphQLFunction(createParams);
  }
};
