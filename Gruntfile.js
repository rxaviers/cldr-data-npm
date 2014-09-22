module.exports = function(grunt) {

  "use strict";

  var pkg = require("./package.json");

  grunt.initConfig({
    pkg: pkg,
    jshint: {
      source: {
        src: [ "install.js", "lib/**" ],
        options: {
          jshintrc: ".jshintrc"
        }
      },
      grunt: {
        src: [ "Gruntfile.js" ],
        options: {
          jshintrc: ".jshintrc"
        }
      },
      metafiles: {
        src: [ "bower.json", "package.json" ],
        options: {
          jshintrc: ".jshintrc"
        }
      }
    },
    dco: {
      current: {
        options: {
          exceptionalAuthors: {
            "rxaviers@gmail.com": "Rafael Xavier de Souza"
          }
        }
      }
    }
  });

  require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );

  grunt.registerTask( "default", [
    "jshint:metafiles",
    "jshint:grunt",
    "jshint:source",
    "dco"
  ]);

};

