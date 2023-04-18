import { getNewEntryDir } from './getNewEntryDir';
import { compileScripts } from './compileScripts';

export const buildCjs = async ({ mode, outDirCjs, entryDir }) => {
  const newEntryDir = getNewEntryDir(entryDir);
  await compileScripts(mode, outDirCjs, newEntryDir);
};
