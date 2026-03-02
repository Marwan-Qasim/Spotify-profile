import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/refresh_token': 'https://spotify-profile-bmj1.onrender.com',
      '/login': 'https://spotify-profile-bmj1.onrender.com',
      '/callback': 'https://spotify-profile-bmj1.onrender.com'
    }
  }
})
