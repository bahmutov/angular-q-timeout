/* global module */
module.exports = function (grunt) {
  module.require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'nice-package': {
      all: {
        options: {
          blankLine: true
        }
      }
    },

    jshint: {
      'options': {
        jshintrc: '.jshintrc'
      },
      default: {
        'src': [ '*.js', 'test/*.js' ]
      }
    },

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version',
            'private', 'license', 'keywords', 'homepage', 'main'],
        }
      }
    },

    bower: {
      install: {
        options: {
          layout: 'byComponent',
          // if copy is false, will leave all downloaded files in bower_components
          copy: false,
          verbose: true,
          cleanBowerDir: false,
          bowerOptions: {
            forceLatest: true
          }
        }
      }
    },

    'clean-console': {
      all: {
        options: {
          url: ['index.html'],
          timeout: 1
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: false,
        singleRun: true,
        logLevel: 'INFO',
        browsers: ['PhantomJS']
      }
    },

    watch: {
      options: {
        atBegin: true
      },
      all: {
        files: ['*.js', 'test/*.js', 'index.html'],
        tasks: ['jshint', 'test']
      }
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['karma', 'clean-console']);
  grunt.registerTask('default', ['bower', 'deps-ok', 'nice-package', 'sync', 'jshint', 'test']);
};
