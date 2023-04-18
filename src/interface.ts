/* eslint-disable no-unused-vars */
import { Configuration } from 'webpack';

export interface IDevelopmentConfig {
  host: string;
  port: number;
}

export type IWebpackConfigType = 'buildLib' | 'dev' | 'buildSite';

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
