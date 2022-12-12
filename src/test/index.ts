import test from './test';
import { TEST } from '../constants';

export const runTest = (commander) => {
  // 执行单元测试
  commander
    .command(TEST)
    .description('执行单元测试')
    .option('-u, --update-snapshot', '是否更新快照')
    .option('-c, --coverage', '是否生成覆盖率报告')
    .option('-w, --watch', '是否只测试改动的文件')
    .action(test);
};
