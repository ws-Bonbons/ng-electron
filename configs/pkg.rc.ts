import run from "@bigmogician/publisher";
import { config } from "./pkg";
import fs from "fs";
import path from "path";

run({
  ...config,
  rc: true,
  useStamp: true,
  onDebugEnd(newVersion){
    console.log(newVersion);
    const pkg = require("../package.json");
    pkg.version = newVersion;
    fs.writeFileSync(path.resolve("../package.json"), JSON.stringify(pkg, null, "  "))
  }
});
