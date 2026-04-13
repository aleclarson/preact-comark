import { fileURLToPath, URL } from 'node:url'
import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: fileURLToPath(new URL('./', import.meta.url)),
  plugins: [preact()],
  resolve: {
    alias: {
      'preact-comark': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
    dedupe: ['preact', 'preact/hooks', 'preact/compat'],
  },
})
