import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import PhaserGame from '../src/components/PhaserGame.vue'
import PhaserImage from '../src/components/PhaserImage.vue'
import PhaserScene from '../src/components/PhaserScene.vue'
import { definePhaserScene } from '../src/scene/definePhaserScene'

describe('components', () => {
  it('mounts and destroys the host component', async () => {
    const ready = vi.fn()
    const scene = definePhaserScene({ key: 'main' })

    const wrapper = mount(PhaserGame, {
      props: { width: 320, height: 240, onReady: ready },
      slots: {
        default: () => h(PhaserScene, { sceneKey: 'main', definition: scene }),
      },
    })

    await flushPromises()

    expect(ready).toHaveBeenCalled()
    expect(ready.mock.calls[0][0]).toBeTruthy()

    wrapper.unmount()
  })

  it('warns when a primitive mounts without scene context', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(PhaserImage, { props: { texture: 'bg' } })
    await flushPromises()
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('creates an image and patches mutable props', async () => {
    const x = ref(10)
    const ready = vi.fn()
    const scene = definePhaserScene({ key: 'main' })

    const wrapper = mount(defineComponent({
      setup() {
        return () => h(PhaserGame, { width: 320, height: 240 }, {
          default: () => h(PhaserScene, { sceneKey: 'main', definition: scene }, {
            default: () => h(PhaserImage, {
              texture: 'hero',
              x: x.value,
              y: 20,
              onReady: ready,
            }),
          }),
        })
      },
    }))

    await flushPromises()
    await nextTick()
    await flushPromises()
    const imageVm = wrapper.findComponent(PhaserImage).vm as any
    const object = imageVm.$?.exposed?.object?.value
    expect(object.x).toBe(10)

    x.value = 40
    await nextTick()
    expect(object.x).toBe(40)
  })

  it('warns on duplicate scene keys', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const scene = definePhaserScene({ key: 'main' })

    mount(PhaserGame, {
      props: { debug: true },
      slots: {
        default: () => [
          h(PhaserScene, { sceneKey: 'main', definition: scene }),
          h(PhaserScene, { sceneKey: 'main', definition: scene }),
        ],
      },
    })

    await flushPromises()
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
