"use strict";

var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	prefix = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	minifyCSS = require('gulp-minify-css'),
	less = require('gulp-less');

// server connect
gulp.task('connect', function () {
	connect.server({
		root: 'app',
		livereload: true
	});
});

// less
gulp.task('less', function () {
  gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'))
    // .pipe(connect.reload());
});

// css
gulp.task('css', function () {
  gulp.src('app/css/*.css')
    .pipe(concatCSS("main.css"))
    .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('app/css/'))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
});

// html
gulp.task('html', function () {
	gulp.src('app/*.html')
	.pipe(connect.reload());
});

// watch
gulp.task('watch', function () {
	gulp.watch('less/*.css', ['css']);
	gulp.watch('app/*.html', ['html']);
	gulp.watch('less/**/*.less', ['less']);
});

// default
gulp.task('default', ['connect', 'html', 'css', 'less', 'watch']);

