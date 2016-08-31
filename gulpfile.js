var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require("gulp-babel"),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    port: 8080,
    livereload: true,
    root: 'public'
  });
});

gulp.task('content', function() {
  gulp.src('assets/**/*')
    .pipe(gulp.dest('public/assets/'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('pages/**/*.html')
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  var src = [
    'src/engine.js',
    'src/boot/**/*.js',
    'src/loader/**/*.js',
    'src/menu/**/*.js',
    'src/game/**/*.js',
    'src/scoreboard/**/*.js',
    'src/app.js'
  ];

  gulp.src(src)
    .pipe(sourcemaps.init())
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(concat('app.js'))
    .pipe(babel({
      "presets": ["es2015"]
    }))
    .on('error', function(err) {
      console.error('Error in babel task', err.toString());
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  watch('src/**/*.js', function() {
    gulp.start('js');
  });
  watch('pages/**/*.html', function() {
    gulp.start('html');
  });
  watch('assets/**/*', function() {
    gulp.start('content');
  });
});

gulp.task('default', ['js', 'html', 'content', 'connect', 'watch']);
