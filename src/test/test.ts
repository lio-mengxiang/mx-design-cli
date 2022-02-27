import execa from "execa";
import { ITestConfig } from "../interface";
import { getProjectPath } from "../utils";

export default ({
  updateSnapshot,
  coverage,
  setupFilesAfterEnv,
}: Partial<ITestConfig>) => {
  const configFile = require.resolve(`./config/jestConfig/index}`);
  const args = [
    require.resolve("jest/bin/jest"),
    `--config=${configFile}`,
    `--setupFilesAfterEnv=${getProjectPath(setupFilesAfterEnv)}`,
  ];
  updateSnapshot && args.push("-u");
  coverage && args.push("--coverage");
  execa("node", args, { stdio: "inherit" });
};
