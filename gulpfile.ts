import * as gulp from "gulp";
import * as through from "through2";
import * as fs from "fs";
import * as rimraf from "rimraf";
import { File } from "gulp-util";

gulp.task("rename:gulpfile", () =>
  gulp
    .src(["./dist/gulpfile.cmd.js"])
    .pipe(
      through.obj(function(file: File, enc, cb) {
        fs.unlinkSync("./dist/gulpfile.js");
        file.basename = file.basename.replace("gulpfile.cmd.js", "gulpfile.js");
        this.push(file);
        cb();
      })
    )
    .pipe(gulp.dest("./dist"))
);

gulp.task("clear:gulpfile", () =>
  gulp
    .src(["./dist/gulpfile.cmd.js"])
    .pipe(
      through.obj(function(file: File, enc, cb) {
        fs.unlinkSync("./dist/gulpfile.cmd.js");
        cb();
      })
    )
    .pipe(gulp.dest("./dist"))
);

gulp.task("copy:template", () => gulp.src(["./template/**/*.*"]).pipe(gulp.dest("./dist/template")));

gulp.task("copy", gulp.series("rename:gulpfile", "clear:gulpfile", "copy:template"));
