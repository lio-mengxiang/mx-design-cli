import { Configuration } from 'webpack';
import { IWebpackConfigType } from '../interface';
export declare const getBuildConfig: () => Configuration;
declare const getWebpackConfig: (type?: IWebpackConfigType) => Configuration;
export default getWebpackConfig;
