import { getProjectPath } from '@mx-design/node-utils';
import { ESM, LIB } from '../../constants';

export const paths = {
  dest: {
    lib: getProjectPath(LIB),
    esm: getProjectPath(ESM),
  },
  styles: (path) => getProjectPath(`${path}/**/*.less`),
  scripts: (path) => [
    getProjectPath(`${path}/**/*.{ts,tsx,js,jsx}`),
    getProjectPath(`!${path}/**/__tests__/*.{ts,tsx,js,jsx}`),
  ],
};

export const indexToCssReg =
  /((\/|\\)style(\/|\\)index\.js|(\/|\\)color_style(\/|\\)index\.js|(\/|\\)token_style(\/|\\)index\.js|(\/|\\)base_style(\/|\\)index\.js)/;
