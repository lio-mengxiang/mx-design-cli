import gulp from "gulp";
import babel from "gulp-babel";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";
import cssnano from "gulp-cssnano";
import through2 from "through2";
import babelEsConfig from "./babelConfig/es";
import babelCjsConfig from "./babelConfig/lib";
import { getProjectPath } from "../utils";

const paths = {
  dest: {
    lib: getProjectPath("lib"),
    esm: getProjectPath("esm"),
  },
  styles: getProjectPath("src/**/*.less"),
  scripts: [getProjectPath("src/**/*.{ts,tsx}"), getProjectPath("!src/**/__tests__/*.{ts,tsx}")],
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
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel(babelEnv === "esm" ? babelEsConfig : babelCjsConfig)) // 使用gulp-babel处理
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

/**
 * 编译cjs
 */
gulp.task('compileCJS', () => {
  const { dest } = paths;
  return compileScripts("cjs", dest.lib);
});

/**
 * 编译esm
 */
gulp.task('compileESM', () => {
  const { dest } = paths;
  return compileScripts("esm", dest.esm);
});

/**
 * 拷贝less文件
 */
gulp.task('copyLess', () => {
  return gulp
  .src(paths.styles)
  .pipe(gulp.dest(paths.dest.lib))
  .pipe(gulp.dest(paths.dest.esm));
});
/**
 * 生成css文件
 */
gulp.task('less2css', () => {
  return gulp
    .src(paths.styles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
});
const buildEsmCjsLess = (callBack?) => {
  // gulp.parallel('buildScripts', 'copyLess','less2css', () => {
  //   console.log(343);
  // })();
  return new Promise((res) => {
    return gulp.series(gulp.parallel('compileCJS', 'compileESM','copyLess','less2css'), () => {
      callBack?.()
      res(true);
    })();
  });
};

export default buildEsmCjsLess;
