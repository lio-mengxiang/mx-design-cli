import { getCssRule } from './getCssRule';
import { getFontRule } from './getFontRule';
import { getImageRule } from './getImageRule';
import { getJsTsRule } from './getJsTsRule';
import { getLessRule } from './getLessRule';
import { getSvgRule } from './getSvgRule';
import type { AnyFunction } from '../../../interface';

type IProps = {
  afterJsTsRule?: AnyFunction;
  afterSvgRule?: AnyFunction;
  afterCssRule?: AnyFunction;
  afterLessRule?: AnyFunction;
  afterImageRule?: AnyFunction;
  afterFontRule?: AnyFunction;
  options?: Record<string, any>;
};

export function getRule({
  afterJsTsRule,
  afterSvgRule,
  afterCssRule,
  afterLessRule,
  afterImageRule,
  afterFontRule,
  options,
}: IProps) {
  const result = [];
  result.push(getJsTsRule(afterJsTsRule)());
  result.push(getLessRule(afterLessRule)(options));
  result.push(getCssRule(afterCssRule)());
  result.push(getImageRule(afterImageRule)());
  result.push(getFontRule(afterFontRule)());
  result.push(getSvgRule(afterSvgRule)());
  return result;
}
