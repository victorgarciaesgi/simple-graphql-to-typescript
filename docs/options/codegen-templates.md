# codegen-templates

### Type: `boolean`

This option will only generate the GraphQL template strings, without any buiseness logic

It's generated to simplify the implementation of your fragments

## Exemple

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql --codegen-template
```

**Generated result exemple**

```ts
{
  users(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    return sgtsQL`
      query users  {
        users {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
  }
}
```

## Usage

```typescript
import { GqlQueries } from '~/generated.ts';

const query = GqlQueries.users('id firstName');
```

::: tip

**Also, Sgts will generate all `pageInfo` fragment for pagination**

See `codegen-methods` for exemple

:::
