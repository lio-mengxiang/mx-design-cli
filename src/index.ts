import commander from 'commander';

import { buildLib } from './buildLib';
import { buildSite } from './buildSite';
import { runDev } from './dev';
import { version } from '../package.json';

/**
 * 查询mx-design-cli的版本
 */
commander.version(version, '-v, --version');

/**
 * 执行打包组件库的命令（使用rollup打包
 */
buildLib(commander);

/**
 * 执行打包业务代码的命令（使用webpack，更多的是用webpack控制分包）
 */
buildSite(commander);

/**
 * 启动开发环境（使用vite）
 */
runDev(commander);

/**
 * commander解析命令行参数
 */
commander.parse(process.argv);

/**
 * 如果命令行没有参数如执行mx，则会显示帮助文档
 */
if (!commander.args[0]) {
  commander.help();
}
