var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("src/tsconfig.spec.json");

gulp.task("default", function() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("gulp-test-files"));
});
