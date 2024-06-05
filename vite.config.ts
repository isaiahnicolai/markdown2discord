import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/markdown2discord/', 
  plugins: [react()],
});
