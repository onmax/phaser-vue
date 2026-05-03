import type { App, Plugin } from 'vue'
import type { PhaserVuePluginOptions } from './types/public'
import { phaserPluginOptionsKey } from './core/context'

export function createPhaserVueContext(options: PhaserVuePluginOptions = {}): Plugin {
  return {
    install(app: App) {
      app.provide(phaserPluginOptionsKey, options)
    },
  }
}
