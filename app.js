/**
 * Npm module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-npm/blob/master/LICENSE-MIT
 */

"use strict";

var Foo = require("cldr-data-example-library-foo");

var ar = new Foo("ar");
var en = new Foo("en");
var pt = new Foo("pt");

console.log("Follow `3.1415` formatted by our Foo library.");
console.log("In Arabic:", ar.numberFormat(3.1415));
console.log("In English:", en.numberFormat(3.1415));
console.log("In Portuguese:", pt.numberFormat(3.1415));
