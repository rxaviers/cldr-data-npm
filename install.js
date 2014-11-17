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

var url = urls[process.env.CLDR_COVERAGE || "core"];

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
      console.error("Whops", error.message);
      exit(1);
    }
  }
);
