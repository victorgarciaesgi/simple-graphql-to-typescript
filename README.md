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

| Option                      | Short syntax | Type                                         | Description                                                                               |
| --------------------------- | ------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| --endpoint `<endpoint>`     | -e           | string(url)                                  | Your GraphQL api endpoint                                                                 |
| --json `<path to json>`     | -j           | string(path)                                 | Path to your json schema file                                                             |
| --output `<path>`           | -o           | string(path) <br> *default* `./generated.ts` | Path where the file must be generated                                                     |
| --suffix `<suffix>`         | -            | string <br> *default* `null`                 | Add suffix to all your types (ex: User becomes IUser with --suffix I)                     |
| --header `<header>`         | -h           | string                                       | (Not working yet) Additional header option to fetch your schema from endpoint schema file |
| --customScalars `<scalars>` | -            | Array<{"myScalar": "MyType"} ...>            | (Not working yet) Provide your custum scalars in format [{"myScalar": "MyType"} ...]      |
## Usage exemple

```bash
sgts --endpoint https://json-placeholder-graphql.herokuapp.com/graphql --output ./types.ts --suffix I
```

*Generated result*

```typescript
...
export interface IPost {
  user?: IUser;
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface IComment {
  post?: IPost;
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}
...
```

## Help

```bash
sgts -h
```


# License

MIT