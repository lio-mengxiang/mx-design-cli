import { after } from '../../../utils/after';
import type { AnyFunction } from '../../../interface';

export const getSvgRule = (afterFn?: AnyFunction) =>
  after(function _() {
    return {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      exclude: /node_modules/,
    };
  }, afterFn);
