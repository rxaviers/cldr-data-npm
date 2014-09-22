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

cldrDownloader(
  "http://www.unicode.org/Public/cldr/26/json.zip",
  path.join(__dirname, "json"),
  function(error) {
    if (error) {
      console.error("Whops", error.message);
      exit(1);
    }
    console.log("Done");
  }
);
