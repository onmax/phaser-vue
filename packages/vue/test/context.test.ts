import type { App } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { createPhaserVueContext } from '../src/context'
import { phaserPluginOptionsKey } from '../src/core/context'
import { createPhaserVue } from '../src/plugin'

function createAppStub() {
  const app = {
    component: vi.fn(),
    provide: vi.fn(),
    use(plugin: { install: (app: App) => void }) {
      plugin.install(app as unknown as App)
      return app
    },
  }

  return app
}

describe('phaser vue plugin context', () => {
  it('provides runtime options without registering components', () => {
    const app = createAppStub()
    const options = { debug: true, defaults: { suspendWhenHidden: false } }

    createPhaserVueContext(options).install(app as unknown as App)

    expect(app.provide).toHaveBeenCalledWith(phaserPluginOptionsKey, options)
    expect(app.component).not.toHaveBeenCalled()
  })

  it('lets createPhaserVue skip component registration for integration layers', () => {
    const app = createAppStub()
    const options = { registerComponents: false, defaults: { assetsBaseUrl: '/game/' } }

    createPhaserVue(options).install(app as unknown as App)

    expect(app.provide).toHaveBeenCalledWith(phaserPluginOptionsKey, {
      defaults: { assetsBaseUrl: '/game/' },
    })
    expect(app.component).not.toHaveBeenCalled()
  })
})
