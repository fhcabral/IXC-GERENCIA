import type { Config } from 'tailwindcss'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue",
    "./layouts/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkTheme: {
          100: "#121212",
          200: "#20212C",
        },
        lightMode: {
          100: "#FFFFFF",
          200: "#F9F9F9",
        },
        custom: {
          50: '#F5F7F4',   
          100: '#4B5945',  
          200: '#66785F',
          300: '#91AC8F',
          400: '#B2C9AD'   
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config