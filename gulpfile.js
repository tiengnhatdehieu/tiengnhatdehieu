'use strict';

var gulp = require('gulp');
//var sass = require('gulp-sass');
var sass = require('gulp-sass')(require('node-sass'));
var concat = require('gulp-concat');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
   return gulp.src('./scss/*.scss')
   .pipe(concat('tiengnhatdehieu.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./css/'));
});

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

// gulp.task('watch', function() {
//   gulp.watch('app/css/*.css', gulp.series('styles'));
//   gulp.watch('app/js/*.js', gulp.series('scripts'));
//   gulp.watch('app/img/*', gulp.series('images'));
// });

gulp.task('clean', () => {
  return del([
      'dist/tiengnhatdehieu.css',
  ]);
});

gulp.task('default', gulp.series(['clean', 'sass']));
