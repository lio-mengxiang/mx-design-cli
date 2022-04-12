import commander from 'commander';
import runDev from '../dev/development';
import { getProjectConfig, isAddForkTsPlugin, syncChainFns } from '../utils';
import getWebpackConfig from '../config/webpackConfig';
import { DEV } from '../constants';
import { webpackTest } from './build.spec';

jest.mock('../dev/development');
const config = syncChainFns(
  getWebpackConfig,
  getProjectConfig,
  isAddForkTsPlugin
)(DEV);

describe('runDev', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('exec mx runDev', () => {
    it('should toBeCalled buildSite once', () => {
      const program = new commander.Command();
      program.command('dev').action(runDev);
      program.parse(['node', 'test', 'dev']);
      expect(runDev).toBeCalledTimes(1);
    });
  });
  describe('dev mode correct', () => {
    it('mode is dev', () => {
      expect(config.mode).toMatch('development');
    });
    webpackTest(config);
  });
});
