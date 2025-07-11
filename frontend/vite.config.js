import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://127.0.0.1:8000",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     "/static": {
  //       target: "http://127.0.0.1:8000"
  //     }
  //   },
  // },
})
