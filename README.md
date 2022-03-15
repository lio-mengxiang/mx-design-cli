<h1 align="center">@mx-design/cli</h1>

优点：

- [x] 可靠！目前单元测试覆盖率超越 70%，后续会继续增加覆盖率
- [x] 方便开发：一行命令启动 react + less 业务项目
- [x] 方便打包： 一行命令打包 react 业务项目，webpack5 打包，无需关注 webpack 配置和优化，我们帮你做了
- [x] 方便打包： 一行命令打包 react 组件库，打包方式等同 antdesign
- [x] 方便测试： 一行命令自动测试除了 node_modules 下，其他所有**test**目录的 js|jsx|ts|tsx 文件
- [x] 质量棒棒哒！整体代码质量较高（大部分代码符合 solid 原则），易于维护

## Project Description 项目简介

- Cli Tools for react web project and react components library
- 通过 @mx-deisgn/cli 可以快速启动开发环境，打包项目，测试项目（案例在 example 文件夹下）
</div>

## Install

use `npm`

```node
npm install @mx-design/cli --save-dev
```

or use `yarn`

```node
yarn add @mx-design/cli --dev
```

## Usage

```node
mx buildLib [options]    打包编译react组件库
mx dev [options]         运行开发环境
mx buildSite [options]   打包编译web项目
mx test [options]        测试react项目
mx --help                查看帮助信息
mx --version             查看版本信息
```

## 详细命令如下

在 package.json 的 devDependencies 中加入

```javascript
  "devDependencies": {
    + "@mx-design/cli": "1.0.0"
  }
```

在 package.json 的 devDependencies 中加入

```javascript
  "devDependencies": {
    + "@mx-design/cli": "1.0.0"
  }
```

开发环境配置

```javascript
  "scripts": {
    "start": "mx dev",
  },
```

为了实现 dev 环境自定义配置，我们还会读取你在根目录的 mx.config.js 文件，案例如下：

```javascript
// mx.config.js
const path = require('path');

module.exports = {
  // 自定义入口文件，必填
  entries: {
    index: {
      entry: ['./src/index.js'],
      template: './public/index.html',
      favicon: './favicon.ico',
    },
  // 别名配置，可省略
  resolve: {
    alias: {
      '@': path.join(process.cwd(), '/'),
    },
  },
  // 加入自定义Babel插件
  setBabelOptions: (options) => {
    options.plugins.push([
      'prismjs',
      {
        languages: ['javascript', 'typescript', 'jsx', 'tsx', 'css', 'scss', 'markup', 'bash'],
        theme: 'default',
        css: true,
      },
    ]);
  },
  // 加入自定义loader
  setRules: (rules) => {
    rules.push({
      test: /\.md$/,
      use: ['raw-loader'],
    });
  },
};

```

好了，这就配置好开发环境了，是不是很简单，目前我们用的 webpack5 启动开发环境，解放你的 webpack 配置问题。

build 业务代码更简单

```javascript
 "scripts": {
    "start": "mx buildSite",
  }
```

我们也会读取你根目录下 mx.config.js 文件配置，当然还有一些遍历的命令行选项，比如

```javascript
 "scripts": {
    "start": "mx buildSite --analyzer", // 启用包分析工具
  }

   "scripts": {
    "start": "mx buildSite --out-dir lib", // 打包后的地址目录默认是dist，这里改成了lib
  }
```

打包组件库命令行如下（以下是建议的配置，命令行输入 npm/yarn run build 即可）：

```javascript
 "scripts": {
   "build:types": "rimraf types && tsc --outDir types -d --emitDeclarationOnly",
    "build:es": "rimraf esm && mx buildLib --mode esm --entry-dir ./components --less-2-css --copy-less",
    "build:cjs": "rimraf lib && mx buildLib --mode cjs --entry-dir ./components --less-2-css --copy-less",
    "build:umd": "rimraf dist && mx buildLib --mode umd --entry ./components/index",
    "build": "yarn build:types && yarn build:cjs && yarn build:es && yarn build:umd",
  }
```

上面命令解释如下：

- `--mode cjs`
  - 表示打包 cjs 模式
- `--mode esm`
  - 表示打包 esm 模式
- `--mode umd`
  - 表示打包 umd 模式
- `--mode cjs`
  - 表示打包 cjs 模式
- `--less-2-css`
  - 表示将 less 转为 css
- `--entry-dir`
  - mode 是 esm 和 cjs 生效
  - 传入打包时入口目录 默认是 src
- `--entry`
  - umd 模式生效
  - umd 入口文件 默认是 src/index
- `--copy-less`
  - 复制 less 文件到
- `-out-dir-umd`
  - 在 mode 是 umd 模式生效
  - 输出 umd 格式的目录，默认是`./dist`
- `--out-dir-esm`
  - 输出 esm 格式的目录, 默认是`./esm`
- `--out-dir-cjs`
  - 输出 cjs 格式的目录，默认`./lib"`
- `--analyzerUmd`
  - 是否 webpack 打包启用分析器

test 测试更简单(jest 测试），自动测试**tests**文件夹下的 js，jsx，ts，tsx 结尾的文件。

```javascript
 "scripts": {
    "test": "mx test --watch", // 启用增量测试模式
  }
```

以上的命令所有详细参数可以这样查看：

```javascript
 "scripts": {
    "buildLibHelp": "mx help buildLib", // 查看所有打包组件库的命令行参数
    "buildSiteHelp": "mx help buildSite", // 查看所有webpack打包业务代码的命令行参数
    "testHelp": "mx help test", // 查看单元测试所有命令行参数
    "devHelp": "mx help dev", // 查看所有dev环境配置参数
  }
```

## 案例

在 example 文件夹下有一个案例，安装好包的依赖就可以 npm run dev 启动了

## 下个版本升级目标

- 加入自动化部署脚本：github action
- 加入单元测试覆盖率图标
- 增加 eslint 和 husky 校验
