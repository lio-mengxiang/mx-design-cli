import webpack from "webpack";
import webpackMerge from "webpack-merge";
import buildEsmCjsLess from "../config/gulpConfig";
import getWebpackConfig from "../config/webpackConfig";
import { getProjectPath, getCustomConfig, logger } from "../utils";
import { BUILD_LIB } from "../constants";

const { name } = require(getProjectPath("package.json"));

const buildEsmCjsLessAsync = async () => {
  logger.info("building EsmCjsLess");
  await buildEsmCjsLess();
  logger.success("EsmCjsLess computed");
};

// build for umd
const buldUmd = async () => {
  const customizePlugins = [];
  const { banner } = getCustomConfig();

  banner && customizePlugins.push(new webpack.BannerPlugin(banner));

  const umdTask = (type) => {
    return new Promise((resolve, reject) => {
      const config = webpackMerge(getWebpackConfig(type), {
        entry: {
          [name]: getProjectPath("./src/index"),
        },
        output: {
          path: getProjectPath("./dist"),
          library: name,
        },
        plugins: customizePlugins,
      });

      return webpack(config).run((err, stats) => {
        return err ? reject(err) : resolve(stats);
      });
    });
  };
  logger.info("building umd");
  await umdTask(BUILD_LIB);
  logger.success("umd computed");
};

const buildLib = async () => {
  await buldUmd();
  await buildEsmCjsLessAsync();
};

export default buildLib;
