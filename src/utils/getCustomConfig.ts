import path from 'path';
import fs from 'fs';
import { CustomConfig } from '../interface';

/**
 * Get the project files
 * */
export const getCustomConfig = (
  configFileName = 'mx.config.js'
): Partial<CustomConfig> => {
  const configPath = path.join(process.cwd(), configFileName);
  if (fs.existsSync(configPath)) {
    return require(configPath);
  }
  return {};
};
