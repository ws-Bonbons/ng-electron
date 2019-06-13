import * as gulp from "gulp";
import * as path from "path";
import * as through from "through2";
import { File } from "gulp-util";

function getArg(name: string) {
  const args = process.argv || [];
  const index = args.findIndex(i => i === name);
  if (index >= 0) {
    return args[index + 1];
  }
  return undefined;
}

const workFolder = getArg("--workroot") || getArg("-W");
const projectName = getArg("--name") || getArg("-N") || "my-project";
const outputPath = path.resolve(workFolder || __dirname, getArg("--output") || getArg("-O") || `./${projectName}`);

gulp.task("create", () =>
  gulp
    .src("./template/**/*.*")
    .pipe(
      through.obj(function(file: File, enc, cb) {
        if (file.basename.endsWith("package.json")) {
          const pkg = require(path.resolve(file.dirname, file.basename));
          pkg.name = projectName;
          file.contents = new Buffer(JSON.stringify(pkg, null, "  "));
        }
        this.push(file);
        cb();
      })
    )
    .pipe(gulp.dest(outputPath))
);
