import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/banking-dashboard/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: {
      provider: 'v8', // or 'c8'
      reporter: ['text', 'json', 'html'],
      exclude: ['vite.config.*', 'src/main.*', '**/*.d.ts', '**/__tests__/**'],
    },
  },
});
