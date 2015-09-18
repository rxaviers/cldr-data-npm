/**
 * Npm module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-npm/blob/master/LICENSE-MIT
 */

"use strict";

var MAIN_FILES = ["ca-buddhist", "ca-chinese", "ca-coptic", "ca-dangi",
  "ca-ethiopic-amete-alem", "ca-ethiopic", "ca-generic", "ca-gregorian",
  "ca-hebrew", "ca-indian", "ca-islamic-civil", "ca-islamic", "ca-islamic-rgsa",
  "ca-islamic-tbla", "ca-islamic-umalqura", "ca-japanese", "ca-persian", "ca-roc",
  "characters", "currencies", "dateFields", "delimiters", "languages", "layout",
  "listPatterns", "localeDisplayNames", "measurementSystemNames", "numbers",
  "posix", "scripts", "territories", "timeZoneNames", "units", "variants"
];

var assert = require("assert");
var _fs = require("fs");
var _path = require("path");

function argsToArray(arg) {
  return [].slice.call(arg, 0);
}

function flatten(obj) {
  var arr = [];
  function _flatten(obj, arr) {
    if(Array.isArray(obj)) {
      return obj.forEach(function(obj) {
        _flatten(obj, arr);
      });
    }
    arr.push(obj);
  }
  _flatten(obj, arr);
  return arr;
}

function cldrData(path/*, ...*/) {
  assert(typeof path === "string", "must include path (e.g., " +
    "\"main/en/numbers\" or \"supplemental/likelySubtags\")");

  if (arguments.length > 1) {
    return argsToArray(arguments).reduce(function(sum, path) {
      sum.push(cldrData(path));
      return sum;
    }, []);
  }
  return require("./" + path);
}

function mainPathsFor(locales) {
  return locales.reduce(function(sum, locale) {
    MAIN_FILES.forEach(function(mainFile) {
      sum.push(_path.join("main", locale, mainFile));
    });
    return sum;
  }, []);
}

function supplementalPaths() {
  var jsonExtension = /^(.*)\.json$/;
  var supplementalFiles = _fs.readdirSync("supplemental").filter(function(file) {
    return jsonExtension.test(file);
  }).map(function(file) {
    return file.match(jsonExtension)[1];
  });

  return supplementalFiles.map(function(supplementalFile) {
    return _path.join("supplemental", supplementalFile);
  });
}

Object.defineProperty(cldrData, "availableLocales", {
  get: function() {
    return cldrData("availableLocales").availableLocales;
  }
});

cldrData.all = function() {
  var paths = supplementalPaths().concat(mainPathsFor(this.availableLocales));
  return cldrData.apply({}, paths);
}

cldrData.entireMainFor = function(locale/*, ...*/) {
  assert(typeof locale === "string", "must include locale (e.g., " +
    "\"en\")");
  return cldrData.apply({}, mainPathsFor(argsToArray(arguments)));
}

cldrData.entireSupplemental = function() {
  return cldrData.apply({}, supplementalPaths());
}

module.exports = cldrData;
