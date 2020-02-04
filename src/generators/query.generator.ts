import { Field, MethodType } from '../models';
import { createMethodsArgs } from './methods.generator';
import { evaluateType } from '../utilities';

interface QueryBuilderArgs {
  isScalar: boolean;
  field: Field;
  type: MethodType;
  prefix?: string;
  suffix?: string;
  renderedFragmentInner: string;
}

export const queryBuilder = ({
  isScalar,
  field,
  type,
  prefix,
  suffix,
  renderedFragmentInner,
}: QueryBuilderArgs): string => {
  const { GQLArgs, GQLVariables } = createMethodsArgs(field, prefix, suffix);
  const hasArgs = field.args.length > 0;
  const methodName = field.name;
  if (isScalar) {
    return `sgtsQL\`
      ${type.little} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''}
      }\``;
  } else {
    return `sgtsQL\`
      ${type.little} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''} {
          ${renderedFragmentInner}
        }
      } \${isFragment? fragment: ''}
      \``;
  }
};

interface CreateQueryFunctionArgs {
  field: Field;
  type: MethodType;
  prefix?: string;
  suffix?: string;
  renderedFragmentInner: string;
}

export const createQueryFunction = ({
  field,
  type,
  prefix,
  suffix,
  renderedFragmentInner,
}: CreateQueryFunctionArgs) => {
  const { isScalar } = evaluateType(field);
  const Query = queryBuilder({ field, isScalar, prefix, suffix, renderedFragmentInner, type });

  if (isScalar) {
    return `${field.name}()  {
      return ${Query};
    },`;
  } else {
    return `${field.name}(fragment: string | DocumentNode) {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      return ${Query};
    },`;
  }
};
