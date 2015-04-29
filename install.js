/**
 * Npm module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-npm/blob/master/LICENSE-MIT
 */

"use strict";

var coverage, parentPackage, srcUrl;

var cldrDownloader = require("cldr-data-downloader");
var path = require("path");

var options = {};

if (process.env.CLDR_URL) {
  srcUrl = srcUrl.replace(
    "http://www.unicode.org/Public/cldr",
    process.env.CLDR_URL.replace(/\/$/, "")
  );

} else {

  srcUrl = path.join(__dirname, "./urls.json");

  try {
    parentPackage = require("../../package.json");
    if (parentPackage.peerDependencies && parentPackage.peerDependencies["cldr-data"] &&
          !(parentPackage.dependencies && parentPackage.dependencies["cldr-data"])) {
      console.error(
        "Warning: Skipping downloading CLDR data, because `cldr-data` is a " +
        "peer dependency, not a real one."
      );
      process.exit(0);
    }
    if (parentPackage["cldr-data-coverage"] && parentPackage.dependencies["cldr-data"]) {
      coverage = parentPackage["cldr-data-coverage"];
    }
  }
  catch(error) {}

  if (process.env.CLDR_COVERAGE) {
    coverage = process.env.CLDR_COVERAGE;
  }

  if (coverage) {
    options.srcUrlKey = coverage;
  }
}

cldrDownloader(
  srcUrl,
  __dirname,
  options,
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
