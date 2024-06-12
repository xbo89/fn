// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxt/ui"],
  app: {
    rootId: '__float_note'
  },
  css: ['~/assets/css/style.css'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/login',
      exclude: ['/'],
    }
  },
  ui: {
    safelistColors: ['indigo']  // 这里添加 orange 颜色到 safelist
  }
})