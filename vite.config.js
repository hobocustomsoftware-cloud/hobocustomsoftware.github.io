import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT for GitHub Pages:
// - If deploying to https://<username>.github.io  -> keep base: '/'
// - If deploying to https://<username>.github.io/<repo-name> -> set base: '/<repo-name>/'
export default defineConfig({
  plugins: [react()],
  base: './',
})
