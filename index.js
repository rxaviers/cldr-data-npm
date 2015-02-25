/**
 * Npm module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-npm/blob/master/LICENSE-MIT
 */

"use strict";

var assert = require("assert");
var _path = require("path");

function cldrData(path) {
  assert(typeof path === "string", "must include path (e.g., " +
    "\"main/en/numbers\" or \"supplemental/likelySubtags\")");

  return require("./" + path);
}

Object.defineProperty(cldrData, "availableLocales", {
  get: function() {
    return cldrData("availableLocales").availableLocales;
  }
});

cldrData.forEachMain = function(callback) {
  assert(typeof callback === "function", "must include callback function");

  cldrData.availableLocales.forEach(function(locale) {
    callback(function(path) {
      return cldrData(_path.join("main", locale, path));
    });
  });
};

cldrData.main = function(path) {
  assert(typeof path === "string", "must include path (e.g., " +
    "\"numbers\" or \"ca-gregorian\")");

  return cldrData.availableLocales.map(function(locale) {
    return cldrData(_path.join("main", locale, path));
  });
}

module.exports = cldrData;
