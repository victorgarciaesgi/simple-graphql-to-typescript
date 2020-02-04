# Simple-graphql-to-typescript generator

<p align="center">
  <img width='100' src="./media/sgts.svg" alt="sgts logo">
</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![npm downloads][npm-total-downloads-src]][npm-downloads-href]
<img src='https://img.shields.io/github/workflow/status/victorgarciaesgi/simple-graphql-to-typescript/Node.js%20CI'>
<img src='https://img.shields.io/npm/l/simple-graphql-to-typescript.svg'>

[npm-version-src]: https://img.shields.io/npm/v/simple-graphql-to-typescript.svg
[npm-version-href]: https://www.npmjs.com/package/simple-graphql-to-typescript
[npm-downloads-src]: https://img.shields.io/npm/dm/simple-graphql-to-typescript.svg
[npm-total-downloads-src]: https://img.shields.io/npm/dt/simple-graphql-to-typescript.svg
[npm-downloads-href]: https://www.npmjs.com/package/simple-graphql-to-typescript

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

| Option                      | Short syntax | Type                                         | Description                                                                                            |
| --------------------------- | ------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| --endpoint `<endpoint>`     | -e           | string(url)                                  | Your GraphQL api endpoint                                                                              |
| --json `<path to json>`     | -j           | string(path)                                 | Path to your json schema file                                                                          |
| --output `<path>`           | -o           | string(path) <br> _default_ `./generated.ts` | Path where the file must be generated                                                                  |
| --codegen-methods           |              | boolean                                      | Generate all your graphQL methods fully typed (Inspired by Prisma generate)                            |
| --codegen-hooks             |              | boolean                                      | Generate useMutation and useQuery hooks typed                                                          |
| --codegen-templates         |              | boolean                                      | Add gql query strings to the generated output                                                          |
| --customScalars `<scalars>` | -            | {"myScalar": "MyType"}                       | Provide your custum scalars that will be merged to existing scalars                                    |
| --prefix `<prefix>`         | -p           | string <br> _default_ `null`                 | Add prefix to all your types (ex: User becomes IUser with --prefix I)                                  |
| --suffix `<suffix>`         | -s           | string <br> _default_ `null`                 | Add suffix to all your types (ex: User becomes UserModel with --suffix Model)                          |
| --header `<header>`         |              | string                                       | Additional header option to fetch your schema from endpoint schema file                                |
| --compileToJs               |              | boolean                                      | Generate the methods in Js with declaration files instead of Ts                                        |
| --download                  | -D           | string <br> _default_ `null`                 | Specify the path to download the GraphQL intropection schema                                           |
| --generate                  | -            | string <br> _default_ `development`          | Specify the path to download the GraphQL intropection schema and specify the environnement file to use |

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

```bash
sgts generate <yourEnv> # default = development
```

## Exemple

`.env.testing`

```env
API_URL=http://localhost:4000/graphql
```

`.sgtsrc.js`

```javascript
module.exports = {
  endpoint: process.env.API_URL,
  output: './generated.ts',
};
```

```bash
sgts generate testing
```

Sgts also load your `.env` before loading other environnement files

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
  download?: string;
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

**try it with**

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql -G
```

**Generated result exemple**

```typescript
{
  posts(): FragmentableQueryWithOptionalArgs<Post[], postsArgs> {
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const query = gql`
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

```typescript
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

# Generating hooks using Apollo React hooks

```bash
sgts -e https://json-placeholder-graphql.herokuapp.com/graphql -G -A
```

```typescript
const Hello = () => {
  const { loading, error, data } = usePosts(`id title`);
  if (loading) return <p>Loading ...</p>;
  return <h1>Hello {data.posts.title}!</h1>;
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
const { sgtsGenerate } = require('simple-graphql-to-typescript');

await sgtsGenerate({
  endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
  output: './types.ts',
  prefix: 'I',
  suffix: 'Model',
});
```

## Help

```bash
sgts -h
```

# License

MIT

Victor Garcia
