/*
-----------------------------------------------------------------------------------
|
| Gulp configuration
|
-----------------------------------------------------------------------------------
*/

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS    = require('gulp-minify-css')
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch');

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
| Production tasks
|
-----------------------------------------------------------------------------------
*/

// gulp.task('concat', function() {
//     return gulp.src('./js/**/*.js')
//         .pipe(concat('bundle.js'))
//         .pipe(gulp.dest('./js/')); 
// });

// gulp.task('uglify', function() {
//     return gulp.src('./js/bundle.js')
//         .pipe(uglify({ mangle: false }))
//         .pipe(gulp.dest('./js/')); 
// });

// // REMEMVER IMAGEMIN??

// gulp.task('production', ['concat', 'uglify']);

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
