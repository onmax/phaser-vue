import type { ShallowRef } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, provide, shallowRef } from 'vue'
import { phaserGameScopeKey, phaserSceneScopeKey } from '../src/core/context'
import { useGameEvent } from '../src/composables/useGameEvent'
import { usePhaserKeyboard } from '../src/composables/usePhaserKeyboard'
import { usePhaserPointer } from '../src/composables/usePhaserPointer'
import { useSceneEvent } from '../src/composables/useSceneEvent'

function createEventTarget() {
  return {
    on: vi.fn(),
    off: vi.fn(),
  }
}

function createScene() {
  return {
    events: createEventTarget(),
    input: {
      on: vi.fn(),
      off: vi.fn(),
      keyboard: {
        addKeys: vi.fn((keys: string) => Object.fromEntries(keys.split(',').map(key => [key.trim(), { key: key.trim(), destroy: vi.fn() }]))),
      },
    },
  }
}

function mountWithGame(game: ShallowRef<any>, child: ReturnType<typeof defineComponent>) {
  return mount(defineComponent({
    setup() {
      provide(phaserGameScopeKey, { game } as any)
      return () => h(child)
    },
  }))
}

function mountWithScene(scene: ShallowRef<any>, child: ReturnType<typeof defineComponent>) {
  return mount(defineComponent({
    setup() {
      provide(phaserSceneScopeKey, {
        key: 'main',
        record: { scene },
        enqueue: vi.fn(),
      } as any)
      return () => h(child)
    },
  }))
}

describe('composable lifecycle cleanup', () => {
  it('removes game event handlers from replaced Phaser games', async () => {
    const firstGame = { events: createEventTarget() }
    const nextGame = { events: createEventTarget() }
    const game = shallowRef<any>(firstGame)
    const handler = vi.fn()
    const GameEventConsumer = defineComponent({
      setup() {
        useGameEvent('custom:event', handler)
        return () => null
      },
    })

    mountWithGame(game, GameEventConsumer)

    expect(firstGame.events.on).toHaveBeenCalledWith('custom:event', handler)

    game.value = nextGame
    await nextTick()

    expect(firstGame.events.off).toHaveBeenCalledWith('custom:event', handler)
    expect(nextGame.events.on).toHaveBeenCalledWith('custom:event', handler)
  })

  it('removes scene event handlers from replaced Phaser scenes', async () => {
    const firstScene = createScene()
    const nextScene = createScene()
    const scene = shallowRef<any>(firstScene)
    const handler = vi.fn()
    const SceneEventConsumer = defineComponent({
      setup() {
        useSceneEvent('scene:event', handler)
        return () => null
      },
    })

    mountWithScene(scene, SceneEventConsumer)

    expect(firstScene.events.on).toHaveBeenCalledWith('scene:event', handler)

    scene.value = nextScene
    await nextTick()

    expect(firstScene.events.off).toHaveBeenCalledWith('scene:event', handler)
    expect(nextScene.events.on).toHaveBeenCalledWith('scene:event', handler)
  })

  it('removes pointer handlers from replaced Phaser scenes', async () => {
    const firstScene = createScene()
    const nextScene = createScene()
    const scene = shallowRef<any>(firstScene)
    const PointerConsumer = defineComponent({
      setup() {
        usePhaserPointer()
        return () => null
      },
    })

    mountWithScene(scene, PointerConsumer)

    expect(firstScene.input.on).toHaveBeenCalledWith('pointermove', expect.any(Function))

    scene.value = nextScene
    await nextTick()

    expect(firstScene.input.off).toHaveBeenCalledWith('pointermove', expect.any(Function))
    expect(firstScene.input.off).toHaveBeenCalledWith('pointerdown', expect.any(Function))
    expect(firstScene.input.off).toHaveBeenCalledWith('pointerup', expect.any(Function))
    expect(nextScene.input.on).toHaveBeenCalledWith('pointermove', expect.any(Function))
  })

  it('destroys keyboard keys from replaced Phaser scenes', async () => {
    const firstScene = createScene()
    const nextScene = createScene()
    const scene = shallowRef<any>(firstScene)
    const KeyboardConsumer = defineComponent({
      setup() {
        usePhaserKeyboard(['SPACE', 'UP'])
        return () => null
      },
    })

    mountWithScene(scene, KeyboardConsumer)

    const oldKeys = firstScene.input.keyboard.addKeys.mock.results[0]!.value

    scene.value = nextScene
    await nextTick()

    expect(oldKeys.SPACE.destroy).toHaveBeenCalledOnce()
    expect(oldKeys.UP.destroy).toHaveBeenCalledOnce()
    expect(nextScene.input.keyboard.addKeys).toHaveBeenCalledWith('SPACE,UP')
  })
})
