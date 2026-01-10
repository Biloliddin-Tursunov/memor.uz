import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 3000,
    host: true, // Tarmoqda ko'rinishi uchun (0.0.0.0)
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // @ belgisini src papkasiga to'g'irlaymiz
      '@': path.resolve(__dirname, './src'),
    }
  }
});