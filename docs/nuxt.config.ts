export default defineNuxtConfig({
  extends: ['docus'],

  ogImage: { enabled: false },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  site: {
    url: 'https://phaser-vue-docs.vercel.app',
    name: 'phaser-vue',
    description: 'Hybrid Phaser primitives for Vue and Nuxt, with scene-first APIs, typed bridges, and SSR-safe Nuxt integration.',
    defaultLocale: 'en',
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [{ name: 'twitter:card', content: 'summary_large_image' }],
    },
  },

  mdc: {
    highlight: {
      shikiEngine: 'javascript',
    },
  },

  devtools: { enabled: true },

  future: { compatibilityVersion: 4 },

  compatibilityDate: '2026-03-29',

  llms: {
    domain: 'phaser-vue-docs.vercel.app',
    title: 'phaser-vue',
    description: 'Documentation for @onmax/phaser-vue and @onmax/nuxt-phaser.',
    full: {
      title: 'phaser-vue',
      description: 'Guides and API reference for the Phaser Vue primitives library and the Nuxt module wrapper.',
    },
  },

  mcp: {
    name: 'phaser-vue documentation',
    browserRedirect: '/getting-started',
  },

  routeRules: {
    '/guides/getting-started': { redirect: '/getting-started' },
    '/guides/nuxt': { redirect: '/nuxt-module' },
    '/reference/api': { redirect: '/api-reference' },
  },
})
