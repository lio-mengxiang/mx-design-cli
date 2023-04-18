import { after } from '../../../utils/after';
import type { AnyFunction } from '../../../interface';

export const getLessRule = (afterFn?: AnyFunction) =>
  after(function _() {
    return {
      test: /\.(less)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: {
              localIdentName: '[local]-[hash:5]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
            ],
          },
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    };
  }, afterFn);
