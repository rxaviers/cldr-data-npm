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

On the `package.json` of your i18n library, define its CLDR data dependency.
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

For your convinience, use cldr-data in conjunction of [cldr.js][]. You can find
more details switching to the [Foo Number Format Library Example][] or
[Application Example][] branches.

[Foo Number Format Library Example]: https://github.com/rxaviers/cldr-data-npm/tree/example-library-foo
[Application Example]: https://github.com/rxaviers/cldr-data-npm/tree/example-application
[cldr.js]: https://github.com/rxaviers/cldrjs

## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
