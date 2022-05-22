module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Minify you images
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: 'src/images/',
            src: ['**/*.{png,jpg,svg}'],
            dest: 'dist/images/',
          },
        ],
      },
    },

    //Less to css
    less: {
      development: {
        options: {
          paths: ['src/styles'],
          compress: true,
          yuicompress: true,
          optimization: 2,
        },
        files: {
          'dist/css/style.css': 'src/styles/style.less',
        },
      },
    },
    // Base html build
    htmlbuild: {
      dev: {
        src: 'src/views/*.html',
        dest: 'dist/',
        options: {
          basePath: 'src/views/',
        },
      },
    },

    //Post process autoprefix
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'],
      },
      main: {
        expand: true,
        flatten: true,
        src: 'dist/css/*.css',
        dest: 'dist/css/',
      },
    },

    //Auto-watching you changes (type CTRL + S for save changes & it`ll work)
    watch: {
      //Scripts change
      // scripts: {
      //   files: ['src/**/*.js'],
      //   tasks: ['jshint', 'uglify'],
      // },
      //Less files change
      css: {
        files: ['src/**/*.less'],
        tasks: ['less', 'autoprefixer'],
      },
      //HTML files change
      html: {
        files: ['src/views/*.html'],
        tasks: ['htmlbuild'],
      },
    },
  });

  //Load Tasks
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //Register Tasks
  grunt.registerTask('default', ['imagemin', 'less', 'autoprefixer', 'htmlbuild', 'watch']);
};