# codegen-templates

### Type: `boolean`

This option will only generate the GraphQL template strings, without any buiseness logic

It's generated to simplify the implementation of your fragments

## Exemple

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql --codegen-template
```

**Supports Subscriptions since `0.6.4`**

**Generated result exemple**

```ts
export const usersGQLNode = (fragment: string | DocumentNode) => {
  const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
  return sgtsQL`
      query users  {
        users {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
  `;
};
```

## Usage

```typescript
import { usersGQLNode } from '~/generated.ts';

const query = usersGQLNode('id firstName');
console.log(query);
/* outputs
  query users  {
    users {
      id
      firstName
    }
  }
`

*/
```

::: tip

**Also, Sgts will generate all `pageInfo` fragment for pagination**

See `codegen-functions` for exemple

:::
