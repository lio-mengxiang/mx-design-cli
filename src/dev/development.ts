import { createServer } from 'vite';
import path from 'path';
import { getViteConfig } from '../utils';

export default async () => {
  const server = await createServer({
    configFile:
      getViteConfig() || path.join(__dirname, '../config/vite.config.js'),
    root: process.cwd(),
  });
  await server.listen();
  server.printUrls();
};
