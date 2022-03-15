import gulp from "gulp";
import babel from "gulp-babel";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";
import cssnano from "gulp-cssnano";
import through2 from "through2";
import babelEsConfig from "./babelConfig/es";
import babelCjsConfig from "./babelConfig/lib";
import { getProjectPath } from "../utils";
import { CJS, ESM, LIB } from "../constants";

const paths = {
  dest: {
    lib: getProjectPath(LIB),
    esm: getProjectPath(ESM),
  },
  styles: (path) => getProjectPath(`${path}/**/*.less`),
  scripts: (path) => [
    getProjectPath(`${path}/**/*.{ts,tsx,js,jsx}`),
    getProjectPath(`!${path}/**/__tests__/*.{ts,tsx,js,jsx}`),
  ],
};

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, ".css");
}

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 * @param {string} newEntryDir 入口目录
 */
function compileScripts(mode, destDir, newEntryDir) {
  const { scripts } = paths;
  return gulp
    .src(scripts(newEntryDir))
    .pipe(babel(mode === ESM ? babelEsConfig : babelCjsConfig)) // 使用gulp-babel处理
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 处理文件内容
          file.path = file.path.replace(/index\.js/, "css.js"); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      })
    )
    .pipe(gulp.dest(destDir));
}

const copyLess = ({ entryDir, outDirCjs, outDirEsm, mode }) => {
  const newEntryDir = getNewEntryDir(entryDir);
  /**
   * 拷贝less文件
   */
  gulp.task("copyLess", () => {
    const source = gulp.src(paths.styles(newEntryDir));
    if (mode === CJS) {
      source.pipe(gulp.dest(outDirCjs));
    }
    if (mode === ESM) {
      source.pipe(gulp.dest(outDirEsm));
    }
    return source;
  });

  return new Promise((res) => {
    return gulp.series("copyLess", () => {
      res(true);
    })();
  });
};

const getNewEntryDir = (entryDir) =>
  entryDir?.[entryDir.length - 1] === "/"
    ? entryDir.slice(0, entryDir.length - 1)
    : entryDir;

const less2css = ({ entryDir, outDirCjs, outDirEsm, mode }) => {
  const newEntryDir = getNewEntryDir(entryDir);
  /**
   * 生成css文件
   */
  gulp.task("less2css", () => {
    const source = gulp
      .src(paths.styles(newEntryDir))
      .pipe(less()) // 处理less文件
      .pipe(autoprefixer()) // 根据browserslistrc增加前缀
      .pipe(cssnano({ zindex: false, reduceIdents: false })); // 压缩
    if (mode === CJS) {
      source.pipe(gulp.dest(outDirCjs));
    }
    if (mode === ESM) {
      source.pipe(gulp.dest(outDirEsm));
    }
    return source;
  });

  return new Promise((res) => {
    return gulp.series("less2css", () => {
      res(true);
    })();
  });
};
const buildCjs = ({ mode, outDirCjs, entryDir }) => {
  const newEntryDir = getNewEntryDir(entryDir);
  /**
   * 编译cjs
   */
  gulp.task("compileCJS", () => {
    return compileScripts(mode, outDirCjs, newEntryDir);
  });

  return new Promise((res) => {
    return gulp.series("compileCJS", () => {
      res(true);
    })();
  });
};

const buildEsm = ({ mode, outDirEsm, entryDir }) => {
  const newEntryDir = getNewEntryDir(entryDir);
  /**
   * 编译esm
   */
  gulp.task("compileESM", () => {
    return compileScripts(mode, outDirEsm, newEntryDir);
  });

  return new Promise((res) => {
    return gulp.series("compileESM", () => {
      res(true);
    })();
  });
};

export { copyLess, less2css, buildCjs, buildEsm };
