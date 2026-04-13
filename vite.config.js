import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ["aurora-women-saftey-xap1.vercel.app", "aurora-women-saftey-1.onrender.com"]
  },
  server: {
    allowedHosts: ["aurora-women-saftey-xap1.vercel.app", "aurora-women-saftey-1.onrender.com"]
  }
})
