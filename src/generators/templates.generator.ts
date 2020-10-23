import { Field, MethodType } from '@models';
import { SchemaStore } from '@store';

interface QueryBuilderArgs {
  field: Field;
  functionType: MethodType;
  innerFragment: string;
  defaultFragmentName?: string;
}

export function generateTemplateQuery({
  field,
  functionType,
  innerFragment,
  defaultFragmentName,
}: QueryBuilderArgs): string {
  const { GQLArgs, GQLVariables } = SchemaStore.getFunctionFieldArgs(field);
  const { isScalar } = SchemaStore.getFieldProps(field);
  const hasArgs = field.args.length > 0;
  const methodName = field.name;
  const typeNameLower = functionType;
  if (isScalar) {
    return `sgtsQL\`
      ${typeNameLower} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''}
      }\``;
  } else if (!defaultFragmentName) {
    return `sgtsQL\`
      ${typeNameLower} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''} {
          ${innerFragment}
        }
      } \${isFragment ? fragment : ''}
      \``;
  } else {
    return `sgtsQL\`
      ${typeNameLower} ${methodName} ${hasArgs ? `(${GQLVariables.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${GQLArgs.join(',')})` : ''} {
          ...${defaultFragmentName}
        }
      } \${${defaultFragmentName}}
      \``;
  }
}

interface CreateQueryFunctionArgs {
  field: Field;
  functionType: MethodType;
  innerFragment: string;
}

export function generateQueryFunction({
  field,
  functionType,
  innerFragment,
}: CreateQueryFunctionArgs) {
  const { isScalar } = SchemaStore.getFieldProps(field);
  const Query = generateTemplateQuery({ field, innerFragment, functionType });

  if (isScalar) {
    return `export const ${field.name}GQLNode = (): DocumentNode =>  {
      return ${Query};
    }`;
  } else {
    return `export const ${field.name}GQLNode = (fragment: string | DocumentNode): DocumentNode => {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      return ${Query};
    }`;
  }
}
