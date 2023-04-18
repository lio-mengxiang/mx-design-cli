// Synchronous function chain
export const syncChainFns = (...fns) => {
  const [firstFn, ...otherFns] = fns;
  return (...args) => {
    if (!otherFns) return firstFn(...args);
    return otherFns.reduce((ret, task) => task(ret), firstFn(...args));
  };
};
