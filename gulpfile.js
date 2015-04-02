/*
-----------------------------------------------------------------------------------
|
| Gulp configuration
|
-----------------------------------------------------------------------------------
*/

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var plumber      = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var watch        = require('gulp-watch');
var sftp         = require('gulp-sftp');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    })
});

gulp.task('reload', function() {
    return browserSync.reload();
});

gulp.task('sass', function() {
    return gulp.src(['./sass/*.scss', './sass/**/*.scss'])
      .pipe(plumber({errorHandler: printError}))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('lint', function() {
     return gulp.src(['./js/*.js', './js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['sass', 'browser-sync'], function() {
    watch('./sass/**/*.scss', function() {
        gulp.start('sass');
    });

    watch('./**/*.html', function() {
        gulp.start('reload');
    });

    watch('./js/**/*.js', function() {
        gulp.start('lint');
        gulp.start('reload');
    });
});

/*
-----------------------------------------------------------------------------------
|
| Error handling
|
-----------------------------------------------------------------------------------
*/

function printError(error) {
    console.log(error.message);
    this.emit('end');
}
