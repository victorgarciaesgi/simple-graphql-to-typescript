# codegen-methods

### Type: `boolean`

Sgts can generate all your methods fully typed and cancellabled;
It uses Apollo Client behing the hood and as a dependency

## Exemple

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql --codegen-methods
```

You just need to pass yout apolloClient instance to the root constructor of sgts

**Generated result exemple**

```typescript
{
  posts(): FragmentableQueryWithOptionalArgs<Post[], postsArgs> {
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const query = sgtsQL`
          query posts ($userId: Int) {
            posts(userId: $userId) {
              ${isString ? fragment : '...' + fragmentName}
            }
          } ${isFragment ? fragment : ''}
          `;

        return abortableQuery(query, true);
      }
    };
  },
}
```

## Usage

::: tip
`apiProvider` is generated by sgts on the same files as your models with the option `--codegen-methods`
:::

```ts
import { apiProvider } from '~/generated.ts';
import ApolloClient from 'apollo-client';

const apolloClient = new ApolloClient({
  ...
});

const sgts = apiProvider(apolloClient);


// You can either use a GraphQL fragment

const commentFragment = gql`
  fragment commentFragment on Comment {
    id
    name
    body
  }
`
// OR a simple string

const commentFragment = `
  id
  name
  body
`

const commentsQuery = sgts.comments().$fragment(commentFragment);

commentsQuery.$args({postId: 5}).$fetch().then(data => console.log(data))

// You can cancel your request any time

commentsQuery.$abort();
```

::: tip

**Also, Sgts will generate all `pageInfo` fragment for pagination**

Sgts handle the `PageInfo` fragment generation, so you just have to pass the `node` fragment to the function

_Exemple from generated project in production_

```typescript
{
  /** Get list of created training */
  getMyTrainings(): FragmentableQueryWithOptionalArgs<TrainingConnection, getMyTrainingsArgs> {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = gql`
            query getMyTrainings ($take: Int,$skip: Int) {
              getMyTrainings(take: $take,skip: $skip) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  node{
                    ${isString ? fragment : '...' + fragmentName}
                  }
                }
              }
            } ${isFragment ? fragment : ''}
          `;
          return abortableQuery(query, true);
        }
      };
    },
}
```

:::