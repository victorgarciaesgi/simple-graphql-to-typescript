# Simple-graphql-to-typescript generator

<p align="center">
<img width="100" src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="Vue logo">
<img width="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png" alt="Vue logo">
</p>
<p align='center'>
<img src='https://img.shields.io/npm/v/simple-graphql-to-typescript.svg'>
<img src='https://img.shields.io/npm/dm/simple-graphql-to-typescript.svg'>
<img src='https://img.shields.io/npm/l/simple-graphql-to-typescript.svg'>
</p>

## **Motive**

I work a lot with GraphQL apis and typescript, and since now I was always writing by hand all my interfaces/enums and input types.
I search many solutions for generating them for me (Apollo codegen, graphql-to-typescript ..etc ) but it was never the result I expected. I just wanted a single file with all my types in it, without complexity.

## **Installation**

For global use

```bash
npm i -g simple-graphql-to-typescript
#or
yarn global add simple-graphql-to-typescript
```

For local use

```bash
npm i simple-graphql-to-typescript --save-dev
#or
yarn add -D simple-graphql-to-typescript
```

Command to call

```bash
sgts
```

## **Documentation**

| Option                      | Short syntax | Type                                         | Description                                                                   |
| --------------------------- | ------------ | -------------------------------------------- | ----------------------------------------------------------------------------- |
| --endpoint `<endpoint>`     | -e           | string(url)                                  | Your GraphQL api endpoint                                                     |
| --json `<path to json>`     | -j           | string(path)                                 | Path to your json schema file                                                 |
| --output `<path>`           | -o           | string(path) <br> _default_ `./generated.ts` | Path where the file must be generated                                         |
| --generateMethods           | -G           | boolean                                      | Generate all your graphQL methods fully typed (Inspired by Prisma)            |
| --apolloHooks               | -A           | boolean                                      | Generate useMutation and useQuery hooks typed                                 |
| --withGqlQueries            | -            | boolean                                      | Add gql query strings to the generated output                                 |
| --customScalars `<scalars>` | -            | {"myScalar": "MyType"}                       | Provide your custum scalars in format {"myScalar": "MyType", ...} (JSON)      |
| --prefix `<prefix>`         | -p           | string <br> _default_ `null`                 | Add prefix to all your types (ex: User becomes IUser with --prefix I)         |
| --suffix `<suffix>`         | -s           | string <br> _default_ `null`                 | Add suffix to all your types (ex: User becomes UserModel with --suffix Model) |
| --header `<header>`         | -head        | string                                       | Additional header option to fetch your schema from endpoint schema file       |
| --jsMode                    | -J           | boolean                                      | Generate the methods in Js with declaration files instead of Ts               |

## Roadmap

I don't have much free time to develop feature I don't use, but feel free to send a PR!

- [x] Export only Gql string
- [x] Removed Query and mutation name in Apollo Hooks data
- [x] Config file `.sgtsrc.js`
- [ ] Support Subscriptions
- [ ] Support UseLazyQuery Apollo Hook
- [ ] Highlight new generated, modified or deleted types in terminal

## Simple usage exemple

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql -o generated.ts
```

_Generated result_

```typescript
...
export interface Post {
  user?: User;
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Comment {
  post?: Post;
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}
...
```

# Configuration file

You can also use a `.sgtsrc.js` file

```
sgts generate
```

`.sgtsrc.js`

```javascript
module.exports = {
  endpoint: "https://json-placeholder-graphql.herokuapp.com/graphql",
  output: "./generated.ts"
};
```

Available options

```typescript
{
  endpoint?: string;
  json?: string;
  output?: string;
  headers?: string;
  prefix?: string;
  suffix?: string;
  jsMode?: boolean;
  customScalars?: { [x: string]: string };
  generateMethods?: boolean;
  apolloHooks?: boolean;
  withGqlQueries?: boolean;
}
```

# Generating methods using ApolloClient

Sgts can generate all your methods fully typed and cancellabled;
You just need to pass yout apolloClient instance to the root constructor of sgts

`apiProvider` is generated by sgts on the same files as your models with the option `--generateMethods`

try it with

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql -G
```

```typescript
const apolloClient = new ApolloClient({
  ...
});

const sgts = apiProvider(apolloClient);

const commentsQuery = sgts.comments().$fragment(commentFragment);

commentsQuery.$args({postId: 5}).$fetch().then(data => console.log(data))

// You can cancel your request any time

commentsQuery.$abort();

```

# Generating hooks using Apollo React hooks

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql -G -A
```

```typescript
const Hello = () => {
  const { loading, error, data } = usePosts(`id title`);
  if (loading) return <p>Loading ...</p>;
  return <h1>Hello {data.title}!</h1>;
};
```

## Advanced Usage exemple

```bash
sgts --endpoint https://json-placeholder-graphql.herokuapp.com/graphql --output generated.ts --prefix I --suffix Model
```

_Generated result_

```typescript
...
export interface IPostModel {
  user?: IUserModel;
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

export interface IUserModel {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface ICommentModel {
  post?: IPostModel;
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}

...
```

## Runtime usage

```javascript
const { sgtsGenerate } = require("simple-graphql-to-typescript");

await sgtsGenerate({
  endpoint: "https://json-placeholder-graphql.herokuapp.com/graphql",
  output: "./types.ts",
  prefix: "I",
  suffix: "Model"
});
```

## Help

```bash
sgts -h
```

# License

MIT

Victor Garcia
