# download

### Type: `string` (PathLike)

When you provide a path to the download option, sgts will save a json file containing all the introspection schema

It can be useful to analyse the schema yourself or to provide source for eslint or apollo plugins

Exemple:

```bash
sgts -e http://localhost:4000 --download ./schema.json
```
