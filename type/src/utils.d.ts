import { Configuration } from 'webpack';
export declare const syncChainFns: (...fns: any[]) => (...args: any[]) => any;
export declare const getProjectPath: (dir?: string) => string;
export declare const isAddForkTsPlugin: (config: any) => any;
export interface CustomConfig extends Configuration {
    entries: object;
    banner: string;
    setBabelOptions: (options: string | {
        [index: string]: any;
    }) => void;
    setRules: (rules: Configuration['module']['rules']) => void;
    setPlugins: (plugins: Configuration['plugins']) => void;
    setDevOptions: Record<string, any>;
    setOutput: (outputConfig: any) => void;
    setConfig: (config: any) => void;
}
export declare const getCustomConfig: (configFileName?: string) => Partial<CustomConfig>;
export declare function getProjectConfig(config: Configuration): Configuration;
export declare const logger: {
    success: (...msg: string[]) => void;
    error: (...msg: string[]) => void;
    warn: (...msg: string[]) => void;
    info: (...msg: string[]) => void;
    log: (...msg: string[]) => void;
};
export declare const run: (command: string, info: string) => Promise<void>;
export declare function compose(middleware: any, initOptions: any): void;
export declare function getJSON(path: any): any;
