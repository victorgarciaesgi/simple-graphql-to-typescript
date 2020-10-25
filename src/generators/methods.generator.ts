import { Field, MethodType, CodeGenType } from '../models';
import { getOneTSTypeDisplay } from './types.generator';
import { generateConnectionFragment } from './fragments.generator';
import { generateQueryFunction, generateTemplateQuery } from './templates.generator';
import { createReactApolloHook, createVueApolloHook } from './hooks.generator';
import { ParametersStore, SchemaStore } from '../store';

interface GraphQLFunctionArgs {
  field: Field;
  functionType: MethodType;
  innerFragment: string;
}

export function createGraphQLFunction({
  field,
  functionType,
  innerFragment,
}: GraphQLFunctionArgs): string {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { functionArgsTypeName } = SchemaStore.getFunctionFieldArgs(field);
  const { isScalar, fieldName } = SchemaStore.getFieldProps(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({ field });

  const { genFragments } = ParametersStore;

  const Query = generateTemplateQuery({ field, innerFragment, functionType });
  let defaultQuery: string | null = null;

  if (genFragments) {
    defaultQuery = generateTemplateQuery({
      field,
      innerFragment,
      functionType,
      defaultFragmentName: `${fieldName}Fragment`,
    });
  }

  const argsOptional = hasArgs ? SchemaStore.areFieldArgsAllOptional(field) : false;

  const withArgs = hasArgs ? (argsOptional ? 'WithOptionalArgs' : 'WithArgs') : '';

  if (isScalar) {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    ${methodName}(): ${withArgs ? '' : 'Executable'}Query${withArgs}<${returnedTypeDisplay}${
      hasArgs ? ',' + functionArgsTypeName : ''
    }> {
      const queryTemplate = ${Query}
      return abortableQuery(queryTemplate, ${hasArgs}, ${argsOptional});
        }
    ,`;
  } else {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    ${methodName}(): ${
      genFragments ? 'Un' : ''
    }FragmentableQuery${withArgs}<${returnedTypeDisplay}${
      hasArgs ? ',' + functionArgsTypeName : ''
    }> {
      ${genFragments ? `const defaultQuery = ${defaultQuery};` : ''}
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const queryTemplate = ${Query}
        return abortableQuery(queryTemplate, ${hasArgs}, ${argsOptional});
      },
      ${genFragments ? `...abortableQuery(defaultQuery, ${hasArgs}, ${argsOptional})` : ''}
    }
      }
  ,`;
  }
}

type generateFunctionArgs = {
  field: Field;
  functionType: MethodType;
  mode?: CodeGenType;
};

export function generateFunction({ field, functionType, mode }: generateFunctionArgs): string {
  const { isScalar, isEnum, fieldName } = SchemaStore.getFieldProps(field);

  let innerFragment = `\${isString ? fragment : '...' + fragmentName}`;

  if (!isScalar && !isEnum && SchemaStore.isTypeConnection(field.name)) {
    innerFragment = generateConnectionFragment(fieldName, innerFragment) ?? innerFragment;
  }
  const createParams = { field, functionType, innerFragment };

  if (mode === CodeGenType.METHODS) {
    return createGraphQLFunction(createParams);
  } else if (mode === CodeGenType.REACT_HOOKS) {
    return createReactApolloHook(createParams);
  } else if (mode === CodeGenType.VUE_HOOKS) {
    return createVueApolloHook(createParams);
  } else {
    return createGraphQLFunction(createParams);
  }
}
