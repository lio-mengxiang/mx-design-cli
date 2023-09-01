/* eslint-disable no-unused-vars */
import { Configuration } from 'webpack';
import { BUILD_LIB, BUILD_SITE, DEV, UMD, UMD_UGLY } from './constants';

export interface IDevelopmentConfig {
  host: string;
  port: number;
}

export type IWebpackConfigType =
  | typeof BUILD_LIB
  | typeof DEV
  | typeof BUILD_SITE
  | typeof UMD
  | typeof UMD_UGLY;

export interface IDeployConfig {
  outDir: string;
  pushGh: boolean;
  analyzer: boolean;
}

export interface ITestConfig {
  updateSnapshot: boolean;
  coverage: boolean;
  setupFilesAfterEnv: string;
  watch?: boolean;
}

export interface CustomConfig extends Configuration {
  entries: object;
  banner: string;
  setBabelOptions: (options: string | { [index: string]: any }) => void;
  setRules: (rules: Configuration['module']['rules']) => void;
  setPlugins: (plugins: Configuration['plugins']) => void;
  setDevOptions: Record<string, any>;
  setOutput: (outputConfig: any) => void;
  setConfig: (config: any) => void;
}

export type AnyFunction = (...args: any[]) => any;
