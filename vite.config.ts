import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    outDir: 'docs',
    // Until the "optional-components" CSS becomes larger,
    // it is better to have all styles in one file.
    cssCodeSplit: false,
  },
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
  },
});
