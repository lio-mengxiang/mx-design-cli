import { createServer } from 'vite';
import { getViteConfig } from '../utils';
import viteConfig from '../config/vite.config.js';

export default async () => {
  const server = await createServer({
    configFile: getViteConfig() || viteConfig,
    root: process.cwd(),
  });
  server.listen();
  server.printUrls();
};
