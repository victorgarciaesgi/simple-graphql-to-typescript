# Available options

| Option                      | Short syntax | Type                                         | Usage                                   |
| --------------------------- | ------------ | -------------------------------------------- | --------------------------------------- |
| --endpoint `<endpoint>`     | -e           | string(url)                                  | [See doc](/options/endpoint)            |
| --json `<path to json>`     | -j           | string(path)                                 | [See doc](/options/json)                |
| --output `<path>`           | -o           | string(path) <br> _default_ `./generated.ts` | [See doc](/options/output)              |
| --codegen-methods           |              | boolean                                      | [See doc](/options/codegen-methods)     |
| --codegen-react-hooks       |              | boolean                                      | [See doc](/options/codegen-react-hooks) |
| --codegen-vue-hooks         |              | boolean                                      | [See doc](/options/codegen-vue-hooks)   |
| --codegen-templates         |              | boolean                                      | [See doc](/options/withGqlQueries)      |
| --customScalars `<scalars>` |              | {"myScalar": "MyType"}                       | [See doc](/options/customScalars)       |
| --prefix `<prefix>`         | -p           | string <br> _default_ `null`                 | [See doc](/options/prefix)              |
| --suffix `<suffix>`         | -s           | string <br> _default_ `null`                 | [See doc](/options/suffix)              |
| --header `<header>`         |              | string <br> _default_ `null`                 | [See doc](/options/header)              |
| --compileToJs               |              | boolean                                      | [See doc](/options/jsMode)              |
| --download                  | -D           | string <br> _default_ `null`                 | [See doc](/options/download)            |
| generate                    |              | string <br> _default_ `development`          | [See doc](/configuration/config)        |
| init                        |              |                                              | [See doc](/configuration/init)          |
