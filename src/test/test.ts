import execa from "execa";
import { ITestConfig } from "../interface";
import jestConfig from "../config/jestConfig";

export default ({ updateSnapshot, coverage }: Partial<ITestConfig>) => {
  const args = [require.resolve("jest/bin/jest"), `--config=${jestConfig}`];
  updateSnapshot && args.push("-u");
  coverage && args.push("--coverage");
  execa("node", args, { stdio: "inherit" });
};
