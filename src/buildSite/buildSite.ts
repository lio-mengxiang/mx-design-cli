import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { getProjectPath } from '@mx-design/node-utils';
import { log } from '@mx-design/web-utils';
import getWebpackConfig from '../config/webpackConfig';
import { getProjectConfig, syncChainFns, isAddForkTsPlugin } from '../utils';
import { IDeployConfig } from '../interface';
import { BUILD_SITE } from '../constants';

export default ({ outDir, analyzer }: IDeployConfig) => {
  const config = syncChainFns(
    getWebpackConfig,
    getProjectConfig,
    isAddForkTsPlugin
  )(BUILD_SITE);
  config.output.path = config.output.path || getProjectPath(outDir);

  if (analyzer) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
      })
    );
  }

  webpack(config).run((err) => {
    if (err) {
      log.error('webpackError: ', JSON.stringify(err));
    }
  });
};
