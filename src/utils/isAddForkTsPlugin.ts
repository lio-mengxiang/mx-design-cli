import fs from 'fs';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { getProjectPath } from '@mx-design/node-utils';

export const isAddForkTsPlugin = (config) => {
  if (fs.existsSync(getProjectPath('tsconfig.json'))) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }
  return config;
};
