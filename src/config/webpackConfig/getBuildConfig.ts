import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackMerge from 'webpack-merge';
import { Configuration, RuleSetUseItem } from 'webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'; // 压缩css插件
import TerserPlugin from 'terser-webpack-plugin'; // 压缩代码
import { getBaseConfig } from './baseConfig';
import { getRule } from './rules';

export const getBuildConfig = (): Configuration => {
  const getBuildRule = getRule({
    afterLessRule: (rule) => {
      (rule.use as RuleSetUseItem[]).unshift({
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      });
    },
    afterCssRule: (rule) => {
      (rule.use as RuleSetUseItem[]).unshift({
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      });
    },
  });

  const config: Configuration = webpackMerge({}, getBaseConfig(getBuildRule), {
    mode: 'production',
    devtool: 'hidden-source-map',
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
      publicPath: '/',
    },
  });

  config.optimization.minimizer = [
    // 压缩js文件
    new TerserPlugin({
      // 开启“多线程”，提高压缩效率
      parallel: true,
      exclude: /node_modules/,
      extractComments: false,
    }),
    // 压缩css插件
    new CssMinimizerPlugin({
      minimizerOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
          },
        ],
      },
    }),
  ];
  return config;
};
