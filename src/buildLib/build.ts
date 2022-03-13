import webpack from "webpack";
import webpackMerge from "webpack-merge";
import buildEsmCjsLess from "../config/gulpConfig";
import getWebpackConfig from "../config/webpackConfig";
import { getProjectPath, getCustomConfig, logger } from "../utils";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BUILD_LIB } from "../constants";

const { name } = require(getProjectPath("package.json"));

const buildEsmCjsLessAsync = async ({
  outDirLib,
  outDirEsm,
  entryDir,
  mode,
}) => {
  logger.info("building EsmCjsLess");
  await buildEsmCjsLess({ outDirLib, entryDir, mode, outDirEsm });
  logger.success("EsmCjsLess computed");
};

/**
 * build for umd
 * @param analyzer 是否启用分析包插件
 * @param outDirUmd 输出目录
 * @param entry 打包的入口文件
 */
const buldUmd = async ({ analyzerUmd, outDirUmd, entry }) => {
  const customizePlugins = [];
  const { banner } = getCustomConfig();

  banner && customizePlugins.push(new webpack.BannerPlugin(banner));

  const umdTask = (type) => {
    return new Promise((resolve, reject) => {
      const config = webpackMerge(getWebpackConfig(type), {
        entry: {
          [name]: getProjectPath(entry),
        },
        output: {
          path: getProjectPath(outDirUmd),
          library: name,
        },
        plugins: customizePlugins,
      });

      if (analyzerUmd) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            generateStatsFile: true,
          })
        );
      }

      return webpack(config).run((err, stats) => {
        if (err) {
          logger.error("webpackError: ", JSON.stringify(err));
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });
  };
  logger.info("building umd");
  await umdTask(BUILD_LIB);
  logger.success("umd computed");
};

const buildLib = async ({
  analyzerUmd,
  mode,
  entry,
  outDirEsm,
  outDirLib,
  outDirUmd,
  entryDir,
}) => {
  if (mode === "umd") {
    await buldUmd({ analyzerUmd, outDirUmd, entry });
  } else if (mode === "esm" || mode === "cjs") {
    await buildEsmCjsLessAsync({ outDirLib, outDirEsm, entryDir, mode });
  }
};

export default buildLib;
