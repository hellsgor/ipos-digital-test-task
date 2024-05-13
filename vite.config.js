import { defineConfig } from 'vite';
import { resolve } from 'path';
import { store } from './store.js';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': store,
};

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      '@scss': resolve(__dirname, '/src/scss'),
      '@fonts': resolve(__dirname, '/fonts'),
      '@components': resolve(__dirname, '/src/components'),
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  css: {
    devSourcemap: true,
  },
});
