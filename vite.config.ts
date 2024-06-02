import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/wood-client/',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
