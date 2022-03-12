import child_process from "child_process";
import util from "util";
import chalk from "chalk";
import {
  currentVersion,
  GIT_ADD,
  GIT_COMMIT,
  GIT_PUSH,
} from "../config/constans";
import path from "path";

const exec = util.promisify(child_process.exec);

export const run = async (command: string) => {
  console.log(chalk.green(command));
  await exec(command);
};

export const timeLog = (logInfo: string, type: "start" | "end") => {
  let info = "";
  if (type === "start") {
    info = `=> start task：${logInfo}`;
  } else {
    info = `✨ end task：${logInfo}`;
  }
  console.log(`[${new Date().toLocaleString()}] ${info}`);
};

// 获取项目文件
export const getProjectPath = (dir = "./"): string => {
  return path.join(process.cwd(), dir);
};
