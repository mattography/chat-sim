var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssbeautify = require('gulp-cssbeautify');

gulp.task('styles', function(){
  gulp.src('sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css/')
    );
});

gulp.task('css', function(){
  return gulp.src('./styles/*.css')
    .pipe(cssbeautify({
      indent: ' ',
      openbrace: 'end-of-line',
      autosemicolon: true
    }))
    .pipe(gulp.dest('./styles/'));
});

//Watch
gulp.task('default', function(){
  gulp.watch('sass/**/*.scss',['styles','css']);
});
