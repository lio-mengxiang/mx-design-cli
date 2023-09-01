import { Configuration } from 'webpack';
import { DEV, BUILD_LIB, BUILD_SITE, UMD, UMD_UGLY } from '../../constants';
import { IWebpackConfigType } from '../../interface';
import { getDevConfig } from './getDevConfig';
import { getBuildConfig } from './getBuildConfig';
import { getUmdConfig } from './getUmdConfig';

export const getWebpackConfig = (type?: IWebpackConfigType): Configuration => {
  switch (type) {
    case DEV:
      return getDevConfig();

    case BUILD_SITE:
      return getBuildConfig();

    case BUILD_LIB:
      return getBuildConfig();

    case UMD:
      return getUmdConfig(false);

    case UMD_UGLY:
      return getUmdConfig(true);

    default:
      return getDevConfig();
  }
};
