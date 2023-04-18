import webpack, { Configuration, RuleSetRule } from 'webpack';
import WebpackBar from 'webpackbar';

export function getBaseConfig(getRule: RuleSetRule[]): Configuration {
  return {
    target: 'web',
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
      assetModuleFilename: 'asset/[name].[contenthash:8].[ext]',
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        minChunks: 2,
        chunks: 'all',
        cacheGroups: {
          reactBase: {
            name: 'reactBase',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|@hot-loader|react-router|react-redux|react-router-dom)[\\/]/,
          },
          'async-commons': {
            // 异步加载公共包、组件等
            name: 'async-commons',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            priority: 1,
          },
        },
      },
    },
    module: {
      rules: getRule,
    },
    resolve: {
      extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.less', '.svg'],
    },
    plugins: [
      new WebpackBar({}),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
}
