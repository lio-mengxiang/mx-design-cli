import gulp from 'gulp';
import { getNewEntryDir } from './getNewEntryDir';
import { CJS, ESM } from '../../constants';
import { paths } from './constants';

export const copyLessMid = async ({ entryDir, outDirCjs, outDirEsm, mode }) => {
  return new Promise((resolve, reject) => {
    const newEntryDir = getNewEntryDir(entryDir);
    const source = gulp.src(paths.styles(newEntryDir));
    if (mode === CJS) {
      source.pipe(gulp.dest(outDirCjs));
    }
    if (mode === ESM) {
      source.pipe(gulp.dest(outDirEsm));
    }
    source.on('end', resolve);
    source.on('error', reject);
  });
};
