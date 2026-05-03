import type { App, Plugin } from 'vue'
import type { PhaserVuePluginOptions } from './types/public'
import PhaserContainer from './components/PhaserContainer.vue'
import PhaserGame from './components/PhaserGame.vue'
import PhaserImage from './components/PhaserImage.vue'
import PhaserScene from './components/PhaserScene.vue'
import PhaserSprite from './components/PhaserSprite.vue'
import PhaserText from './components/PhaserText.vue'
import { createPhaserVueContext } from './context'

export function createPhaserVue(options: PhaserVuePluginOptions = {}): Plugin {
  const { registerComponents = true, ...contextOptions } = options
  const contextPlugin = createPhaserVueContext(contextOptions)

  return {
    install(app: App) {
      app.use(contextPlugin)
      if (!registerComponents)
        return

      app.component('PhaserGame', PhaserGame)
      app.component('PhaserScene', PhaserScene)
      app.component('PhaserContainer', PhaserContainer)
      app.component('PhaserImage', PhaserImage)
      app.component('PhaserSprite', PhaserSprite)
      app.component('PhaserText', PhaserText)
    },
  }
}
