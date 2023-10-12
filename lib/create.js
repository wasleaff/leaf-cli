import { join } from "path";
import pkg from "fs-extra";
const { existsSync, remove } = pkg;
import inquirer from "inquirer";
import Generate from "./Generator.js";
import chalk from "chalk";
export default async function (projectName, args) {
  console.log("create module", projectName, args);
  const cwd = process.cwd();
  const targetDir = join(cwd, projectName);
  try {
    if (existsSync(targetDir)) {
      if (args.force) {
        //强制删除
        await remove(targetDir);
      } else {
        // 用户手动判断
        const { action } = await inquirer.prompt([
          {
            type: "list",
            name: "action",
            message: chalk.yellow(
              "Target directory already exists, pick an action:"
            ),
            choices: [
              { name: "Overwrite", value: "overwrite" },
              { name: "Cancel", value: "cancel" },
            ],
          },
        ]);

        if (action === "cancel") {
          return;
        } else if (action === "overwrite")
          console.log(chalk.yellow.bold("Removing..."));
        await remove(targetDir);
        console.log(chalk.green.bold("Successfully!!!"));
      }
    }
  } catch (error) {
    console.log(`error: ${error}`);
  }
  //新建项目
  const Generator = new Generate(projectName, targetDir);
  Generator.create();
}
