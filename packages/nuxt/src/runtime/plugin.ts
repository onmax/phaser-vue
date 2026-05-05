import { createPhaserVueContext } from '@onmax/phaser-vue/context'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  nuxtApp.vueApp.use(createPhaserVueContext({
    debug: runtimeConfig.public.phaser.debug,
    defaults: runtimeConfig.public.phaser.defaults,
    registerComponents: false,
  }))
})
