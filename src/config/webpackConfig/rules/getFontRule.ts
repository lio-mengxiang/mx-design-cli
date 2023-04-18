import { after } from '../../../utils/after';
import type { AnyFunction } from '../../../interface';

export const getFontRule = (afterFn?: AnyFunction) =>
  after(function _() {
    return {
      test: /\.(eot|ttf|woff|woff2?)$/,
      type: 'asset/resource',
    };
  }, afterFn);
