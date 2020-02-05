# Simple-graphql-to-typescript generator

<p align="center">
  <a href='https://sgts.netlify.com/'>
    <img width='100' src="./media/logo.png" alt="sgts logo">
  </a>
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

## Documentation

[Link to documentation](https://sgts.netlify.com/)

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

## Help

```bash
sgts -h
```

## **Documentation**

| Option                      | Short syntax | Type                                         | Usage                                                            |
| --------------------------- | ------------ | -------------------------------------------- | ---------------------------------------------------------------- |
| --endpoint `<endpoint>`     | -e           | string(url)                                  | [See doc](https://sgts.netlify.com/options/endpoint.html)        |
| --json `<path to json>`     | -j           | string(path)                                 | [See doc](https://sgts.netlify.com/options/json.html)            |
| --output `<path>`           | -o           | string(path) <br> _default_ `./generated.ts` | [See doc](https://sgts.netlify.com/options/output.html)          |
| --codegen-methods           |              | boolean                                      | [See doc](https://sgts.netlify.com/options/generateMethods.html) |
| --codegen-hooks             |              | boolean                                      | [See doc](https://sgts.netlify.com/options/apolloHooks.html)     |
| --codegen-templates         |              | boolean                                      | [See doc](https://sgts.netlify.com/options/withGqlQueries.html)  |
| --customScalars `<scalars>` |              | {"myScalar": "MyType"}                       | [See doc](https://sgts.netlify.com/options/customScalars.html)   |
| --prefix `<prefix>`         | -p           | string <br> _default_ `null`                 | [See doc](https://sgts.netlify.com/options/prefix.html)          |
| --suffix `<suffix>`         | -s           | string <br> _default_ `null`                 | [See doc](https://sgts.netlify.com/options/suffix.html)          |
| --header `<header>`         |              | string <br> _default_ `null`                 | [See doc](https://sgts.netlify.com/options/header.html)          |
| --compileToJs               |              | boolean                                      | [See doc](https://sgts.netlify.com/options/jsMode.html)          |
| --download                  | -D           | string <br> _default_ `null`                 | [See doc](https://sgts.netlify.com/options/download.html)        |
| --generate                  |              | string <br> _default_ `development`          | [See doc](https://sgts.netlify.com/configuration/config.html)    |

## Roadmap

I don't have much free time to develop feature I don't use, but feel free to send a PR!

- [x] Export only Gql string
- [x] Removed Query and mutation name in Apollo Hooks data
- [x] Config file `.sgtsrc.js`
- [ ] Support Subscriptions for codegen-hooks and codegen-methods
- [ ] Support UseLazyQuery Apollo Hook
- [ ] Highlight new generated, modified or deleted types in terminal

## Usage

Refer to the full [documentation](https://sgts.netlify.com) !

# License

MIT

Victor Garcia
