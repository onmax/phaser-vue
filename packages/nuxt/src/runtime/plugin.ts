import { createPhaserVue } from '@onmax/phaser-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  nuxtApp.vueApp.use(createPhaserVue({
    debug: runtimeConfig.public.phaser.debug,
    defaults: runtimeConfig.public.phaser.defaults,
  }))
})
