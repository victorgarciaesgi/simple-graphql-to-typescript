# generate

### Type: null | `string`

This command will start generation based on your `.sgtsrc.js` file.

```bash
sgts generate
```

```bash
sgts generate <env?>
```

## Exemples

```bash
sgts generate testing
```

::: tip
The `generate` command will by default always load your `.env` and your `.env.development` file so you can use your environnement variables in your configuration file
:::

See [Configuration file doc](https://sgts.netlify.com/configuration/config.html)
