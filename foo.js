/**
 * Npm module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-npm/blob/master/LICENSE-MIT
 */

"use strict";

var cldrData = require("cldr-data");
var Cldr = require("cldrjs");

// On-demand load.
function onDemandLoad(languageId) {
  Cldr.load(cldrData("main/" + languageId + "/numbers"));
}

// Pre-load all locale numbers.
// Commented out, mutual exclusive with the onDemandLoad approach above.
//
// Load main/<all locales>/numbers.json.
// cldrData.forEachLocale(function(locale, cldrData) {
//   Cldr.load(cldrData("numbers"));
//});

// Load supplemental/likelySubtags.json.
Cldr.load(cldrData("supplemental/likelySubtags"));

function Foo(locale) {
  var defaultNumberingSystem;

  this.cldr = new Cldr(locale);
  onDemandLoad(this.cldr.attributes.languageId);

  defaultNumberingSystem = this.cldr.main("numbers/defaultNumberingSystem");
  this.decimalSep = this.cldr.main([
    "numbers/symbols-numberSystem-" + defaultNumberingSystem,
    "decimal"
  ]);
}

Foo.prototype.numberFormat = function(number) {

  // Convert it into a String.
  number = "" + number;

  // Localize its decimal separator.
  number = number.replace(/\./, this.decimalSep);

  return number;
};

module.exports = Foo;
