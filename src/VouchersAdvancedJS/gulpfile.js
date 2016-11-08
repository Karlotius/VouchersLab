var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

var paths = {
    webroot: "./wwwroot/"
}

paths.dataRequest = "./Scripts/*";


paths.jsDest = paths.webroot + "js/";


gulp.task('min:js', function () {
    return gulp.src([paths.dataRequest])
        .pipe(concat(paths.jsDest + "min/site.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task('copy:js', function () {
    return gulp.src([paths.dataRequest])
        .pipe(gulp.dest(paths.jsDest));
});

gulp.task("both:tasks", ["min:js", "copy:js"]);