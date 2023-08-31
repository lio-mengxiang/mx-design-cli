import { withOra } from '@mx-design/node-utils';
import { compose } from '../utils/compose';
import {
  copyLessMid,
  less2css,
  buildCjs,
  buildEsm,
} from '../config/gulpConfig';
import { CJS, ESM, UMD, COPY_LESS, LESS_2_CSS } from '../constants';
import { buildUmd } from './buildUmd';

const buildLib = async ({
  analyzerUmd,
  mode,
  entry,
  outDirEsm,
  outDirCjs,
  outDirUmd,
  copyLess,
  entryDir,
  less2Css,
  cleanDir,
  outputName,
}) => {
  const buildProcess = [];
  if (mode === UMD) {
    buildProcess.push(async (next, otherOptions) => {
      await buildUmd({
        analyzerUmd: otherOptions.analyzerUmd,
        outDirUmd: otherOptions.outDirUmd,
        entry: otherOptions.entry,
        outputName: otherOptions.outputName,
      });
      next();
    });
  }
  if (mode === ESM) {
    buildProcess.push(async (next, otherOptions) => {
      await withOra(
        () =>
          buildEsm({
            mode: otherOptions.mode,
            outDirEsm: otherOptions.outDirEsm,
            entryDir: otherOptions.entryDir,
          }),
        {
          text: 'buildEsm ing...',
          successText: 'buildEsm success',
          failText: 'buildEsm failed',
        }
      );
      next();
    });
  }
  if (mode === CJS) {
    buildProcess.push(async (next, otherOptions) => {
      await withOra(
        () =>
          buildCjs({
            mode: otherOptions.mode,
            outDirCjs: otherOptions.outDirCjs,
            entryDir: otherOptions.entryDir,
          }),
        {
          text: 'buildCjs ing...',
          successText: 'buildCjs success',
          failText: 'buildCjs failed',
        }
      );
      next();
    });
  }
  if (less2Css) {
    less2Css = LESS_2_CSS;
    buildProcess.push(async (next, otherOptions) => {
      await withOra(
        () =>
          less2css({
            outDirCjs: otherOptions.outDirCjs,
            entryDir: otherOptions.entryDir,
            mode: otherOptions.mode,
            outDirEsm: otherOptions.outDirEsm,
          }),
        {
          text: 'less2Css ing...',
          successText: 'copyLess success',
          failText: 'less2css failed',
        }
      );
      next();
    });
  }
  if (copyLess) {
    copyLess = COPY_LESS;
    buildProcess.push(async (next, otherOptions) => {
      await withOra(
        () =>
          copyLessMid({
            outDirCjs: otherOptions.outDirCjs,
            entryDir: otherOptions.entryDir,
            mode: otherOptions.mode,
            outDirEsm: otherOptions.outDirEsm,
          }),
        {
          text: 'copyLess ing..',
          successText: 'copyLess success',
          failText: 'copyLess failed',
        }
      );
      next();
    });
  }

  compose(buildProcess, {
    analyzerUmd,
    mode,
    entry,
    outDirEsm,
    outDirCjs,
    outDirUmd,
    copyLess,
    entryDir,
    less2Css,
    cleanDir,
    outputName,
  });
};

export default buildLib;
