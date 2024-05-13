import { defineConfig } from 'vite';
import { resolve } from 'path';
import { store } from './store.js';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': store,
};

export default defineConfig({
  css: {
    devSourcemap: true,
    plugins: [
      handlebars({
        partialDirectory: resolve(__dirname, './src/components'),
        context(pagePath) {
          return pageData[pagePath];
        },
      }),
    ],
  },
});
