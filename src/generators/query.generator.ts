import { Field, MethodType } from '../models';
import { createMethodsArgs } from './methods.generator';
import { evaluateType } from '../utilities';

interface QueryBuilderArgs {
  isScalar: boolean;
  field: Field;
  type: MethodType;
  renderedFragmentInner: string;
}

export const queryBuilder = ({
  isScalar,
  field,
  type,
  renderedFragmentInner,
}: QueryBuilderArgs): string => {
  const { GQLArgs, GQLVariables } = createMethodsArgs(field);
  const hasArgs = field.args.length > 0;
  const methodName = field.name;
  const typeNameLower = type;
  if (isScalar) {
    return `sgtsQL\`
      ${typeNameLower} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''}
      }\``;
  } else {
    return `sgtsQL\`
      ${typeNameLower} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
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
  renderedFragmentInner: string;
}

export const createQueryFunction = ({
  field,
  type,
  renderedFragmentInner,
}: CreateQueryFunctionArgs) => {
  const { isScalar } = evaluateType(field);
  const Query = queryBuilder({ field, isScalar, renderedFragmentInner, type });

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
