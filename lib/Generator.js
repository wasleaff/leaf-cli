import { getReposList, getTagsList } from "./request.js";
import { wrapLoading, promisify } from "../utils/index.js";
import inquirer from "inquirer";
import chalk from "chalk";
import downloadGitRepo from "download-git-repo";
class Generator {
  constructor(projectName, targetDir) {
    this.name = projectName;
    this.target = targetDir;
    this.downloadGitRepo = promisify(downloadGitRepo);
  }
  async fetchRepo() {
    try {
      let repos = await wrapLoading(getReposList, "waiting fetch template...");
      if (repos && !repos.length) return;
      repos = repos.map((repo) => repo.name);
      const { repo } = await inquirer.prompt([
        {
          type: "list",
          name: "repo",
          message: chalk.yellow("There are all templates, pick the template you want:"),
          default: repos[0],
          choices: repos,
        },
      ]);
      return repo;
    } catch (error) {
      console.warn(error);
    }
  }

  async fetchTag(repo) {
    try {
      let tags = await wrapLoading(getTagsList, "waiting fetch tags...", repo);
      if (tags && !tags.length) return;
      tags = tags.map((tag) => tag.name);
      const { tag } = await inquirer.prompt([
        {
          type: "list",
          name: "tag",
          message: chalk.yellow(
            "There are all version tags, pick the version you want:"
          ),
          default: tags[0],
          choices: tags,
        },
      ]);
      return tag;
    } catch (error) {
      console.warn(error);
    }
  }

  async download(repo, tag) {
    //拼接下载源路径 leaf-cli/vue-template#v1.0.1
    let requestUrl = `leaf-cli/${repo}${tag ? "#" + tag : ""}`;
    //下载资源到本地路径
    await wrapLoading(
      this.downloadGitRepo,
      "waiting fetch code...",
      requestUrl,
      this.target
    );
    //TODO 增加缓存功能
    return this.target;
  }

  async create() {
    try {
      // 模版信息获取-交互
      let repo = await this.fetchRepo();
      // 模版版本获取-交互
      let tag = await this.fetchTag(repo);
      // 根据用户选择动态下载模版内容
      let downloadUrl = await this.download(repo, tag);

      console.log(chalk.green.bold(`\r\nSuccessfully created project name ${chalk.yellow(this.name)}`));
      console.log(chalk.green.bold(`\r\n${chalk.yellow(`cd ${this.name}`)} to begin your work`));
    } catch (error) {
      console.warn(error);
    }
  }
}

export default Generator;
