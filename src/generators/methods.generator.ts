import { Field, Type, Arg, MethodType } from '../models/schema.models';
import { getOneTSTypeDisplay, generateQGLArg } from './types.generator';
import { evaluateType, isReturnTypeEdge, areAllArgsOptional } from '../utilities/type.analyser';
import { createConnectionFragment } from './fragments.generator';

export const createMethodsArgs = (
  field: Field,
  prefix: string,
  suffix: string
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
      GQLVariables: [],
      GQLArgs: [],
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

interface ScalarArgs {
  field: Field;
  prefix: string;
  suffix: string;
  ObjectTypes: Type[];
  type: MethodType;
  scalarList: { [x: string]: string };
}

export const createGraphQLFunction = ({
  field,
  ObjectTypes,
  prefix,
  suffix,
  type,
  scalarList,
}: ScalarArgs): string => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;
  const fragmentDisplay = `\${isString ? fragment : '...' + fragmentName}`;

  const { GQLArgs, GQLVariables, methodArgsType } = createMethodsArgs(field, prefix, suffix);
  const { isScalar, isEnum, typeName } = evaluateType(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({ field, prefix, suffix, scalarList });

  let renderedFragmentInner = fragmentDisplay;
  if (!isScalar && !isEnum && isReturnTypeEdge(ObjectTypes, typeName)) {
    renderedFragmentInner = createConnectionFragment(typeName, ObjectTypes, fragmentDisplay);
  }

  if (isScalar) {
    return `
    const ${type.little} = graphQlTag\`
      ${type.little} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''}
      }\`,
    return abortable${type.high}(${type.little}, ${hasArgs}) as any;
  `;
  } else {
    return `
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const ${type.little} = graphQlTag\`
          ${type.little} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
            ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''} {
              ${renderedFragmentInner}
            }
          } \${isFragment? fragment: ''}
          \`

        return abortable${type.high}(${type.little}, ${hasArgs}) as any;
      }
    }
  `;
  }
};

export const buildMethod = (
  field: Field,
  type: MethodType,
  prefix: string,
  suffix: string,
  ObjectTypes: Type[],
  scalarList: { [x: string]: string }
) => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { isScalar } = evaluateType(field);
  const { methodArgsType } = createMethodsArgs(field, prefix, suffix);
  const returnedTypeDisplay = getOneTSTypeDisplay({ field, prefix, suffix, scalarList });

  const genereratedFunction = createGraphQLFunction({
    ObjectTypes,
    field,
    prefix,
    suffix,
    type,
    scalarList,
  });

  const withArgs = hasArgs
    ? areAllArgsOptional(field.args)
      ? 'WithOptionalArgs'
      : 'WithArgs'
    : '';

  const template = `
    ${methodName}(): ${
    isScalar
      ? `Abordable${type.high}${withArgs}<${returnedTypeDisplay}${
          hasArgs ? ',' + methodArgsType : ''
        }>`
      : `Fragmentable${type.high}${withArgs}<${returnedTypeDisplay}${
          hasArgs ? ',' + methodArgsType : ''
        }>`
  } {
        ${genereratedFunction}
      }
    ,`;
  return template;
};

const lol = {
  me(): string {
    return '';
  },
};
