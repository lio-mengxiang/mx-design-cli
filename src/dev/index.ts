import { CommanderStatic } from 'commander';
import development from './development';
import { DEV } from '../constants';

export const runDev = (commander: CommanderStatic) => {
  // 当你输入mx build的时候，就是执行这个命令，这个命令还可以用在普通业务中
  // 这个命令实际上执行的是development这个文件
  commander
    .command(DEV)
    .description('运行开发环境')
    .option('-r, --root <root>', '项目文件夹,默认process.cwd', process.cwd())
    // 默认端口号3000
    .option('-p, --port <port>', '站点端口号', '4000')
    .action(development);
};
