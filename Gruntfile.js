// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var paths = {
    src: 'src',
    dist: 'dist',
    bower: 'bower_components',
    pkg: grunt.file.readJSON('package.json')
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    paths: paths,

    watch: {
      options: {
        spawn: false
      },
      js: {
        files: [
          '<%= paths.src %>/**/*.js'
        ],
        tasks: ['jshint', 'bsReload']
      },
      scss: {
        files: [
          '<%= paths.src %>/**/*.scss'
        ],
        tasks: ['compass:src', 'bsReload']
      },
      html: {
        files: [
          '<%= paths.src %>/**/*.html'
        ],
        tasks: ['bsReload']
      }
    },

    compass: {
      src: {
        options: {
          sassDir: '<%= paths.src %>',
          cssDir: '<%= paths.src %>',
          fontsDir: 'fonts',
          environment: 'development',
          require: 'susy'
        }
      },
      dist: {
        options: {
          sassDir: '<%= paths.src %>',
          cssDir: '<%= paths.dist %>',
          fontsDir: 'fonts',
          environment: 'production',
          require: 'susy'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= paths.src %>/**/*.js'
      ]
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= paths.dist %>/*',
            '!<%= paths.dist %>/.git*'
          ]
        }]
      }
    },


    // JS uglify.
    uglify: {
      dist: {
        options: {
          banner: '/* <%= paths.pkg.name %> - v<%= paths.pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
          preserveComments: false,
          mangle: true,
          compress: {
            drop_console: true
          }
        },
        files: [{
          expand: true,
          cwd: '<%= paths.src %>/',
          src: '**/*.js',
          dest: '<%= paths.dist %>/'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          // Copy global files.
          expand: true,
          dot: true,
          cwd: '<%= paths.src %>',
          dest: '<%= paths.dist %>',
         src: [
            '*.{ico,png,txt,md,json}',              // Global files.
            'img/**/*.{webp,jpg,png,gif,svg}',    // Images.
            'fonts/**/*.*',                // Fonts.
            'translate/**/*.json',                // translations.
            '**/*.html',              // JS librairies.
          ]
        }]
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= paths.src %>'
          ]
        },
        options: {
          watchTask: true,
          server: '<%= paths.src %>'
        }
      }
    },
    bsReload: {
      all: {
        reload: true
      }
    }
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('dist', ['clean', 'compass:dist', 'uglify:dist', 'copy:dist']);
};
