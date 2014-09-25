# Npm's cldr-data - My Application Example

This example demonstrates that no action is needed from end application part.

On `package.json`, it defines its dependency on Foo Number Format Library.
That's it.

To run the demo:

    npm install
    node < app.js

Expected output:

    $ npm install

    /
    > cldr-data@26.0.1 install /userdata/external/cldr-data-npm/node_modules/cldr-data-example-library-foo/node_modules/cldr-data
    > node install.js

    GET `http://www.unicode.org/Public/cldr/26/json.zip`
      [========================================] 100% 0.0s
    Received 3425K total.

    Unpacking it into `./json`
    Done
    grunt-dco@0.0.3 node_modules/grunt-dco
    └── dco@1.1.0 (git-tools@0.1.1, sane-email-validation@1.0.0)

    matchdep@0.3.0 node_modules/matchdep
    ├── stack-trace@0.0.7
    ├── resolve@0.5.1
    ├── globule@0.1.0 (lodash@1.0.1, glob@3.1.21, minimatch@0.2.14)
    └── findup-sync@0.1.3 (lodash@2.4.1, glob@3.2.11)

    grunt@0.4.5 node_modules/grunt
    ├── dateformat@1.0.2-1.2.3
    ├── which@1.0.5
    ├── eventemitter2@0.4.14
    ├── getobject@0.1.0
    ├── rimraf@2.2.8
    ├── colors@0.6.2
    ├── async@0.1.22
    ├── grunt-legacy-util@0.2.0
    ├── hooker@0.2.3
    ├── exit@0.1.2
    ├── nopt@1.0.10 (abbrev@1.0.5)
    ├── lodash@0.9.2
    ├── coffee-script@1.3.3
    ├── underscore.string@2.2.1
    ├── iconv-lite@0.2.11
    ├── glob@3.1.21 (inherits@1.0.0, graceful-fs@1.2.3)
    ├── grunt-legacy-log@0.1.1 (underscore.string@2.3.3, lodash@2.4.1)
    ├── js-yaml@2.0.5 (esprima@1.0.4, argparse@0.1.15)
    ├── minimatch@0.2.14 (sigmund@1.0.0, lru-cache@2.5.0)
    └── findup-sync@0.1.3 (lodash@2.4.1, glob@3.2.11)

    grunt-contrib-jshint@0.10.0 node_modules/grunt-contrib-jshint
    ├── hooker@0.2.3
    └── jshint@2.5.6 (strip-json-comments@1.0.1, underscore@1.6.0, exit@0.1.2, shelljs@0.3.0, console-browserify@1.1.0, minimatch@1.0.0, cli@0.6.4, htmlparser2@3.7.3)

    cldr-data-example-library-foo@0.0.1 node_modules/cldr-data-example-library-foo
    ├── cldrjs@0.3.8
    └── cldr-data@26.0.1 (cldr-data-downloader@0.0.3)


    node < app.js 

    Follow `3.1415` formatted by our Foo library.
    In Arabic: 3٫1415
    In English: 3.1415
    In Portuguese: 3,1415

## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
