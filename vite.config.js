import { defineConfig } from 'vite';


export default defineConfig({
  base: '/baltica-home/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  }
});
