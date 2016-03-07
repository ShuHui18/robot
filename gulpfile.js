
'use strict';

var gulp = require('gulp');
let plumber = require('gulp-plumber');
let babel = require('gulp-babel');
let runSequence = require('run-sequence');

gulp.task('babel', function (options, a, b) {
  return gulp.src(['src/**/*.js'])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('build', function() {
  runSequence('babel');
});
