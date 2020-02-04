import { guessFragmentTypeTemplate } from './fragmentType.template';

interface DefineImportsArgs {
  codegenMethods: boolean;
  codegenHooks: boolean;
  codegenTemplates: boolean;
}

export const defineImports = ({
  codegenHooks,
  codegenMethods,
  codegenTemplates,
}: DefineImportsArgs): string => {
  let template = '';
  if (codegenHooks || codegenMethods || codegenTemplates) {
    template = `
    import { OperationDefinitionNode, DocumentNode } from 'graphql';
    import sgtsQL from 'graphql-tag';
    ${guessFragmentTypeTemplate}
    `;
    if (codegenHooks) {
      template += `
      import { useMutation, useQuery, QueryHookOptions, MutationHookOptions, MutationTuple } from '@apollo/react-hooks'
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
