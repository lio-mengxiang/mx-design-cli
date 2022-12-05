// // import test from './test.png'构建会报错，因为 js 解析引擎无法解析 .png 格式的文件
// // 所以需要这个插件将文件作为数据 URI 或 ES 模块导入
// import url from '@rollup/plugin-url';
// // 支持直接导入json
// import json from '@rollup/plugin-json';
// // 与babel的继承，做代码转换
// import babel from '@rollup/plugin-babel';
// // 压缩js
// import terser from '@rollup/plugin-terser';
// // 支持commonjs导入
// import commonjs from '@rollup/plugin-commonjs';
// // DEFAULT_EXTENSIONS 默认是：“.js”、“.jsx”、“.es6”、“.es”、“.mjs”
// import { DEFAULT_EXTENSIONS } from '@babel/core';
// // 结合使用ESBuild和Rollup来转换ESNext和TypeScript代码
// import esbuild from 'rollup-plugin-esbuild';
// // 替换打包中遇到的变量，比如代码里写了process.env.NODE_ENV, 可以替换为你想要的值
// import replace from '@rollup/plugin-replace';
// // 以node的方式引入文件，比如默认是文件夹的index.js这种功能
// import nodeResolve from '@rollup/plugin-node-resolve';
// // 用于在不修改的情况下复制导入文件的 Rollup 插件。它基本上是一个复制插件
// import staticImport from 'rollup-plugin-static-import';
// import ignoreImport from 'rollup-plugin-ignore-import';
// import postcss from 'rollup-plugin-postcss';
// import { resolve } from 'path';
// import { UMD } from 'src/constants';

// // type IGetRollUpPlugins = ()

// function getRollUpPlugins({
//   env = undefined,
//   isProd = false,
//   ignoreLess = true,
//   extractOneCss = false,
//   extractMultiCss = false,
//   defineValues = {},
//   mode,
// }) {
//   const plugins = [
//     nodeResolve(),
//     commonjs(),
//     esbuild({
//       target: 'esnext',
//       minify: false,
//       jsx: 'transform',
//       jsxFactory: 'React.createElement',
//       jsxFragment: 'React.Fragment',
//       tsconfig: resolve(__dirname, '../../rollup.tsconfig.json'),
//     }),
//     babel({
//       // 如果你要用rollup构建一个js包的时候，使用该配置，该配置要结合@babel/plugin-transform-runtime插件使用
//       // 抽离公共的babel转译的工具函数
//       babelHelpers: 'runtime',
//       skipPreflightCheck: true,
//       extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
//       exclude: mode !== UMD ? '**/node_modules/**' : null,
//     }),
//     json(),
//     url(),
//     replace({
//       preventAssignment: true,
//       ...defineValues,
//     }),
//   ];

//   // css
//   if (extractOneCss) {
//     plugins.push(
//       postcss({
//         extract: `${isProd ? `${name}.min` : name}.css`,
//         minimize: isProd,
//         sourceMap: true,
//         extensions: ['.sass', '.scss', '.css', '.less'],
//       })
//     );
//   } else if (extractMultiCss) {
//     plugins.push(
//       staticImport({
//         include: ['src/**/style/css.js'],
//       }),
//       ignoreImport({
//         include: ['src/*/style/*', 'src/*/*/style/*'],
//         body: 'import "./css.js";',
//       })
//     );
//   } else if (ignoreLess) {
//     plugins.push(ignoreImport({ extensions: ['*.less'] }));
//   } else {
//     // plugins.push(
//     //   staticImport({
//     //     include: ['src/**/style/index.js', 'src/_common/style/web/**/*.less'],
//     //   }),
//     //   ignoreImport({
//     //     include: ['src/*/style/*'],
//     //     body: 'import "./index.js";',
//     //   })
//     // );
//   }

//   if (env) {
//     plugins.push(
//       replace({
//         preventAssignment: true,
//         values: {
//           'process.env.NODE_ENV': JSON.stringify(env),
//         },
//       })
//     );
//   }

//   if (isProd) {
//     plugins.push(
//       terser({
//         output: {
//           /* eslint-disable */
//           ascii_only: true,
//           /* eslint-enable */
//         },
//       })
//     );
//   }

//   return plugins;
// }

// export default getRollUpPlugins;
