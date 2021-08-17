'use strict';

var gulp = require('gulp');
//var sass = require('gulp-sass');
var sass = require('gulp-sass')(require('node-sass'));
var concat = require('gulp-concat');
sass.compiler = require('node-sass');

gulp.task('bootstrap-css', function () {
  return gulp.src('./scss/bootstrap.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css/'));
});

gulp.task('tiengnhatdehieu-css', function () {
  return gulp.src('./scss/e-learn-wp.scss')
   .pipe(concat('tiengnhatdehieu.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./css/'));
});

gulp.task('sass', gulp.series(['bootstrap-css', 'tiengnhatdehieu-css']));

gulp.task('sass:watch', function () {
  gulp.watch(
    [
      './scss/*.scss',
      './scss/**/*.scss',
      './scss/**/**/*.scss',
    ],
    gulp.series('sass')
  );
});

gulp.task('clean', () => {
  return del([
      'dist/tiengnhatdehieu.css',
  ]);
});

gulp.task('default', gulp.series(['clean', 'sass']));
