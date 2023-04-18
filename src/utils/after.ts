import type { AnyFunction } from '../interface';

export function after<T>(
  fn: AnyFunction,
  afterfun: AnyFunction | undefined
): (...args: any[]) => T {
  return (...args) => {
    const ret = fn(args);
    afterfun?.(ret);
    return ret;
  };
}
