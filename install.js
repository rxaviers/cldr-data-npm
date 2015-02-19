/**
 * Npm module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-npm/blob/master/LICENSE-MIT
 */

"use strict";

var cldrDownloader = require("cldr-data-downloader");
var path = require("path");
var urls = require("./urls");
var parentPackage;
var url;

try {
  parentPackage = require("../../package.json");
}
catch(error) {}

url = urls[process.env.CLDR_COVERAGE || "core"];

if (parentPackage) {
  if (parentPackage["cldr-data-coverage"] && parentPackage.dependencies["cldr-data"]) {
    if (!/^full|core$/.test(parentPackage["cldr-data-coverage"])) {
      throw new TypeError("Your `cldr-data-coverage` setting must have the value \"core\" or \"full\".");
    }
    url = urls[parentPackage["cldr-data-coverage"]];
  }
}

if (process.env.CLDR_URL) {
  url = url.replace(
    "http://www.unicode.org/Public/cldr",
    process.env.CLDR_URL.replace(/\/$/, "")
  );
}

cldrDownloader(
  url,
  path.join(__dirname, "json"),
  function(error) {
    if (error) {
      if (/E_ALREADY_INSTALLED/.test(error.code)) {
        error.message = error.message.replace(/Use `options.*/, "Use -f to " +
          "override.");
        return console.log(error.message);
      } else {
        console.error("Whops", error.message);
        process.exit(1);
      }
    }
  }
);
