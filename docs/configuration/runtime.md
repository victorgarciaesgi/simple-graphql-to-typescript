# Runtime

Simple-graphql-to-typescript can be used to generate your types at runtime

The module expose a function `sgtsGenerate` with the same options as the configuration file
(The function is 100% typed)

It returns a `Promise<string>` containing the generated file

Exemple:

```javascript
const { sgtsGenerate } = require('simple-graphql-to-typescript');

sgtsGenerate({
  endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
  output: './types.ts',
  prefix: 'I',
  suffix: 'Model',
}).then(data => console.log(data));
```

::: tip
The `output` option is not required with the runtime option. If you do not specify it, it will just returns the formated file in a string format!
:::
