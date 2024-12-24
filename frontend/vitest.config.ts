import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  plugins: [vue(),
    AutoImport({imports: ['vue','vitest','pinia']}),
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['./tests/**/*.{test,spec}.{js,ts,vue}'],
    setupFiles: ['./vitest.setup.ts'],
    css: {
      include: [/\.css$/, /maz-ui/],
    },
    deps: {
      inline: [
        /nuxt/,
        /maz-ui/,
        /\.css$/,
        /#app/,
        /#imports/,
        /#internal/
      ],
    },
  },
  resolve: {
    alias: {
      '~/': path.resolve(__dirname, './'),
      '@/': path.resolve(__dirname, './'),
      '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app/nuxt.js'),
      '#build/nuxt.config.mjs': path.resolve(__dirname, './nuxt.config.ts'),
      '#internal/': path.resolve(__dirname, './.nuxt'),
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  
})