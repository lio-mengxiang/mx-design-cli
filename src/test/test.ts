import execa from 'execa';
import path from 'path';
import fs from 'fs';
import { getProjectPath } from '../utils';
import { ITestConfig } from '../interface';

const getTestConfig = () => {
  return (
    fs.existsSync(getProjectPath('test.config.js')) ||
    path.join(__dirname, '../config/jestConfig/index.js')
  );
};
export default ({ updateSnapshot, coverage, watch }: Partial<ITestConfig>) => {
  const configFile = getTestConfig();
  const args = [require.resolve('jest/bin/jest'), `--config=${configFile}`];
  updateSnapshot && args.push('-u');
  coverage && args.push('--coverage');
  watch && args.push('--watch');
  execa('node', args, { stdio: 'inherit' });
};
