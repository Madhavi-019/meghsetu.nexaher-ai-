import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever framework you're using

export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/', // Replace with your actual GitHub repository name
  build: {
    outDir: 'dist',
  },
})
