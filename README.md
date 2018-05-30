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

#### Set Custom json file with urls or filter existing

By default, used file `urls.json` form cldr-data module, which contain
for each locale coverage 18 urls. For set custom `.json` file, that have
structure accoding `urls.json` use `cldr-data-urls-json` property in `package.json` your webApp
*Define the package.json `cldr-data-urls-json` property*

```
{
  ...
  "cldr-data-urls-json": "../../cldrdatadwnl.json",
  ...
}
```
Path must be relative from cldr-data directory


*Example custom cldrdatadwnl.json*
File have only 7 urls.
```
{
    "core": [
        "https://github.com/unicode-cldr/cldr-core/archive/30.0.3.zip",
        "https://github.com/unicode-cldr/cldr-dates-modern/archive/30.0.3.zip",
        "https://github.com/unicode-cldr/cldr-localenames-modern/archive/30.0.3.zip",
        "https://github.com/unicode-cldr/cldr-misc-modern/archive/30.0.3.zip",
        "https://github.com/unicode-cldr/cldr-numbers-modern/archive/30.0.3.zip",
        "https://github.com/unicode-cldr/cldr-segments-modern/archive/30.0.3.zip",
        "https://github.com/unicode-cldr/cldr-units-modern/archive/30.0.3.zip"
    ]
}
```

Or you can filter existing urls by regexp pattern, via `cldr-data-urls-filter`
field in `package.json`:

```
{
  ...
  "cldr-data-urls-filter": "(cldr-core|cldr-numbers-modern|cldr-dates-modern)",
  ...
}
```


## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
