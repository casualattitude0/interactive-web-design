import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PUBLIC_PATH lets project sites (e.g. GitHub Pages) set the asset base URL.
export default defineConfig({
  base: process.env.PUBLIC_PATH || '/',
  plugins: [react()],
})
