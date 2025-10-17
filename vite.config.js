import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // 对于GitHub Pages部署，base应该设置为仓库名称
  // 这样无论部署到哪里，资源路径都会正确
  base: process.env.NODE_ENV === 'production' ? '/Weather/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
