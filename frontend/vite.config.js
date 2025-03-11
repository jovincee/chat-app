import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//define port here for client:
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      "/api":{
        target: "http://localhost:5000",
      }
    }
  }
})
