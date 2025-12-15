import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/BANCAT---Bangladesh-Cancer-Aid-Trust/admin/' : '/',
  build: {
    outDir: '../frontend/dist/admin',
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    host: true, // Listen on all addresses
    allowedHosts: ['.ngrok-free.app', '.loca.lt', '.trycloudflare.com'], // Allow tunnel services
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  },
}));
