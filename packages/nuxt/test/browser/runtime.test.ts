import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import Phaser from 'phaser'
import { mount } from '@vue/test-utils'
import { PhaserGame, PhaserScene, createPhaserVue, definePhaserScene } from '@onmax/phaser-vue'
import { withPhaserRuntimeConfig } from '../../src/testing'
import { setBrowserRuntimeConfig, useRuntimeConfig } from './imports'

const scene = definePhaserScene({
  key: 'nuxt-browser-scene',
  create({ scene }) {
    scene.add.text(16, 24, 'browser-layer')
  },
})

describe('nuxt browser runtime', () => {
  it('mounts a Phaser canvas in browser mode', async () => {
    setBrowserRuntimeConfig(withPhaserRuntimeConfig({
      clientOnly: false,
    }))
    ;(globalThis as any).useRuntimeConfig = useRuntimeConfig

    const { default: NuxtPhaserGame } = await import('../../src/runtime/components/NuxtPhaserGame.vue')
    const TestHost = defineComponent({
      setup() {
        return () => h(NuxtPhaserGame as any, {
          width: 320,
          height: 180,
          backgroundColor: '#000000',
          config: {
            type: Phaser.CANVAS,
          },
        }, {
          default: () => h(PhaserScene, { sceneKey: 'nuxt-browser-scene', definition: scene }),
        })
      },
    })

    const wrapper = mount(TestHost, {
      attachTo: document.body,
      global: {
        plugins: [createPhaserVue()],
        stubs: {
          ClientOnly: {
            template: '<slot />',
          },
        },
      },
    })

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(wrapper.find('.phaser-game-host').exists()).toBe(true)
    await expect.poll(() => wrapper.find('.phaser-game-canvas').element.querySelector('canvas')).toBeTruthy()
    wrapper.unmount()
    document.body.innerHTML = ''
  })
})
