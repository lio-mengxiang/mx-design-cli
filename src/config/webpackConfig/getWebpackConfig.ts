import { Configuration } from 'webpack';
import { DEV, BUILD_LIB, BUILD_SITE } from '../../constants';
import { IWebpackConfigType } from '../../interface';
import { getDevConfig } from './getDevConfig';
import { getBuildConfig } from './getBuildConfig';

export const getWebpackConfig = (type?: IWebpackConfigType): Configuration => {
  switch (type) {
    case DEV:
      return getDevConfig();

    case BUILD_SITE:
      return getBuildConfig();

    case BUILD_LIB:
      return getBuildConfig();

    default:
      return getDevConfig();
  }
};
