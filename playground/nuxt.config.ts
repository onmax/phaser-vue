// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@onmax/nuxt-phaser',
  ],

  devtools: {
    enabled: true
  },

  compatibilityDate: '2026-03-29',

  css: ['~/assets/css/main.css'],

  phaser: {
    clientOnly: true,
    debug: true,
    defaults: {
      suspendWhenHidden: true,
      assetsBaseUrl: '/',
    },
  },
})
