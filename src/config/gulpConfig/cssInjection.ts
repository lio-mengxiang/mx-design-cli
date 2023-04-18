/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
export function cssInjection(content) {
  return (
    content
      // eslint-disable-next-line quotes
      .replace(/\/style\/?'/g, "/style/css'")
      .replace(/\/style\/?"/g, '/style/css"')
      .replace(/\.less/g, '.css')
  );
}
