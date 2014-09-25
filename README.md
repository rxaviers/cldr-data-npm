# Npm's cldr-data - Foo Number Format Library Example

In this example, an i18n library to format numbers is implemented.

On `package.json`, it defines its `cldr-data` dependency.

    "peerDependencies": {
      "cldr-data": ">=25"
    }

On `foo.js`, it implements a very basic and irrealistic NumberFormat. See
implementation. Note the library handles loading the data itself assisted by
`require("cldr-data")`

## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
