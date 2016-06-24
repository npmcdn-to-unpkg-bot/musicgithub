/// <binding BeforeBuild='build-less' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    less = require("gulp-less"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var webroot = "../wwwroot/";

var paths = {
    webroot: "./wwwroot/",
    cssDir: "./wwwroot/css/",
    styleDir: "./Styles",
    bower: "./bower_components/",
    jslib: "./" + webroot + "/js/lib/",
    jsapp: "./" + webroot + "/js/app/",
    dist: "./" + webroot + "/dist/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task('build-less', function () {

    return gulp
        .src(paths.styleDir + '/main.less')
        .pipe(less({
            paths: [
                '.',
                './node_modules/bootstrap-less'
            ]
        }))
        .pipe(gulp.dest(paths.cssDir));
});

gulp.task("min", ["min:js", "min:css"]);
