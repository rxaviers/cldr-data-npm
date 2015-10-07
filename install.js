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
  parentPackage = require("../../package.json");
} catch(error) {}

try {
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

if (parentPackage &&
      !(parentPackage.dependencies && parentPackage.dependencies["cldr-data"]) &&
      !(parentPackage.devDependencies && parentPackage.devDependencies["cldr-data"]) &&
      peerPackages.some(function(peerPackage) {
        return peerPackage.peerDependencies &&
          peerPackage.peerDependencies["cldr-data"];
      })) {
  console.error(
    "Warning: Skipping to download CLDR data, because `cldr-data` is a " +
    "peer dependency. If you want it to be downloaded, make sure it's " +
    "listed under `dependencies` or `devDependencies` of the `package.json`" +
    "of your application."
  );
  return process.exit(0);
}

if (process.env.CLDR_URL) {
  // Load custom urls.json file from env variable.
  srcUrl = process.env.CLDR_URL;
} else if (parentPackage && parentPackage["cldr-url"]) {
  // Load custom urls.json file from package.json.
  srcUrl = parentPackage["cldr-url"];
} else {
  // Default to urls.json.
  srcUrl = path.join(__dirname, "./urls.json");
}

if (process.env.CLDR_COVERAGE) {
  coverage = process.env.CLDR_COVERAGE;
} else if (parentPackage && parentPackage["cldr-data-coverage"] && (
      (parentPackage.dependencies && parentPackage.dependencies["cldr-data"]) ||
      (parentPackage.devDependencies && parentPackage.devDependencies["cldr-data"])
      )) {
  coverage = parentPackage["cldr-data-coverage"];
}
if (coverage) {
  options.srcUrlKey = coverage;
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
