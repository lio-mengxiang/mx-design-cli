import type { AnyFunction } from '../../../interface';
import { after } from '../../../utils/after';

export const getCssRule = (afterFn?: AnyFunction) =>
  after(function _() {
    return {
      test: /\.(css)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
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
      ],
    };
  }, afterFn);
