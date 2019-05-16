import * as fs from "fs-extra";
import * as path from "path";
import * as zlib from "zlib";
import * as tar from "tar";
import chalk from "chalk";

// const copied: string[] = [];

// fs.copySync(path.resolve(__dirname, "../src"), path.resolve(__dirname, "../package"), {
//   filter: (src, dist, ...args) => {
//     if (copied.indexOf(src) < 0) {
//       copied.push(src);
//       if (src.startsWith(path.resolve(__dirname, "../src/node_modules"))) return false;
//       console.log(chalk.magenta(src));
//     }
//     return true;
//   }
// });

tar.create(
  {
    gzip: true,
    cwd: path.resolve(__dirname, "../"),
    file: path.resolve(__dirname, "../package/src.tar.gz"),
    filter(p) {
      console.log("GZIP ==> " + chalk.yellow(p));
      return !p.startsWith("src/node_modules");
    },
    sync: true
  },
  ["src"]
);

tar.create(
  {
    gzip: true,
    cwd: path.resolve(__dirname, "../src"),
    file: path.resolve(__dirname, "../package/node_modules.tar.gz"),
    filter(p) {
      console.log("GZIP ==> " + chalk.magenta(p));
      return true;
    },
    sync: true
  },
  ["node_modules"]
);
