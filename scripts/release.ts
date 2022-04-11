import {
  getNextVersion,
  gitPush,
  build,
  publishNpm,
  updateVersion,
  compose,
} from "@mx-design/release";

const middle = [getNextVersion, updateVersion, gitPush, build, publishNpm];

compose(middle);
