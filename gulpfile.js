const gulp = require('gulp');
const babel = require('gulp-babel');
const cp = require('child_process');

gulp.task("babel", function () {
    return gulp.src("./src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("npm"))
})
gulp.task("copy-config", function () {
    return gulp.src(["./src/cli/config/*.json"])
        .pipe(gulp.dest("./npm/cli/config"))
})
gulp.task("copy-file", function () {
    return gulp.src(["./package.json", "./README.md", "./LICENSE"])
        .pipe(gulp.dest("./npm/"))
})


gulp.task('default', gulp.series('babel', 'copy-config', 'copy-file'));
