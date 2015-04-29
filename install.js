/**
 * Npm module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-npm/blob/master/LICENSE-MIT
 */

"use strict";

var coverage, parentPackage, peerPackages, srcUrl;

var cldrDownloader = require("cldr-data-downloader");
var glob = require("glob").sync;
var path = require("path");

var options = {};

try {
  console.log("parentPackage", path.resolve("../../package.json"));
  parentPackage = require("../../package.json");
} catch(error) {}

try {
  console.log("peerPackages", glob("../*/package.json").map(function(file) {
    return path.resolve(file);
  }));
  peerPackages = glob("../*/package.json").map(function(file) {
    try {
      return require(path.resolve(file));
    } catch(error) {
      return {};
    }
  });
} catch(error) {
  console.error(
    "Warning: Something weird happened checking whether this is a " +
    "peer dependency.", error.message
  );
  peerPackages = [];
}

if (!(parentPackage.dependencies && parentPackage.dependencies["cldr-data"]) &&
      peerPackages.some(function(peerPackage) {
        return peerPackage.peerDependencies &&
          peerPackage.peerDependencies["cldr-data"];
      })) {
  console.error(
    "Warning: Skipping downloading CLDR data, because `cldr-data` is a " +
    "peer dependency, not a real one."
  );
  process.exit(0);
}

if (process.env.CLDR_URL) {
  srcUrl = srcUrl.replace(
    "http://www.unicode.org/Public/cldr",
    process.env.CLDR_URL.replace(/\/$/, "")
  );

} else {

  srcUrl = path.join(__dirname, "./urls.json");

  if (parentPackage["cldr-data-coverage"] && parentPackage.dependencies["cldr-data"]) {
    coverage = parentPackage["cldr-data-coverage"];
  }

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
