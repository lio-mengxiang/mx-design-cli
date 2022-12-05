const {
  getNextVersion,
  gitPush,
  build,
  publishNpm,
  updateVersion,
  compose,
  eslint,
} = require('@mx-design/release');

const middle = [
  eslint(),
  getNextVersion,
  updateVersion,
  gitPush,
  build,
  publishNpm,
];

compose(middle);
