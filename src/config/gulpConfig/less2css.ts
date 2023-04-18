import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import less from 'gulp-less';
import { getNewEntryDir } from './getNewEntryDir';
import { paths } from './constants';
import { CJS, ESM } from '../../constants';

export const less2css = async ({ entryDir, outDirCjs, outDirEsm, mode }) => {
  return new Promise((resolve, reject) => {
    const newEntryDir = getNewEntryDir(entryDir);

    const source = gulp
      .src(paths.styles(newEntryDir))
      .pipe(less())
      .pipe(autoprefixer());

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
