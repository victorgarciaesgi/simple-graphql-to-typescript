import { Field, Type, Arg, MethodType } from '../models';
import { getOneTSTypeDisplay, generateQGLArg } from './types.generator';
import { evaluateType, isReturnTypeEdge, areAllArgsOptional } from '../utilities';
import { createConnectionFragment } from './fragments.generator';
import { queryBuilder, createQueryFunction } from './query.generator';
import { createApolloHook } from './hooks.generator';
import { withDefinitionsTemplate } from 'src/templates';

export const createMethodsArgs = (
  field: Field,
  prefix?: string,
  suffix?: string
): {
  GQLVariables: string[];
  GQLArgs: string[];
  methodArgsType: string;
} => {
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
    const parsedSuffix = 'Args' + (suffix ? suffix : '');
    methodArgsType = `${prefix ? prefix : ''}${field.name}${parsedSuffix}`;
  }
  return {
    GQLArgs,
    GQLVariables,
    methodArgsType,
  };
};

interface graphQLFunctionArgs {
  field: Field;
  prefix?: string;
  suffix?: string;
  ObjectTypes: Type[];
  type: MethodType;
  scalarList: { [x: string]: string };
  renderedFragmentInner: string;
}

export const createGraphQLFunction = ({
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

  const withArgs = hasArgs
    ? areAllArgsOptional(field.args)
      ? 'WithOptionalArgs'
      : 'WithArgs'
    : '';

  if (isScalar) {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    ${methodName}(): Abortable${type.high}${withArgs}<${returnedTypeDisplay}${
      hasArgs ? ',' + methodArgsType : ''
    }> {
      const ${type.little} = ${Query}
    return abortable${type.high}(${type.little}, ${hasArgs}) as any;
        }
    ,`;
  } else {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    ${methodName}(): Fragmentable${type.high}${withArgs}<${returnedTypeDisplay}${
      hasArgs ? ',' + methodArgsType : ''
    }> {
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const ${type.little} = ${Query}

        return abortable${type.high}(${type.little}, ${hasArgs}) as any;
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
  scalarList: { [x: string]: string };
  withGqlQueries?: boolean;
  apolloHooks?: boolean;
  prefix?: string;
  suffix?: string;
};

export const buildMethod = ({
  field,
  type,
  ObjectTypes,
  scalarList,
  withGqlQueries,
  apolloHooks,
  prefix,
  suffix,
}: buildMethodsArgs) => {
  const { isScalar, isEnum, typeName } = evaluateType(field);

  const fragmentDisplay = `\${isString ? fragment : '...' + fragmentName}`;
  let renderedFragmentInner = fragmentDisplay;
  if (!isScalar && !isEnum && isReturnTypeEdge(ObjectTypes, typeName)) {
    renderedFragmentInner =
      createConnectionFragment(typeName, ObjectTypes, fragmentDisplay) ?? fragmentDisplay;
  }
  if (withGqlQueries) {
    return createQueryFunction({ field, prefix, suffix, type, renderedFragmentInner });
  } else if (apolloHooks) {
    return createApolloHook({
      ObjectTypes,
      field,
      prefix,
      suffix,
      type,
      scalarList,
      renderedFragmentInner,
    });
  } else {
    return createGraphQLFunction({
      ObjectTypes,
      field,
      prefix,
      suffix,
      type,
      scalarList,
      renderedFragmentInner,
    });
  }
};
