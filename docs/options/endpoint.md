# endpoint

### Short syntax: `-e`

### Type: `string`

Your GraphQL api endpoint where simple-graphql-to-typescript will retrieve introspection schema

Exemple:

```bash
sgts --endpoint https://json-placeholder-graphql.herokuapp.com/graphql
```

By default `sgts` will save a file named `generated.ts` at the root of your project

Output:

```typescript
...
export interface Post {
  user?: Maybe<User>;
  userId?: Maybe<number>;
  id?: Maybe<number>;
  title?: Maybe<string>;
  body?: Maybe<string>;
}

export interface User {
  id?: Maybe<number>;
  name?: Maybe<string>;
  username?: Maybe<string>;
  email?: Maybe<string>;
  phone?: Maybe<string>;
  website?: Maybe<string>;
}

export interface Comment {
  post?: Maybe<Post>;
  postId?: Maybe<number>;
  id?: Maybe<number>;
  name?: Maybe<string>;
  email?: Maybe<string>;
  body?: Maybe<string>;
}
...
```
