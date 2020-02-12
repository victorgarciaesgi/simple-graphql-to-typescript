# codegen-react-hooks

### Type: `boolean`

In the same way as `codegen-methods`, but generate React apollo hooks instead

**Supports Subscriptions since `0.6.4`**

## Exemple

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql --codegen-react-hooks
```

**Generated result exemple**

```ts
export const usePosts = (
  fragment: string | DocumentNode,
  options?: QueryHookOptions<{ posts: Post[] }, postsArgs>
) => {
  const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
  const query = sgtsQL`
      query posts ($userId: Int) {
        posts(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useQuery<{ posts: Post[] }, postsArgs>(query, options);
};
```

## Usage

::: warning

You must have installed `@apollo/react-hooks` for this to work.
And obviously having a HOC Apollo provider!

:::

**Exemple for a Query**

```typescript
import { usePost } from '~/generated.ts';

const Hello = () => {
  const { loading, error, data } = usePost(`id title`, { id: 5 });
  if (loading) return <p>Loading ...</p>;
  return <h1>Hello {data.posts.title}!</h1>;
};
```

**Exemple for a Mutation**

```typescript
import { useLogin } from '~/generated.ts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading }] = useLogin(`
    user {
      id
      name
    }
    token
  `);
  const { data } = await login({
    variables: { data: { email, password } },
  });
};
```

::: tip

**Also, Sgts will generate all `pageInfo` fragment for pagination**

See `codegen-methods` for exemple

:::
