import { Configuration, RuleSetRule } from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getCustomConfig } from './getCustomConfig';

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
