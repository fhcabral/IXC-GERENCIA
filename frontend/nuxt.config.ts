import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: [
    '~/assets/css/tailwind.css',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUX_API_BASE,
    },
  },
  devServer: {
    port: 4005,
  },
  colorMode: {
    preference: 'system', // default value
    fallback: 'light', // fallback if not system
    classPrefix: '',
    classSuffix: ''
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['nuxt-graphql-request'],
  },
  graphql: {
    clients: {
      default: {
        endpoint: 'http://localhost:4000',
        options: {},
      },
    },
    options: {
      method: 'get',
    },
    includeNodeModules: true,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxtjs/color-mode",
    "maz-ui/nuxt",
    '@pinia/nuxt',
    'nuxt-graphql-request',
  ],
  compatibilityDate: "2024-09-20",
});