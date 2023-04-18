import build from './build';
import { BUILD_LIB } from '../constants';

export const buildLib = (commander) => {
  /**
   * @zh 当你输入mx buildLib的时候，就是执行这个命令
   * 这个命令实际上执行的是build文件
   * 我们会打包es和commonjs规范的两个包
   * @en when you input mx buildLib, command will execute
   * This command actually executes the build file
   * We will package two packages of es and commonjs specifications
   */
  commander
    .command(BUILD_LIB)
    .description('打包编译仓库(Package and compile project)')
    .option(
      '-a, --analyzerUmd',
      '是否启用webpack打包分析器(Whether to enable the webpack packaging analyzer)'
    )
    .option(
      '-e, --entry <path>',
      'umd打包路径入口文件(umd mode packaging path entry file)',
      './src/index'
    )
    .option('--output-name <name>', '打包Umd格式后对外暴露的名称')
    .option('--entry-dir <path>', 'cjs和esm打包路径入口目录', './src')
    .option('--out-dir-umd <path>', '输出umd格式的目录', './dist')
    .option('--out-dir-esm <path>', '输出esm格式的目录', './esm')
    .option('--out-dir-cjs <path>', '输出cjs格式的目录', './lib')
    .option('--copy-less', '拷贝不参与编译的文件')
    .option('--less-2-css', '是否编译组件样式')
    .option('-m, --mode <esm|umd|cjs>', '打包模式 目前支持umd、esm和cjs')
    .action(build);
};
