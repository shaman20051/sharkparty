import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/sharkparty/', // 👈 имя твоего репозитория на GitHub
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        tournament: path.resolve(__dirname, 'tournament.html'),
        leaderboard: path.resolve(__dirname, 'leaderboard.html')
        bingo: path.resolve(__dirname, 'bingo.html')
        contacts: path.resolve(__dirname, 'contacts.html')
      },
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
