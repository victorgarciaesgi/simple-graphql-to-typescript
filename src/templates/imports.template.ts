import { guessFragmentTypeTemplate } from './fragmentType.template';
import { ParametersStore } from '@store';

export const defineImports = (): string => {
  let template = '';
  const { isCodeGen, codegenFunctions, codegenVueHooks, codegenReactHooks } = ParametersStore;
  if (isCodeGen) {
    template = `
    import { OperationDefinitionNode } from 'graphql';
    ${guessFragmentTypeTemplate}
    `;
    if (codegenReactHooks) {
      template += `
      import { useMutation, useQuery, useSubscription, QueryHookOptions, MutationHookOptions, SubscriptionHookOptions, MutationTuple } from '@apollo/react-hooks'
      import { DocumentNode, gql } from '@apollo/client'
      `;
    }
    if (codegenVueHooks) {
      template += `
      import { Ref } from '@vue/composition-api'
      import { useMutation, useQuery, useSubscription, UseQueryOptions, UseMutationOptions, UseSubscriptionOptions } from '@vue/apollo-composable'
      import { DocumentNode, gql } from '@apollo/client/core'

      export type ReactiveFunction<TParam> = () => TParam;
      `;
    }
    if (codegenFunctions) {
      template += `
      import { ApolloClient, execute, DocumentNode, gql } from '@apollo/client/core';
    `;
    }
  }

  return template;
};
