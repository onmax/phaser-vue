import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import PhaserGame from '../src/components/PhaserGame.vue'
import PhaserImage from '../src/components/PhaserImage.vue'
import PhaserScene from '../src/components/PhaserScene.vue'
import { createFakeSceneDefinition, getPhaserObject, mountPhaser } from '../src/testing'

describe('components', () => {
  it('mounts and destroys the host component', async () => {
    const scene = createFakeSceneDefinition({ key: 'main' })

    const wrapper = mountPhaser(PhaserGame, {
      props: { width: 320, height: 240 },
      slots: {
        default: () => h(PhaserScene, { sceneKey: 'main', definition: scene }),
      },
    })

    await flushPromises()

    wrapper.unmount()
  })

  it('applies percentage sizing to both host and canvas containers', async () => {
    const scene = createFakeSceneDefinition({ key: 'main' })

    const wrapper = mountPhaser(PhaserGame, {
      props: { width: '100%', height: '100%' },
      slots: {
        default: () => h(PhaserScene, { sceneKey: 'main', definition: scene }),
      },
    })

    await flushPromises()

    const host = wrapper.get('.phaser-game-host').element as HTMLElement
    const canvas = wrapper.get('.phaser-game-canvas').element as HTMLElement

    expect(host.style.width).toBe('100%')
    expect(host.style.height).toBe('100%')
    expect(canvas.style.width).toBe('100%')
    expect(canvas.style.height).toBe('100%')
  })

  it('normalizes numeric sizing to pixel values on the host', async () => {
    const scene = createFakeSceneDefinition({ key: 'main' })

    const wrapper = mountPhaser(PhaserGame, {
      props: { width: 320, height: 240 },
      slots: {
        default: () => h(PhaserScene, { sceneKey: 'main', definition: scene }),
      },
    })

    await flushPromises()

    const host = wrapper.get('.phaser-game-host').element as HTMLElement
    const canvas = wrapper.get('.phaser-game-canvas').element as HTMLElement

    expect(host.style.width).toBe('320px')
    expect(host.style.height).toBe('240px')
    expect(canvas.style.width).toBe('320px')
    expect(canvas.style.height).toBe('240px')
  })

  it('warns when a primitive mounts without scene context', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mountPhaser(PhaserImage, { props: { texture: 'bg' } })
    await flushPromises()
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('creates an image and patches mutable props', async () => {
    const x = ref(10)
    const ready = vi.fn()
    const scene = createFakeSceneDefinition({ key: 'main' })

    const wrapper = mountPhaser(defineComponent({
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
    const object = getPhaserObject(wrapper, candidate => (candidate as { texture?: string }).texture === 'hero') as any
    expect(object.x).toBe(10)

    x.value = 40
    await nextTick()
    expect(object.x).toBe(40)
  })

  it('warns on duplicate scene keys', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const scene = createFakeSceneDefinition({ key: 'main' })

    mountPhaser(PhaserGame, {
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
