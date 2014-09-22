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

module.exports = function(path) {
  assert(typeof path === "string", "must include path (e.g., " +
    "\"main/en/numbers\" or \"supplemental/likelySubtags\")");

  path = _path.join("json", path);
  return require("./" + path);
}
