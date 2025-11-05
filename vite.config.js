import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'docs',
  },
  base: './',
  // base: '/rad-lines/',  // Replace with your GitHub repo name

  server: {
    port: 3000,
  },
});
