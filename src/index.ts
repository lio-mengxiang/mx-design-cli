import commander from 'commander';

import { buildLib } from './buildLib/index';
import { buildSite } from './buildSite/index';
import { runDev } from './dev/index';
import { version } from '../package.json';
import { runTest } from './test';

commander.version(version, '-v, --version');

buildLib(commander);
buildSite(commander);
runDev(commander);
runTest(commander);

// commander解析命令行参数
commander.parse(process.argv);

// 如果命令行没有参数如执行mx，则会显示帮助文档
if (!commander.args[0]) {
  commander.help();
}
