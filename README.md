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
- 通过 @mx-deisgn/cli 可以快速启动开发环境，打包项目，测试项目
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

## 下个版本升级目标

- 加入自动化部署脚本：github action
- 加入单元测试覆盖率图标
- 增加 eslint 和 husky 校验
