import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  server: {
    allowedHosts: [
      'https://6aa2-111-92-172-4.ngrok-free.app', // Ganti dengan host ngrok Anda
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
