import run from "@bigmogician/publisher";
import { config } from "./pkg";
import * as fs from "fs";
import * as path from "path";

run({
  ...config,
  rc: true,
  useStamp: true,
  onDebugEnd(newVersion) {
    console.log(newVersion);
    const pkg = require("../package.json");
    pkg.version = newVersion;
    fs.writeFileSync(path.resolve(__dirname, "../package.json"), JSON.stringify(pkg, null, "  "), { flag: "w+" });
  }
});
