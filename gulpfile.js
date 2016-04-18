var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  coffee = require('gulp-coffee'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename')

gulp.task('coffee', function () {
  gulp.src('src/*.coffee')
    .pipe(plumber())
    .pipe(coffee({bare: true}))
    .pipe(concat('librequire.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify', function(){
  gulp.src('dist/librequire.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('../dist'))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', [
  'coffee',
  'minify'
]);
