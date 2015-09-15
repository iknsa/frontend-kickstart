A cool skeleton to kick start a front end developpement.

The grunt default task includes a browser sync which launches your browser and if you open several browsers on the same port then, it refreshes (livereloads) all the browsers... coool

All developpment files should be in the src folder.

The compass task will compile scss files to css in the same directory when in dev and your js files remains untouched but there is a jshint on all js files in the src folder.

when grunt dist is run, all scss files are compiled in the dist folder keeping the same architecture of the src. Js files are also minified in the dist folder.