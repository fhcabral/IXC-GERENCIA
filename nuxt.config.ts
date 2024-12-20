export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUX_API_BASE,
      socketApi: process.env.NUX_WEBHOOK_SOCKET_URL
    },
  },
  devServer: {
    port: 4005,
  },
  colorMode: {
    classSuffix: "",
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxtjs/color-mode",
    "maz-ui/nuxt",
    '@pinia/nuxt'
  ],
  compatibilityDate: "2024-09-20",
});