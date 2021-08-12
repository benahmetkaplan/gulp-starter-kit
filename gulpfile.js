const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('run-sequence');
const fileinclude = require('gulp-file-include');
var reload = browserSync.reload;

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('fileinclude', function() {
    gulp.src(['src/**/*.html', '!src/includes/*.html'])
    .pipe(fileinclude())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('img', () => {
    gulp.src('src/assets/img/**/*')
        .pipe(minifyImg())
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(browserSync.stream());
});

gulp.task('webfonts', () => {
    gulp.src('src/assets/webfonts/**/*')
        .pipe(gulp.dest('dist/assets/webfonts'));
});

gulp.task('es6', () => {
    gulp.src('src/assets/js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    gulp.src(['src/assets/js/**/*.js','!src/assets/js/app.js'])
    .pipe(minify({
        ext: {
            min: '.min.js'
        }
    }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.stream());   
});

gulp.task('delete', () => del(['dist']));

gulp.task('watch', () => {
    gulp.watch("src/assets/scss/**/*.scss", ['css']);
    gulp.watch("src/assets/img/**/*", ['img']);
    gulp.watch("src/assets/webfonts/**/*", ['webfonts']);
    gulp.watch("src/assets/js/**/*", ['js']);
    gulp.watch("src/assets/js/app.js", ['es6']);
    gulp.watch("src/**/*.html", ['include-watch']);
});

gulp.task('include-watch', ['fileinclude'], reload);

gulp.task('default', () => {
    runSequence(
        'delete',
        'fileinclude',
        'css',
        'img',
        'webfonts',
        'es6',
        'js',
        'browser-sync',
        'watch'
    );
});
