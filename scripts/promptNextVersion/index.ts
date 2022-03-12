import semverInc from "semver/functions/inc";
import { ReleaseType } from "semver";
import { currentVersion } from "../config/constans";
import inquirer from "inquirer";
import fs from "fs";
import { getProjectPath, run, timeLog } from "../config/functions";
import pkg from "../package.json";

/**
 * 列出所有下一个版本的列表
 * @return {*}  {({ [key in ReleaseType]: string | null })}
 */
const getNextVersions = (): { [key in ReleaseType]: string | null } => ({
  major: semverInc(currentVersion, "major"),
  minor: semverInc(currentVersion, "minor"),
  patch: semverInc(currentVersion, "patch"),
  premajor: semverInc(currentVersion, "premajor"),
  preminor: semverInc(currentVersion, "preminor"),
  prepatch: semverInc(currentVersion, "prepatch"),
  prerelease: semverInc(currentVersion, "prerelease"),
});

/**
 * 交互式选择下一个版本号
 * @export prompt
 * @return {*}  {Promise<string>}
 */
export async function prompt(): Promise<string> {
  const nextVersions = getNextVersions();
  const { nextVersion } = await inquirer.prompt([
    {
      type: "list",
      name: "nextVersion",
      message: `请选择将要发布的版本 (当前版本 ${currentVersion})`,
      choices: (Object.keys(nextVersions) as Array<ReleaseType>).map(
        (level) => ({
          name: `${level} => ${nextVersions[level]}`,
          value: nextVersions[level],
        })
      ),
    },
  ]);
  return nextVersion;
}

/**
 * 更新版本号
 * @param nextVersion 新版本号
 */
export async function updateVersion(nextVersion: string) {
  const newPkg = { ...pkg, version: nextVersion };
  const oldPkg = { ...pkg };
  timeLog("修改package.json版本号", "start");
  await fs.writeFileSync(
    getProjectPath("package.json"),
    JSON.stringify(newPkg)
  );
  await run("npx prettier package.json --write");
  timeLog("修改package.json版本号", "end");
  return async () => {
    await fs.writeFileSync(
      getProjectPath("package.json"),
      JSON.stringify(oldPkg)
    );
    await run("npx prettier package.json --write");
  };
}
