import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    
    environment: 'jsdom',
    globals: true,
    include: ['./tests/**/*.{test,spec}.{js,ts,vue}'],
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
    alias: {
      '#build/nuxt.config.mjs': path.resolve(__dirname, './nuxt.config.ts'),
      '#imports': path.resolve(__dirname, './node_modules/nuxt/dist/app/imports'),
      '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app/nuxt.js'),
      '#internal/nuxt/paths': path.resolve(__dirname, './node_modules/nuxt/dist/core/runtime/nitro/paths'),
      '#internal/nitro': path.resolve(__dirname, './node_modules/nuxt/dist/core/runtime/nitro/paths')
    }
  },
  resolve: {
    alias: {
      '#build/nuxt.config.mjs': path.resolve(__dirname, './nuxt.config.ts'),
      '#imports': path.resolve(__dirname, './node_modules/nuxt/dist/app/imports'),
      '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app/nuxt.js'),
      '#internal/nuxt/paths': path.resolve(__dirname, './node_modules/nuxt/dist/core/runtime/nitro/paths'),
      '#internal/nitro': path.resolve(__dirname, './node_modules/nuxt/dist/core/runtime/nitro/paths'),
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  
})