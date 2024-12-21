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
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxtjs/color-mode",
    "maz-ui/nuxt",
    '@pinia/nuxt'
  ],
  compatibilityDate: "2024-09-20",
});