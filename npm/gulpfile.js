var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('clean-temp', function () {
  return del(['temp']);
});

gulp.task('babelify', ['clean-temp'], function () {
  return gulp.src(['src/*.js', 'src/**/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('temp'));
});

gulp.task('clean-output', function () {
  return del(['scripts/index.js']);
});

gulp.task('browserify', ['clean-output', 'babelify'], function () {
  return browserify({ entries: ['./temp/main.js'] }).bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./scripts'));
});

gulp.task('default', ['browserify']);