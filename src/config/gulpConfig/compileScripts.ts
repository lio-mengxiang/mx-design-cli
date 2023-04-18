import gulp from 'gulp';
import babel from 'gulp-babel';
import through2 from 'through2';
import { indexToCssReg, paths } from './constants';
import babelEsConfig from '../babelConfig/es';
import babelCjsConfig from '../babelConfig/lib';
import { ESM } from '../../constants';
import { cssInjection } from './cssInjection';

export async function compileScripts(mode, destDir, newEntryDir) {
  return new Promise((resolve, reject) => {
    const { scripts } = paths;
    const source = gulp
      .src(scripts(newEntryDir))
      .pipe(babel(mode === ESM ? babelEsConfig : babelCjsConfig))
      .pipe(
        through2.obj(function z(file, encoding, next) {
          this.push(file.clone());
          if (file.path.match(indexToCssReg)) {
            const content = file.contents.toString(encoding);
            file.contents = Buffer.from(cssInjection(content));
            file.path = file.path.replace(/index\.js/, 'css.js');
            this.push(file);
            next();
          } else {
            next();
          }
        })
      )
      .pipe(gulp.dest(destDir));
    source.on('end', resolve);
    source.on('error', reject);
  });
}
