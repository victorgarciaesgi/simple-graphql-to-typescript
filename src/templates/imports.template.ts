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
      `;
    }
    if (codegenVueHooks) {
      template += `
      import { Ref } from '@vue/composition-api'
      import { useMutation, useQuery, useSubscription, UseQueryOptions, UseMutationOptions, UseSubscriptionOptions } from '@vue/apollo-composable'
      export type ReactiveFunction<TParam> = () => TParam;
      `;
    }
    if (codegenFunctions) {
      template += `
      import ApolloClient, { QueryOptions, OperationVariables, MutationOptions, ObservableQuery } from 'apollo-client';
      import { execute } from 'apollo-link';
    `;
    }
  }

  return template;
};
