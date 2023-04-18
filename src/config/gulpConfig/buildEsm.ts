import { compileScripts } from './compileScripts';
import { getNewEntryDir } from './getNewEntryDir';

export const buildEsm = async ({ mode, outDirEsm, entryDir }) => {
  const newEntryDir = getNewEntryDir(entryDir);
  await compileScripts(mode, outDirEsm, newEntryDir);
};
