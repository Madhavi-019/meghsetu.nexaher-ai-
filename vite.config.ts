import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever framework you're using

export default defineConfig({
  plugins: [react()],
  base: '/', // Set to root for Netlify deployment
  build: {
    outDir: 'dist',
  },
})
