var assert = require("assert");
var fs = require("fs");
var path = require("path");
var cldrData = require("..");

assert(cldrData.entireSupplemental(), "entireSupplemental() runs without error");

var locales = fs.readdirSync(path.join(__dirname, "../main"));

locales.forEach(function (locale) {
  assert(cldrData.entireMainFor(locale),
    "entireMainFor() runs for '" + locale +"' without error");
});

assert(cldrData.all(), "all() runs without error");
