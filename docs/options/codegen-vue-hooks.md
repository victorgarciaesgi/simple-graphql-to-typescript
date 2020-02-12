# codegen-vue-hooks

### Type: `boolean`

In the same way as `codegen-methods`, but generate `@vue/apollo-composable` hooks instead

**Supports Subscriptions since `0.6.4`**

## Exemple

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql --codegen-react-hooks
```

**Generated result exemple**

```ts
export const usePosts = (
  fragment: string | DocumentNode,
  variables?: IpostsModelArgs | Ref<IpostsModelArgs> | ReactiveFunction<IpostsModelArgs>,
  options?:
    | UseQueryOptions<{ posts: IPostModel[]; IpostsModelArgs }>
    | Ref<UseQueryOptions<{ posts: IPostModel[]; IpostsModelArgs }>>
    | ReactiveFunction<UseQueryOptions<{ posts: IPostModel[]; IpostsModelArgs }>>
) => {
  const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
  const query = sgtsQL`
      query posts ($userId: Int) {
        posts(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useQuery<{ posts: IPostModel[]; IpostsModelArgs }>(query, variables, options);
};
```

## Usage

::: warning

If you are using Vue 2.x, you must have installed `@vue/composition-api` and `@vue/apollo-composable` for this to work.
And obviously having to register Apollo provider to your Vue App!

[Vue apollo composable docs](https://v4.apollo.vuejs.org/guide-composable/query.html#options)
:::

**Exemple for a Query**

```vue
<template>
  <div>
    <p v-if="loading">Loading...</p>
    <h1 v-else>Hello {result.post.title}!</h1>;
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { usePost } from '~/generated.ts';

export default createComponent({
  setup(props, ctx) {
    const { result, loading, fetchMore, ...rest } = usePost(`id title`, { id: 5 });
    return {
      result,
      loading,
    };
  },
});
</script>
```

**Exemple for a Mutation**

```vue
<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api';
import { useLogin } from '~/generated.ts';

export default createComponent({
  setup(props, ctx) {
    const { email, password } = reactive({
      email: '',
      password: '',
    });
    const { result, loading } = useLogin(
      `
      user {
        id
        name
      }
      token
    `,
      { data: { email, password } }
    );
    return {
      result,
      loading,
    };
  },
});
</script>
```

::: tip

**Also, Sgts will generate all `pageInfo` fragment for pagination**

See `codegen-methods` for exemple

:::
