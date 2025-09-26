import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import react from "@vitejs/plugin-react";
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: true,
        titleProp: true
      }
    })
  ],
  test: {
    ...configDefaults,
    environment: 'jsdom',
    globals: true
  },
})
