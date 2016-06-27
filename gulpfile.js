'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
  return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
          verbose: true
        }));
});

gulp.task('default', ['style'], function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  })
        .on('restart', function () {
          console.log('Restarting');
        });
});
