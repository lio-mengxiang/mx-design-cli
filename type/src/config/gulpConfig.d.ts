declare const copyLess: ({ entryDir, outDirCjs, outDirEsm, mode }: {
    entryDir: any;
    outDirCjs: any;
    outDirEsm: any;
    mode: any;
}) => Promise<unknown>;
declare const less2css: ({ entryDir, outDirCjs, outDirEsm, mode }: {
    entryDir: any;
    outDirCjs: any;
    outDirEsm: any;
    mode: any;
}) => Promise<unknown>;
declare const buildCjs: ({ mode, outDirCjs, entryDir }: {
    mode: any;
    outDirCjs: any;
    entryDir: any;
}) => Promise<unknown>;
declare const buildEsm: ({ mode, outDirEsm, entryDir }: {
    mode: any;
    outDirEsm: any;
    entryDir: any;
}) => Promise<unknown>;
export { copyLess, less2css, buildCjs, buildEsm };
