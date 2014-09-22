requestGlob = require("./lib/request-glob")

requestGlob(
  "http://www.unicode.org/repos/cldr-aux/json/26",
  "http://www.unicode.org/repos/cldr-aux/json/26/main/*/numbers.json",
  function(error, request, response, body, remaining) {
    if (error) {
      return console.log("Whops", error.message);
    }
    console.log("=-=-=-= (", body.length, ") +", remaining);
  }
);
