import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { ILLUSIONS } from './src/illusions.ts'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/OpticEye/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries([
        ['home', fileURLToPath(new URL('./index.html', import.meta.url))],
        ...ILLUSIONS.map((illusion) => [illusion.id, fileURLToPath(new URL(`./${illusion.id}/index.html`, import.meta.url))]),
      ]),
    },
  },
}))
