// // 用于样式的通用 Rollup 插件：PostCSS、Sass、Less、Stylus 等
// import styles from 'rollup-plugin-styles';

// import postcss from 'rollup-plugin-postcss';

// // 分析包体积的工具
// import analyzer from 'rollup-plugin-analyzer';

// // 保留输出的树状结构，适合组件库
// import multiInput from 'rollup-plugin-multi-input';

// import { inputList, CJS, ESM, UMD, COPY_LESS, LESS_2_CSS } from '../constants';

// const cssConfig = {
//   input: ['src/**/style/index.js'],
//   plugins: [multiInput(), styles({ mode: 'extract' })],
//   output: {
//     banner,
//     dir: 'es/',
//     sourcemap: true,
//     assetFileNames: '[name].css',
//   },
// };

// // 按需加载组件 不带 css 样式
// const libConfig = {
//   input: inputList,
//   external: '**/node_modules/**',
//   plugins: [multiInput()].concat(getPlugins({ extractMultiCss: true })),
//   output: {
//     dir: 'lib/',
//     format: 'esm',
//     sourcemap: true,
//     chunkFileNames: '_chunks/dep-[hash].js',
//   },
// };

// // 按需加载组件 带 css 样式
// const esConfig = {
//   input: inputList.concat('!src/index-lib.ts'),
//   // 为了保留 style/css.js
//   treeshake: false,
//   external: externalDeps.concat(externalPeerDeps),
//   plugins: [multiInput()].concat(getPlugins({ extractMultiCss: true })),
//   output: {
//     dir: 'es/',
//     format: 'esm',
//     sourcemap: true,
//     chunkFileNames: '_chunks/dep-[hash].js',
//   },
// };

// // 按需加载组件 带原始 less 文件，可定制主题
// const esmConfig = {
//   input: inputList.concat('!src/index-lib.ts'),
//   // 为了保留 style/index.js
//   treeshake: false,
//   external: externalDeps.concat(externalPeerDeps),
//   plugins: [multiInput()].concat(getPlugins({ ignoreLess: false })),
//   output: {
//     banner,
//     dir: 'esm/',
//     format: 'esm',
//     sourcemap: true,
//     chunkFileNames: '_chunks/dep-[hash].js',
//   },
// };

// // commonjs 导出规范，不带 css 样式
// const cjsConfig = {
//   input: inputList,
//   external: externalDeps.concat(externalPeerDeps),
//   plugins: [multiInput()].concat(getPlugins()),
//   output: {
//     banner,
//     dir: 'cjs/',
//     format: 'cjs',
//     sourcemap: true,
//     exports: 'named',
//     chunkFileNames: '_chunks/dep-[hash].js',
//   },
// };

// const umdConfig = {
//   input,
//   external: externalPeerDeps,
//   plugins: getPlugins({
//     env: 'development',
//     extractOneCss: true,
//   }).concat(analyzer({ limit: 5, summaryOnly: true })),
//   output: {
//     name: 'TDesign',
//     banner,
//     format: 'umd',
//     exports: 'named',
//     globals: { react: 'React', lodash: '_' },
//     sourcemap: true,
//     file: `dist/${name}.js`,
//   },
// };

// const umdMinConfig = {
//   input,
//   external: externalPeerDeps,
//   plugins: getPlugins({
//     isProd: true,
//     extractOneCss: true,
//     env: 'production',
//   }),
//   output: {
//     name: 'TDesign',
//     banner,
//     format: 'umd',
//     exports: 'named',
//     globals: { react: 'React', lodash: '_' },
//     sourcemap: true,
//     file: `dist/${name}.min.js`,
//   },
// };

// // export default [cssConfig, libConfig, cjsConfig, esConfig, esmConfig, umdConfig, umdMinConfig, resetCss];
// export default [libConfig];
