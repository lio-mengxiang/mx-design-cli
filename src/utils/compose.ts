export function compose(middleware, initOptions) {
  const otherOptions = initOptions || {};
  function dispatch(index) {
    if (index === middleware.length) return;
    const currMiddleware = middleware[index];
    return currMiddleware(() => dispatch(++index), otherOptions);
  }
  dispatch(0);
}
