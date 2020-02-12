# Configuration file

## .sgtsrc.js

Simple-graphql-to-typescript can also be used with a configuration file `.sgtsrc.js` at the root of your app instead of CLI options

::: tip
Running `sgts generate` will generate a `.sgtsrc.js` file for you with all the options
:::

::: tip
For the detail of each options, refer to the [options](/options) page!
:::

```typescript
// .sgtsrc.js
{
  endpoint?: string;
  json?: string;
  output?: string;
  codegenMethods?: boolean;
  codegenReactHooks?: boolean;
  codegenVueHooks?: boolean;
  codegenTemplates?: boolean;
  customScalars?: { [x: string]: string };
  header?: string;
  prefix?: string;
  suffix?: string;
  compileToJs?: boolean;
  download?: string;
}
```

Then in you can use the command `generate`

```bash
sgts generate <env?>
```

::: tip
The `generate` command will by default always load your `.env` and your `.env.development` file so you can use your environnement variables in your configuration file
:::

## Environnement/Stage

The optional param of `generate` is a string refering to the environnement file you want to use

Exemple:

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
