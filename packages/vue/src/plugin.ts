import type { App, Plugin } from 'vue'
import type { PhaserVuePluginOptions } from './types/public'
import { phaserPluginOptionsKey } from './core/context'
import PhaserContainer from './components/PhaserContainer.vue'
import PhaserGame from './components/PhaserGame.vue'
import PhaserImage from './components/PhaserImage.vue'
import PhaserScene from './components/PhaserScene.vue'
import PhaserSprite from './components/PhaserSprite.vue'
import PhaserText from './components/PhaserText.vue'

export function createPhaserVue(options: PhaserVuePluginOptions = {}): Plugin {
  return {
    install(app: App) {
      app.provide(phaserPluginOptionsKey, options)
      app.component('PhaserGame', PhaserGame)
      app.component('PhaserScene', PhaserScene)
      app.component('PhaserContainer', PhaserContainer)
      app.component('PhaserImage', PhaserImage)
      app.component('PhaserSprite', PhaserSprite)
      app.component('PhaserText', PhaserText)
    },
  }
}
