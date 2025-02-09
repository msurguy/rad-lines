import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'docs',
  },
  // base: '/rad-lines/',  // Replace with your GitHub repo name

  server: {
    port: 3000,
  },
});
