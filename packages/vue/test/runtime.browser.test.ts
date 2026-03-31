import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'
import Phaser from 'phaser'
import PhaserGame from '../src/components/PhaserGame.vue'
import PhaserScene from '../src/components/PhaserScene.vue'
import { createPhaserVue } from '../src/plugin'
import { definePhaserScene } from '../src/scene/definePhaserScene'

describe('browser runtime', () => {
  it('mounts a real Phaser canvas in the browser', async () => {
    const scene = definePhaserScene({
      key: 'browser-demo',
      create({ scene }) {
        scene.add.text(16, 24, 'browser-ready')
      },
    })

    const wrapper = mount(PhaserGame, {
      attachTo: document.body,
      props: {
        width: 320,
        height: 180,
        backgroundColor: '#000000',
        config: {
          type: Phaser.CANVAS,
        },
      },
      global: {
        plugins: [createPhaserVue()],
      },
      slots: {
        default: () => h(PhaserScene, { sceneKey: 'browser-demo', definition: scene }),
      },
    })

    await flushPromises()

    expect(wrapper.find('.phaser-game-host').exists()).toBe(true)
    await expect.poll(() => wrapper.find('.phaser-game-canvas').element.querySelector('canvas')).toBeTruthy()

    wrapper.unmount()
    document.body.innerHTML = ''
  })
})
