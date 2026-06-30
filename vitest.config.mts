import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// `.mts` so it's loaded as ESM — the project is CommonJS (no "type": "module")
// but @vitejs/plugin-react and vite-tsconfig-paths are ESM-only.
export default defineConfig({
  // `tsconfigPaths` wires up the `components/*`, `utils/*`, etc. aliases from
  // tsconfig.json so tests can import the same way the app does.
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
  },
})
