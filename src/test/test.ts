import execa from "execa";
import path from "path";
import { ITestConfig } from "../interface";

export default ({
  updateSnapshot,
  coverage,
  isWatch,
}: Partial<ITestConfig>) => {
  const configFile = path.join(__dirname, `../config/jestConfig/index.ts`);
  const args = [require.resolve("jest/bin/jest"), `--config=${configFile}`];
  updateSnapshot && args.push("-u");
  coverage && args.push("--coverage");
  isWatch && args.push("--watch");
  execa("node", args, { stdio: "inherit" });
};
