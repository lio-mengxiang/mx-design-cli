import path from 'path';
import fs from 'fs';
import { Configuration, RuleSetRule } from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import chalk from 'chalk';
import util from 'util';
import child_process from 'child_process';

// 同步函数链
export const syncChainFns = (...fns) => {
  const [firstFn, ...otherFns] = fns;
  return (...args) => {
    if (!otherFns) return firstFn(...args);
    return otherFns.reduce((ret, task) => task(ret), firstFn(...args));
  };
};

// 获取项目文件
export const getProjectPath = (dir = './'): string => {
  return path.join(process.cwd(), dir);
};

export const isAddForkTsPlugin = (config) => {
  if (fs.existsSync(getProjectPath('tsconfig.json'))) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }
  return config;
};

export interface CustomConfig extends Configuration {
  entries: object;
  banner: string;
  // eslint-disable-next-line no-unused-vars
  setBabelOptions: (options: string | { [index: string]: any }) => void;
  // eslint-disable-next-line no-unused-vars
  setRules: (rules: Configuration['module']['rules']) => void;
  // eslint-disable-next-line no-unused-vars
  setPlugins: (plugins: Configuration['plugins']) => void;
  setDevOptions: Record<string, any>;
  // eslint-disable-next-line no-unused-vars
  setOutput: (outputConfig: any) => void;
  // eslint-disable-next-line no-unused-vars
  setConfig: (config: any) => void;
}

// 获取项目文件
export const getCustomConfig = (
  configFileName = 'mx.config.js'
): Partial<CustomConfig> => {
  const configPath = path.join(process.cwd(), configFileName);
  if (fs.existsSync(configPath)) {
    return require(configPath);
  }
  return {};
};

// 获取项目文件
export const getViteConfig = (configFileName = 'mx.vite.config.js') => {
  const configPath = path.join(process.cwd(), configFileName);
  if (fs.existsSync(configPath)) {
    return configPath;
  }
  return null;
};

export function getProjectConfig(config: Configuration): Configuration {
  const {
    entries,
    setBabelOptions,
    banner,
    setRules,
    setPlugins,
    setDevOptions,
    setOutput,
    setConfig,
    ...webpackConfig
  } = getCustomConfig();

  config.entry = {};
  config.plugins = config.plugins || [];
  setOutput?.(config.output);
  setBabelOptions?.((config.module.rules[0] as RuleSetRule).use[1].options);
  setRules?.(config.module.rules);
  setPlugins?.(config.plugins);
  setConfig?.(config);

  Object.keys(entries || {}).forEach((key) => {
    if (entries[key].entry) {
      config.entry[key] = entries[key].entry;
    }
    const htmlWebpackPlugin = new HtmlWebpackPlugin({
      template: entries[key].template,
      filename: `${key}.html`,
      chunks: ['manifest', key],
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

export const run = async (command: string, info: string) => {
  logger.info(info || command);
  await exec(command);
};

export function compose(middleware, initOptions) {
  const otherOptions = initOptions || {};
  function dispatch(index) {
    if (index === middleware.length) return;
    const currMiddleware = middleware[index];
    return currMiddleware(() => dispatch(++index), otherOptions);
  }
  dispatch(0);
}
