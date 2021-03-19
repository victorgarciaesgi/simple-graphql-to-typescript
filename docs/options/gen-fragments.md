# gen-fragments

### Type: `boolean`

::: warning
**This option is still in alpha can still be buggy, use with care**
:::

Enable fragment generation and queries/mutations auto-fragments so you don't have to pass any.

For classic GraphQL types, this will generate the fragment up to 2 levels deep to avoid circulars types.
For Connection fragments, it will go to 4 levels deep.
