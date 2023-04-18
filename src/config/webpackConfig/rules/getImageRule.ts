import { after } from '../../../utils/after';
import type { AnyFunction } from '../../../interface';

export const getImageRule = (afterFn?: AnyFunction) =>
  after(function _() {
    return {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024,
        },
      },
    };
  }, afterFn);
