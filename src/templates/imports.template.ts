import { guessFragmentTypeTemplate } from './fragmentType.template';

interface DefineImportsArgs {
  codegenMethods: boolean;
  codegenReactHooks: boolean;
  codegenTemplates: boolean;
  codegenVueHooks: boolean;
}

export const defineImports = ({
  codegenReactHooks,
  codegenVueHooks,
  codegenMethods,
  codegenTemplates,
}: DefineImportsArgs): string => {
  let template = '';
  if (codegenReactHooks || codegenMethods || codegenTemplates || codegenVueHooks) {
    template = `
    import { OperationDefinitionNode, DocumentNode } from 'graphql';
    import sgtsQL from 'graphql-tag';
    ${guessFragmentTypeTemplate}
    `;
    if (codegenReactHooks) {
      template += `
      import { useMutation, useQuery, QueryHookOptions, MutationHookOptions, MutationTuple } from '@apollo/react-hooks'
      `;
    }
    if (codegenVueHooks) {
      template += `
      import {Ref} from '@vue/composition-api'
      import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from '@vue/apollo-composable'
      export type ReactiveFunction<TParam> = () => TParam;
      `;
    }
    if (codegenMethods) {
      template += `
      import ApolloClient, { QueryOptions, OperationVariables, MutationOptions, ObservableQuery } from 'apollo-client';
      import { execute } from 'apollo-link';
    `;
    }
  }

  return template;
};