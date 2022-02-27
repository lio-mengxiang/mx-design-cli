import build from "./build";
import { BUILD_LIB } from '../constants'

export const buildLib = (commander) => {
  // 当你输入mx buildLib的时候，就是执行这个命令
  // 这个命令实际上执行的是build文件
  // 我们会打包es和commonjs规范的两个包
  commander
    .command(BUILD_LIB)
    .description("打包编译仓库")
    .option("-a, --analyzer", "是否启用分析器")
    .action(build)
}
