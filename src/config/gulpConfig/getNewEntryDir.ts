export const getNewEntryDir = (entryDir) =>
  entryDir?.[entryDir.length - 1] === '/'
    ? entryDir.slice(0, entryDir.length - 1)
    : entryDir;
