# codegen-hooks

### Type: `boolean`

In the same way as `codegen-methods`, but generate React apollo hooks instead

## Exemple

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql --codegen-hooks
```

**Generated result exemple**

```ts
{
  usePosts(
    fragment: string | DocumentNode,
    options?: QueryHookOptions<{ posts: Post[] }, postsArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = sgtsQL`
      query posts ($userId: Int) {
        posts(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useQuery<{ posts: Post[] }, postsArgs>(query, options);
  },
}
```

## Usage

::: warning

You must have installed `@apollo/react-hooks` for this to work.
And obviously having a HOC Apollo provider!

:::

```typescript
import { usePosts } from '~/generated.ts';

const Hello = () => {
  const { loading, error, data } = usePosts(`id title`);
  if (loading) return <p>Loading ...</p>;
  return <h1>Hello {data.posts.title}!</h1>;
};
```

::: tip

**Also, Sgts will generate all `pageInfo` fragment for pagination**

See `codegen-methods` for exemple

:::
