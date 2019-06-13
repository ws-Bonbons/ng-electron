import { IConfig } from "@bigmogician/publisher/actions";

export const config: IConfig = {
  rc: false,
  add: 0,
  useYarn: false,
  whiteSpace: "  ",
  debug: false,
  outDist: "./dist",
  rootPath: ".",
  outTransform: json => ({
    ...json,
    main: "index.js",
    types: "index.d.ts",
    scripts: undefined,
    nyc: undefined,
    devDependencies: undefined
  })
};
