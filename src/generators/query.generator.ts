import { Field, MethodType } from '../models';
import { createMethodsArgs } from './methods.generator';

interface QueryBuilderArgs {
  isScalar: boolean;
  field: Field;
  type: MethodType;
  prefix: string;
  suffix: string;
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
    return `graphQlTag\`
      ${type.little} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''}
      }\``;
  } else {
    return ` graphQlTag\`
      ${type.little} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''} {
          ${renderedFragmentInner}
        }
      } \${isFragment? fragment: ''}
      \``;
  }
};
