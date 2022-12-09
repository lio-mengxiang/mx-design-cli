import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { copyLess, less2css, buildCjs, buildEsm } from '../config/gulpConfig';
import getWebpackConfig from '../config/webpackConfig';
import { getProjectPath, logger, compose, getJSON } from '../utils';
import { BUILD_LIB, CJS, ESM, UMD, COPY_LESS, LESS_2_CSS } from '../constants';

const checkName = (outputName, name) => {
  if (!outputName && name?.includes('/')) {
    logger.warn(
      'package.json的包名包含斜杠，webpack打包时会以斜杠来建立文件夹，所以请注意打包后文件名是否符合你的要求'
    );
  }
};

/**
 * build for umd
 * @param analyzer 是否启用分析包插件
 * @param outDirUmd 输出目录
 * @param entry 打包的入口文件
 * @param outputName 打包出来的名字
 */
const buildUmd = async ({ analyzerUmd, outDirUmd, entry, outputName }) => {
  const { name } = getJSON(getProjectPath('package.json'));
  const customizePlugins = [];
  const realName = outputName || name;
  checkName(outputName, name);
  const umdTask = (type) => {
    return new Promise((resolve, reject) => {
      const config = webpackMerge(getWebpackConfig(type), {
        entry: {
          [realName]: getProjectPath(entry),
        },
        output: {
          path: getProjectPath(outDirUmd),
          library: realName,
          libraryTarget: 'umd',
          libraryExport: 'default',
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
          logger.error('webpackError: ', JSON.stringify(err));
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });
  };
  logger.info('building umd');
  await umdTask(BUILD_LIB);
  logger.success('umd computed');
};

const bulidLibFns = {
  [LESS_2_CSS]: async (next, otherOptions) => {
    logger.info('less2css ing...');
    await less2css({
      outDirCjs: otherOptions.outDirCjs,
      entryDir: otherOptions.entryDir,
      mode: otherOptions.mode,
      outDirEsm: otherOptions.outDirEsm,
    });
    logger.success('less2css computed');
    next();
  },
  [UMD]: async (next, otherOptions) => {
    await buildUmd({
      analyzerUmd: otherOptions.analyzerUmd,
      outDirUmd: otherOptions.outDirUmd,
      entry: otherOptions.entry,
      outputName: otherOptions.outputName,
    });
    next();
  },
  [COPY_LESS]: async (next, otherOptions) => {
    logger.info('copyLess ing...');
    await copyLess({
      outDirCjs: otherOptions.outDirCjs,
      entryDir: otherOptions.entryDir,
      mode: otherOptions.mode,
      outDirEsm: otherOptions.outDirEsm,
    });
    logger.success('copyLess computed');
    next();
  },
  [CJS]: async (next, otherOptions) => {
    logger.info('buildCJS ing...');
    await buildCjs({
      mode: otherOptions.mode,
      outDirCjs: otherOptions.outDirCjs,
      entryDir: otherOptions.entryDir,
    });
    logger.success('buildCJS computed');
    next();
  },
  [ESM]: async (next, otherOptions) => {
    logger.info('buildESM ing...');
    await buildEsm({
      mode: otherOptions.mode,
      outDirEsm: otherOptions.outDirEsm,
      entryDir: otherOptions.entryDir,
    });
    logger.success('buildESM computed');
    next();
  },
};

const buildLib = async ({
  analyzerUmd,
  mode,
  entry,
  outDirEsm,
  outDirCjs,
  outDirUmd,
  copyLess,
  entryDir,
  less2Css,
  cleanDir,
  outputName,
}) => {
  const buildProcess = [];
  if (mode === UMD) {
    buildProcess.push(bulidLibFns[UMD]);
  }
  if (mode === ESM) {
    buildProcess.push(bulidLibFns[ESM]);
  }
  if (mode === CJS) {
    buildProcess.push(bulidLibFns[CJS]);
  }
  if (less2Css) {
    less2Css = LESS_2_CSS;
    buildProcess.push(bulidLibFns[LESS_2_CSS]);
  }
  if (copyLess) {
    copyLess = COPY_LESS;
    buildProcess.push(bulidLibFns[COPY_LESS]);
  }
  compose(buildProcess, {
    analyzerUmd,
    mode,
    entry,
    outDirEsm,
    outDirCjs,
    outDirUmd,
    copyLess,
    entryDir,
    less2Css,
    cleanDir,
    outputName,
  });
};

export default buildLib;
