/**
 * plugins和extends的区别
 * 如果eslint里没有的规则需要plugin做拓展
 */
module.exports = {
  /**
   * node或者浏览器中的全局变量很多，如果我们一个个进行声明显得繁琐，
   * 因此就需要用到我们的env，这是对环境定义的一组全局变量的预设
   */
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  /**
   * 插件是一个 npm 包，通常输出规则。一些插件也可以输出一个或多个命名的配置。要确保这个包安装在 ESLint 能请求到的目录下。
   * plugins属性值可以省略包名的前缀eslint-plugin-。extends属性值可以由以下组成：
   * plugin:包名 (省略了前缀，比如，react）配置名称 (比如recommended)
   * 插件一个主要的作用就是补充规则，比如eslint:recommended中没有有关react的规则，则需要另外导入规则插件eslint-plugin-react
   */
  plugins: ['react', 'babel', '@typescript-eslint/eslint-plugin'],
  /**
   * eslint：开头的ESLint官方扩展，有两个：eslint:recommended（推荐规范）和eslint:all（所有规范）。
   * plugin：开头的扩展是插件类型扩展
   * eslint-config：开头的来自npm包，使用时可以省略eslint-config-
   * @：开头的扩展和eslint-config一样，是在npm包上面加了一层作用域scope
   * 需要注意的是：多个扩展中有相同的规则，以后面引入的扩展中规则为准。
   */
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true, // 启用 JSX
    },
  },
  globals: {
    describe: false,
    it: false,
    expect: false,
    jest: false,
    afterEach: false,
    beforeEach: false,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-no-target-blank': 0, // 允许 target 等于 blank
    'react/jsx-key': 1, // jsx 中的遍历，需要加 key 属性，没有会提示警告
    'react/no-find-dom-node': 0,
    indent: [2, 2, { SwitchCase: 1 }], // 缩进 2 格，jquery 项目可忽略。switch 和 case 之间缩进两个
    'jsx-quotes': [2, 'prefer-double'], // jsx 属性统一使用双引号
    'max-len': [1, { code: 140 }], // 渐进式调整，先设置最大长度为 140，同时只是警告
    'no-mixed-spaces-and-tabs': 2,
    'no-tabs': 2,
    'no-trailing-spaces': 2, // 语句尾部不能出现空格
    quotes: [2, 'single'], // 统一使用单引号
    'space-before-blocks': 2, // if 和函数等，大括号前需要空格
    'space-in-parens': 2, // 括号内前后不加空格
    'space-infix-ops': 2, // 中缀（二元）操作符前后加空格
    'spaced-comment': 2, // 注释双斜杠后保留一个空格
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    camelcase: 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'no-shadow': 0,
    'global-require': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
  },
};
