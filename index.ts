import * as cmd from "commander";
import chalk from "chalk";
import * as child_process from "child_process";

cmd.name("create");
cmd.description("ng-electron description.");
// cmd.option("-C, --create [projectName]", "create a new ng-electron project.");

cmd.action(async (name: string, context: any) => {
  if (name !== "create") return;
  return new Promise((resolve, reject) => {
    child_process
      .spawn("gulp default", [], {})
      .on("exit", (code, signal) => {
        if (code === 0) resolve(0);
        reject({ code, signal });
      })
      .on("error", err => {
        reject(err);
      })
      .on("close", (code, signal) => {
        if (code === 0) resolve(0);
        reject({ code, signal });
      })
      .on("disconnect", () => {
        console.log(chalk.yellow("disconnect"));
        resolve();
      })
      .on("message", message => {
        console.log(chalk.green(message));
      });
  });
});

cmd.version("1.0.0").parse(process.argv);

if (cmd.args.length === 0) {
  cmd.outputHelp();
}
