import { run, timeLog } from "../config/functions";

/**
 * 打tag提交至git
 */
export async function tag(nextVersion: string) {
  timeLog("打tag并推送至git", "start");
  await run(`git tag v${nextVersion}`);
  await run(`git push origin tag v${nextVersion}`);
  timeLog("打tag并推送至git", "end");
}
