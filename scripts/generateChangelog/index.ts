import { timeLog, run, getProjectPath } from "../config/functions";
import fs, { existsSync } from "fs";
import { CHANGELOG_NAME } from "../config/constans";

export const getOldLog = () => {
  const logPath = getProjectPath(CHANGELOG_NAME);
  if (existsSync(logPath)) {
    fs.writeFileSync(logPath, "");
  }
  const oldFile = fs.readFileSync(logPath);
  return () => {
    fs.writeFileSync(logPath, oldFile);
  };
};

/**
 * 生成CHANGELOG
 */
export async function generateChangelog() {
  timeLog("生成CHANGELOG.md", "start");
  await run(`conventional-changelog -p angular -i ${CHANGELOG_NAME} -s`);
  timeLog("生成CHANGELOG.md", "end");
  return true;
}
