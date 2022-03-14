import execa from "execa";
import path from "path";
import { ITestConfig } from "../interface";

export default ({ updateSnapshot, coverage, watch }: Partial<ITestConfig>) => {
  const configFile = path.join(__dirname, "../config/jestConfig/");
  const args = [require.resolve("jest/bin/jest"), `--config=${configFile}`];
  updateSnapshot && args.push("-u");
  coverage && args.push("--coverage");
  watch && args.push("--watch");
  execa("node", args, { stdio: "inherit" });
};
