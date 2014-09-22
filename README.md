# cldr-data-npm

Npm module for [Unicode CLDR JSON][] data

[Unicode CLDR JSON]: http://cldr.unicode.org/index/cldr-spec/json

## Usage

On the `package.json` of your i18n library, define which CLDR versions it's
compatible with.

    "dependencies": {
      "cldr-data": ">26"
    }

On your library, access CLDR JSON data using `require("cldr-data")`.

```javascript
cldr = require("cldr-data");

function Pluralize(locale) {
  var plurals = cldr("supplemental/plurals");
  var language = extractLanguageFrom(locale);

  // Your awesome pluralization logic
  pluralForm = doAwesomeStuffWith(
    plurals.supplemental["plurals-type-cardinal"][language]
  );

  return pluralForm;
}
```

For your convinience, use cldr-data in conjunction of [cldr.js][].

[cldr.js]: https://github.com/rxaviers/cldrjs

```javascript
Cldr = require("cldrjs")
cldr = require("cldr-data");

Cldr.load(cldr("supplemental/plurals"));

function Pluralize(locale) {
  locale = new Cldr(locale);

  // Your awesome pluralization logic
  pluralForm = doAwesomeStuffWith(
    locale.supplemental("plurals-type-cardinal/{language}")
  );

  return pluralForm;
}
```

## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
