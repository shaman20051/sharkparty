import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          const ext = path.extname(assetInfo.name).slice(1)
          if (ext === 'css') return 'css/[name]-[hash][extname]'
          if (['woff2', 'woff', 'ttf'].includes(ext)) return 'fonts/[name]-[hash][extname]'
          if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) return 'images/[name]-[hash][extname]'
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      }
    }
  }
})
