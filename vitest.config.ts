import { defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [viteTsConfigPaths({ projects: ['./tsconfig.json'] })],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    // Exclude worker-specific tests that need Cloudflare bindings
    exclude: ['src/**/*.worker.test.{ts,tsx}', 'node_modules'],
  },
})
