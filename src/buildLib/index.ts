import build from "./build";
import { BUILD_LIB } from "../constants";

export const buildLib = (commander) => {
  // 当你输入mx buildLib的时候，就是执行这个命令
  // 这个命令实际上执行的是build文件
  // 我们会打包es和commonjs规范的两个包
  commander
    .command(BUILD_LIB)
    .description("打包编译仓库")
    .option("-a, --analyzerUmd", "是否启用分析器")
    .option("-e, --entry <path>", "打包路径入口文件", "./src/index")
    .option("-e, --entry-dir <path>", "打包路径入口目录", "./src")
    .option("-du, --out-dir-umd <path>", "输出umd格式的目录", "./dist")
    .option("-de, --out-dir-esm <path>", "输出ed格式的目录", "./es")
    .option("-dc, --out-dir-cjs <path>", "输出cjs格式的目录", "./lib")
    .option("-m, --mode <esm|umd|cjs>", "打包模式 目前支持umd和esm两种")
    .action(build);
};
