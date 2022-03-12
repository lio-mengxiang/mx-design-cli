import path from "path";
import fs from "fs";
import { Configuration, RuleSetRule } from "webpack";
import webpackMerge from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import chalk from "chalk";
import util from "util";
import child_process from "child_process";

export interface FileInfo {
  filePath?: string;
  type?: string;
}

// 同步函数链
export const syncChainFns = (...fns) => {
  const [firstFn, ...otherFns] = fns;
  return (...args) => {
    if (!otherFns) return firstFn(...args);
    return otherFns.reduce((ret, task) => task(ret), firstFn(...args));
  };
};

export const isAddForkTsPlugin = (config) => {
  if (fs.existsSync(getProjectPath("tsconfig.json"))) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }
  return config;
};

// 获取项目文件
export const getProjectPath = (dir = "./"): string => {
  return path.join(process.cwd(), dir);
};

export interface CustomConfig extends Configuration {
  entries: object;
  banner: string;
  setBabelOptions: (options: string | { [index: string]: any }) => void;
  setRules: (rules: Configuration["module"]["rules"]) => void;
  setPlugins: (plugins: Configuration["plugins"]) => void;
}

// 获取项目文件
export const getCustomConfig = (
  configFileName = "mx.config.js"
): Partial<CustomConfig> => {
  const configPath = path.join(process.cwd(), configFileName);
  if (fs.existsSync(configPath)) {
    return require(configPath);
  }
  return {};
};

export function getProjectConfig(config: Configuration): Configuration {
  const {
    entries,
    setBabelOptions,
    banner,
    setRules,
    setPlugins,
    ...webpackConfig
  } = getCustomConfig();

  config.entry = {};
  config.plugins = config.plugins || [];
  setBabelOptions?.((config.module.rules[0] as RuleSetRule).use[1].options);
  setRules?.(config.module.rules);
  setPlugins?.(config.plugins);

  Object.keys(entries || {}).forEach((key) => {
    if (entries[key].entry) {
      config.entry[key] = entries[key].entry;
    }
    const htmlWebpackPlugin = new HtmlWebpackPlugin({
      template: entries[key].template,
      filename: `${key}.html`,
      chunks: ["manifest", key],
      favicon: entries[key].favicon,
      inject: entries[key].inject !== false,
      minify: false,
    });

    config.plugins.push(htmlWebpackPlugin);
  });

  return webpackMerge(config, webpackConfig);
}

function noop(msg: string): string {
  return msg;
}

function log(fn: Function) {
  return (...msg: string[]): void => {
    console.log(fn(msg));
  };
}

export const logger = {
  success: log(chalk.green),
  error: log(chalk.red),
  warn: log(chalk.yellow),
  info: log(chalk.cyan),
  log: log(noop),
};

const exec = util.promisify(child_process.exec);

export const run = async (command: string) => {
  logger.info(command);
  await exec(command);
};
