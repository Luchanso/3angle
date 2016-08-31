'use strict'

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const babel = require("gulp-babel");
const connect = require('gulp-connect');

gulp.task('connect', () => {
  connect.server({
    port: 8080,
    livereload: true,
    root: 'public'
  });
});

gulp.task('content', () => {
  gulp.src('assets/**/*')
    .pipe(gulp.dest('public/assets/'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src('pages/**/*.html')
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('js', () => {
  const src = [
    'src/engine.js',
    'src/boot/**/*.js',
    'src/loader/**/*.js',
    'src/menu/**/*.js',
    // TODO: Исправить ошибку
    // 'src/game/triangle.js'
    // 'src/game/game.js'
    // TODO: Вынести triangle в отдельную папку
    'src/game/**/*.js',
    'src/scoreboard/**/*.js',
    'src/app.js'
  ];

  gulp.src(src)
    .pipe(sourcemaps.init())
    .on('error', err => {
      console.error('Error in compress task', err.toString());
    })
    .pipe(concat('app.js'))
    .pipe(babel({
      "presets": ["es2015"]
    }))
    .on('error', err => {
      console.error('Error in babel task', err.toString());
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  watch('src/**/*.js', () => {
    gulp.start('js');
  });
  watch('pages/**/*.html', () => {
    gulp.start('html');
  });
  watch('assets/**/*', () => {
    gulp.start('content');
  });
});

gulp.task('default', ['js', 'html', 'content', 'connect', 'watch']);
