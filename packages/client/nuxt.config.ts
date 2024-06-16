// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxt/ui"],
  app: {
    rootId: '__float_note'
  },
  css: ['~/assets/css/style.css', 'simplebar-vue/dist/simplebar.min.css'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/login',
      exclude: ['/'],
    }
  },
  ui: {
    icons: ['ri'],
    safelistColors: ['clipBlue', 'clipGray']  // 这里添加 orange 颜色到 safelist
  }
})