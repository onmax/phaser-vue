import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { PhaserScene, definePhaserScene } from '@onmax/phaser-vue'
import NuxtPhaserGame from '../../src/runtime/components/NuxtPhaserGame.vue'
import { mountSuspendedWithPhaser } from '../../src/testing'

const testScene = definePhaserScene({
  key: 'nuxt-test-scene',
  create({ scene }) {
    scene.add.text(12, 18, 'nuxt-ready')
  },
})

const TestHost = defineComponent({
  setup() {
    return () => h(NuxtPhaserGame, { width: 320, height: 180 }, {
      default: () => h(PhaserScene, { sceneKey: 'nuxt-test-scene', definition: testScene }),
      placeholder: () => h('div', { class: 'test-placeholder' }, 'placeholder'),
    })
  },
})

describe('nuxt runtime testing', () => {
  it('mounts NuxtPhaserGame with the fake Phaser runtime', async () => {
    const wrapper = await mountSuspendedWithPhaser(TestHost)

    expect(wrapper.find('.phaser-game-host').exists()).toBe(true)
    expect(wrapper.find('.phaser-game-canvas').exists()).toBe(true)
  })
})
