import { getProjectPath, withOra } from '@mx-design/node-utils';
import { log } from '@mx-design/web-utils';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import getWebpackConfig from '../config/webpackConfig';
import { BUILD_LIB } from '../constants';

const { name } = require(getProjectPath('package.json'));
const checkName = (outputName, name) => {
  if (!outputName && name?.includes('/')) {
    log.warn(
      'The package name of package.json contains slashes, and webpack will create folders with slashes when packaging, so please pay attention to whether the file name after packaging meets your requirements'
    );
  }
};

/**
 * build for umd
 * @param analyzer Whether to enable the analysis package plugin
 * @param outDirUmd output directory
 * @param entry packaged entry file
 * @param outputName packaged name
 */
export const buildUmd = async ({
  analyzerUmd,
  outDirUmd,
  entry,
  outputName,
  mode,
}) => {
  const customizePlugins = [];
  const realName = outputName || name;
  const entryFiles = entry.split(',').map((p) => getProjectPath(p));
  checkName(outputName, name);
  const umdTask = (mode) => {
    return new Promise((resolve, reject) => {
      const config = webpackMerge(getWebpackConfig(mode), {
        entry: {
          [realName]: entryFiles,
        },
        output: {
          path: getProjectPath(outDirUmd),
          library: realName,
        },
        plugins: customizePlugins,
      });

      if (analyzerUmd) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            generateStatsFile: true,
          })
        );
      }
      return webpack(config).run((err, stats) => {
        if (stats.compilation.errors?.length) {
          console.log('webpackError: ', stats.compilation.errors);
        }
        if (err) {
          log.error('webpackError: ', JSON.stringify(err));
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });
  };
  await withOra(() => umdTask(mode), {
    text: 'building umd',
    successText: 'umd computed',
    failText: 'umd failed',
  });
};
