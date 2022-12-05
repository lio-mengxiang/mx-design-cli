const defineConfig = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
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
