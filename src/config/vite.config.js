import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default () =>
  defineConfig({
    base: '/',
    jsx: 'react',
    server: {
      host: '0.0.0.0',
      port: 15000,
      open: '/',
      https: false,
      fs: {
        strict: false,
      },
    },
    plugins: [react()],
  });
