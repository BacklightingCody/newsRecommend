import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  css: {
    // devSourcemap: true,
    // minify: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/_main.scss" as *;
      `,
      }
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
          directives: true,
          version: "2.1.5",
        }),
      ],

    }),
  ],
  define: {
    'process.env': { ...process.env }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {

    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源输出目录
    rollupOptions: {
      external: [], // 指定外部依赖
    }
  }
})