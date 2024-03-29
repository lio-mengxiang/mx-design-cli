import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpackMerge from 'webpack-merge';
import webpack, { Configuration, RuleSetUseItem } from 'webpack';
import { getBaseConfig } from './baseConfig';
import { getRule } from './rules';

export const getDevConfig = (): Configuration => {
  const getDevRule = getRule({
    afterJsTsRule: (rule) => {
      rule.use[1].options.plugins.push(require.resolve('react-refresh/babel'));
    },
    afterLessRule: (rule) => {
      (rule.use as RuleSetUseItem[]).unshift('style-loader');
    },
    afterCssRule: (rule) => {
      (rule.use as RuleSetUseItem[]).unshift('style-loader');
    },
  });

  const config = webpackMerge({}, getBaseConfig(getDevRule, true), {
    mode: 'development',
    devtool: 'source-map',
    output: {
      publicPath: '/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshPlugin(),
    ],
    optimization: {
      minimize: false,
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
  });

  return config;
};
