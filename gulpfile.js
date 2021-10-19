'use strict';

var { series, parallel } = require('gulp');
const gulp = require('gulp');
var uglify = require('gulp-uglify');
//var sass = require('gulp-sass');
var sass = require('gulp-sass')(require('node-sass'));
var concat = require('gulp-concat');
var del = require('del');

sass.compiler = require('node-sass');

const cleanJs = function(cb) {
  del([
    './js/dtlms.js',
  ]);
  cb();
};

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

const scripts = series(cleanJs, function(cb) {
  let files = [
    './js/jquery/jquery.print.js',
    './js/jquery/jquery.easing.js',
    './js/jquery/jquery.caroufredsel.js',
    './js/jquery/jquery.debouncedresize.js',
    './js/jquery/jquery.prettyphoto.js',
    './js/jquery/jquery.touchswipe.js',
    './js/jquery/jquery.parallax.js',
    './js/jquery/jquery.downcount.js',
    './js/jquery/jquery.nicescroll.js',
    './js/jquery/jquery.bxslider.js',
    './js/jquery/jquery.fitvids.js',
    './js/jquery/jquery.sticky.js',
    './js/jquery/jquery.simple-sidebar.js',
    './js/jquery/jquery.classie.js',
    './js/jquery/jquery.placeholder.js',
    './js/jquery/matchHeight.js'
  ];
  gulp.src([
    ...files,
    './js/jquery/jquery.jplayer.js',
    
    './js/ict/question.js',
    './js/ict/converstation.js',
    './js/jquery/jquery.toggle.click.js',
    './js/ict/dtlms/toggle.js'
  ])
    .pipe(concat('dtlms.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./js/'))
  cb();
});

gulp.task('scripts', series(scripts) );

gulp.task('clean', () => {
  return del([
      'dist/tiengnhatdehieu.css',
  ]);
});

gulp.task('watch', gulp.series(['sass','scripts','sass:watch']));

gulp.task('default', gulp.series(['clean', 'sass']));
