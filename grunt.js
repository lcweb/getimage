module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    },
    coffee: {
      app: {
        src: ['./*.coffee'],
        dest: '.'
      },
      getimage: {
        src: ['./lib/getimage.coffee'],
        dest: './lib'
      }
    }      
  });

  grunt.loadNpmTasks('grunt-coffee');

  // Default task.
  grunt.registerTask('default', 'coffee lint test');

  grunt.registerTask('travis', 'lint test');

};