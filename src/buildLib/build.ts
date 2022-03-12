import webpack from "webpack";
import webpackMerge from "webpack-merge";
import buildEsmCjsLess from "../config/gulpConfig";
import getWebpackConfig from "../config/webpackConfig";
import { getProjectPath, getCustomConfig, logger } from "../utils";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BUILD_LIB } from "../constants";

const { name } = require(getProjectPath("package.json"));

const buildEsmCjsLessAsync = async ({ outDir, entry }) => {
  logger.info("building EsmCjsLess");
  await buildEsmCjsLess({ outDir, entry });
  logger.success("EsmCjsLess computed");
};

// build for umd
const buldUmd = async ({ analyzer, outDir, entry }) => {
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
          path: getProjectPath(outDir),
          library: name,
        },
        plugins: customizePlugins,
      });

      if (analyzer) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            generateStatsFile: true,
          })
        );
      }

      return webpack(config).run((err, stats) => {
        return err ? reject(err) : resolve(stats);
      });
    });
  };
  logger.info("building umd");
  await umdTask(BUILD_LIB);
  logger.success("umd computed");
};

const buildLib = async ({ analyzer, mode, entry, outDir }) => {
  if (mode === "umd") {
    return await buldUmd({ analyzer, outDir, entry });
  } else {
    await buldUmd({ analyzer, outDir, entry });
    await buildEsmCjsLessAsync({ outDir, entry });
  }
};

export default buildLib;
