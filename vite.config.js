import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Vite 8 uses Rolldown (experimental Rust bundler) by default, which has
  // known issues resolving node_modules in CI environments (e.g. Vercel).
  // Force classic Rollup to fix build failures.
  builder: 'rollup',
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  }
})
