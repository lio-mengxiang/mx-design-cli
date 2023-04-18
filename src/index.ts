import commander from 'commander';

import { buildLib } from './buildLib/index';
import { buildSite } from './buildSite/index';
import { runDev } from './dev/index';
import { version } from '../package.json';

commander.version(version, '-v, --version');

buildLib(commander);
buildSite(commander);
runDev(commander);

/**
 * @zh commander解析命令行参数
 * @en parse the command-line arguments by commander
 */
commander.parse(process.argv);

/**
 * @zh 如果命令行没有参数如执行mx，则会显示帮助文档
 * @en if there are no arguments to the command line, such as executing mx, the help documentation will be shown
 */
if (!commander.args[0]) {
  commander.help();
}
