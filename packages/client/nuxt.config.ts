// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    'radix-vue/nuxt',
    "@nuxtjs/supabase"
  ],
  app: {
    rootId: '__float_note'
  },
  css: ['~/assets/css/style.css'],
  routeRules: {
    '/api-v1/**': {
      proxy: 'http://localhost:3002/**'
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/login',
      exclude: ['/'],
    }
  }
})