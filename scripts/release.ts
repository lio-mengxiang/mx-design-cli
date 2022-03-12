/* 部署的函数有 */
/*
 * 版本更新
 * 推送至 git 仓库
 * 组件库打包
 * 发布至 npm
 * 生成 CHANGELOG
 * 打 tag 并推送至 git
 */
// 依赖
// conventional-changelog
// inquirer
// semverInc
import { updateVersion, prompt } from "./promptNextVersion";
import { push } from "./gitPush";
import { getOldLog, generateChangelog } from "./generateChangelog";
import { build } from "./build";
import { publish } from "./publish";
import { tag } from "./tag";

async function defaultMain() {
  try {
    const nextVersion = await prompt();
    /* 下面这种中断promise的写法有些冗余，后续用rxjs重构一下 */
    const startTime = Date.now();
    // =================== 更新版本号 ===================
    const backVersionFn = await updateVersion(nextVersion);

    // =================== 代码推送git仓库 ===================
    const pushResult = await push().catch(() => false);
    if (!pushResult) {
      return backVersionFn();
    }

    // =================== 更新changelog ===================
    const backChangelog = getOldLog();
    const changelogResult = await generateChangelog().catch(() => false);
    if (!changelogResult) {
      backChangelog();
      return backVersionFn();
    }

    // =================== 组件库打包 ===================
    const buildResult = await build().catch(() => false);
    if (!buildResult) {
      backChangelog();
      return backVersionFn();
    }

    // =================== 发布至npm ===================
    const publishResult = await publish().catch(() => false);
    if (!publishResult) {
      backChangelog();
      return backVersionFn();
    }
    // =================== 打tag并推送至git ===================
    const tagResult = await tag(nextVersion).catch(() => false);
    if (!tagResult) {
      backChangelog();
      return backVersionFn();
    }

    console.log(
      `✨ 发布流程结束 共耗时${((Date.now() - startTime) / 1000).toFixed(3)}s`
    );
  } catch (error) {
    console.log("💣 发布失败，失败原因：", error);
  }
}

export default defaultMain;
