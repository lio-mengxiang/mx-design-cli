import { run, timeLog } from "../config/functions";

/**
 * 发布至npm
 */
export async function publish() {
  timeLog("发布", "start");
  await run("npm publish");
  timeLog("发布", "end");
}
