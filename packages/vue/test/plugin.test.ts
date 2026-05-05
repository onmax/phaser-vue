import { describe, expect, it } from 'vitest'
import { createApp, defineComponent, h, inject } from 'vue'
import { phaserPluginOptionsKey } from '../src/core/context'
import { createPhaserVue } from '../src/plugin'

describe('createPhaserVue', () => {
  it('registers Phaser components by default', () => {
    const app = createApp({ render: () => h('div') })

    app.use(createPhaserVue())

    expect(app.component('PhaserGame')).toBeTruthy()
    expect(app.component('PhaserScene')).toBeTruthy()
    expect(app.component('PhaserContainer')).toBeTruthy()
    expect(app.component('PhaserImage')).toBeTruthy()
    expect(app.component('PhaserSprite')).toBeTruthy()
    expect(app.component('PhaserText')).toBeTruthy()
  })

  it('can skip component registration while still providing context options', () => {
    let injectedOptions: unknown
    const Probe = defineComponent({
      setup() {
        injectedOptions = inject(phaserPluginOptionsKey)
        return () => h('div')
      },
    })

    const app = createApp(Probe)
    const el = document.createElement('div')

    app.use(createPhaserVue({
      debug: true,
      registerComponents: false,
    }))
    app.mount(el)

    expect(app.component('PhaserGame')).toBeUndefined()
    expect(app.component('PhaserScene')).toBeUndefined()
    expect(injectedOptions).toMatchObject({
      debug: true,
    })

    app.unmount()
  })
})
