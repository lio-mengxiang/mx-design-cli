import {
  getNextVersion,
  gitPush,
  build,
  publishNpm,
  updateVersion,
  compose,
  eslint,
} from '@mx-design/release';

const middle = [
  eslint(),
  getNextVersion,
  updateVersion,
  gitPush,
  build,
  publishNpm,
];

compose(middle);
