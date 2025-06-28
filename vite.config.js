import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        iframe: resolve(__dirname, 'iframe.html'),
        popup: resolve(__dirname, 'popup.html')
      }
    }
  }
});
