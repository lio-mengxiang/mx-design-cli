import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackMerge from 'webpack-merge';
import { Configuration, RuleSetUseItem } from 'webpack';
import { getBaseConfig } from './baseConfig';
import { getRule } from './rules';

export const getUmdConfig = (isUgly: boolean): Configuration => {
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

  const config: Configuration = webpackMerge(
    {},
    getBaseConfig(getBuildRule, false),
    {
      mode: isUgly ? 'production' : 'development',
      devtool: 'hidden-source-map',
      output: {
        libraryTarget: 'umd',
        filename: isUgly ? '[name].min.js' : '[name].js',
      },
      externals: {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: isUgly ? '[name].min.css' : '[name].css',
        }),
      ],
    }
  );

  return config;
};
