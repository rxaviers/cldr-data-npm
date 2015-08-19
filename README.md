# Npm's cldr-data

Npm module for [Unicode CLDR JSON][] data.

[Unicode CLDR JSON]: http://cldr.unicode.org/index/cldr-spec/json

## Goal

- Allow i18n libraries to define CLDR data as versioned "peer" dependency.
- Provide tools to assist (in other words, ease the pain) on fetching the data.

Bonus goals

- Optimal for backend development. (Frontend, see [Bower's cldr-data][]).
- Optimal for Node.js environment. (AMD, see [Bower's cldr-data][]).

[Bower's cldr-data]: https://github.com/rxaviers/cldr-data-bower

## Usage

### For libraries

On the `package.json` of your i18n library, define its CLDR data dependency by
using the *peerDependencies* property.

    "peerDependencies": {
      "cldr-data": ">=26"
    }

On your library, access CLDR JSON data using `require("cldr-data")`.

```javascript
function Pluralize(locale) {
  var plurals = require("cldr-data/supplemental/plurals");
  var language = extractLanguageFrom(locale);

  // Your awesome pluralization logic
  pluralForm = doAwesomeStuffWith(
    plurals.supplemental["plurals-type-cardinal"][language]
  );

  return pluralForm;
}
```

For your convinience, use cldr-data in conjunction with [cldr.js][]. You can
find more details switching to the [Foo Number Format Library Example][] or
[Application Example][] branches.

[Foo Number Format Library Example]: https://github.com/rxaviers/cldr-data-npm/tree/example-library-foo
[Application Example]: https://github.com/rxaviers/cldr-data-npm/tree/example-application
[cldr.js]: https://github.com/rxaviers/cldrjs

### For applications

On the `package.json` of your applications, define its CLDR data dependency by
using the *dependencies* or *devDependencies* property.

    "dependencies": {
      "cldr-data": "26",
      "libraries-that-use-cldr-data": "x"
    }

#### Locale coverage

By default, the locale coverage installed is **core**, which Unicode defines as
the top tier languages and is equivalent to the `json.zip` content. There are
two ways to modify the installation and get the **full** coverage instead.

*Use the environment variable `CLDR_COVERAGE`*

On the command line, set the locale coverage using the environment variable.

```
$ CLDR_COVERAGE=full npm install
```

*Use the package.json `cldr-data-coverage` property*

On the `package.json` of you application, set the locale coverage using the
`cldr-data-coverage` property.

```
{
  ...
  "cldr-data-coverage": "full",
  ...
}
```

## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
