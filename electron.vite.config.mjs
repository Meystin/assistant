import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        output: {
          format: 'es'
        }
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          anime: resolve(__dirname, 'src/preload/anime.js')/*,
          chat: resolve(__dirname, 'src/preload/chat.js'),
          url: resolve(__dirname, 'src/preload/url.js'),
          jeu: resolve(__dirname, 'src/preload/jeu.js')*/
        },
        output: {
          format: 'es'
        }
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          anime: resolve(__dirname, 'src/renderer/src/animeview.html')/*,
          chat: resolve(__dirname, 'src/renderer/src/chatview.html'),
          url: resolve(__dirname, 'src/renderer/src/url.html'),
          jeu: resolve(__dirname, 'src/renderer/src/jeuview.html')*/
        },
      }
    }
  }
})
