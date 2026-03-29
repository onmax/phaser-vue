import type { ShallowRef } from 'vue'
import { shallowRef } from 'vue'
import type Phaser from 'phaser'
import type { PhaserGameScope, SceneRecord } from '../types/internal'
import type { PhaserSceneDefinition } from '../types/public'
import { warnDebug } from './debug'

export function registerManagedScene(
  scope: PhaserGameScope,
  input: {
    key: string
    definition: PhaserSceneDefinition
    active: ShallowRef<boolean>
    visible: ShallowRef<boolean>
    autoStart: ShallowRef<boolean>
  },
) {
  if (scope.scenes.has(input.key)) {
    warnDebug(`Duplicate scene key "${input.key}" detected. The later registration was ignored.`, scope.debug.value)
    return null
  }

  const ready = shallowRef(false)
  const scene = shallowRef<Phaser.Scene | null>(null)
  const queue: SceneRecord['queue'] = []

  const record: SceneRecord = {
    key: input.key,
    definition: input.definition,
    ready,
    scene,
    active: input.active,
    visible: input.visible,
    autoStart: input.autoStart,
    queue,
    flushQueue() {
      const instance = scene.value
      if (!instance)
        return

      for (const entry of [...queue])
        entry.run(instance)

      queue.length = 0
    },
    reset() {
      ready.value = false
      scene.value = null
    },
  }

  scope.scenes.set(input.key, record)
  return record
}

export function createManagedSceneClass(scope: PhaserGameScope, record: SceneRecord, PhaserRuntime: typeof Phaser) {
  const baseConfig = {
    key: record.key,
    active: record.autoStart.value,
    visible: record.visible.value,
  }

  return class ManagedScene extends PhaserRuntime.Scene {
    constructor() {
      super(baseConfig)
    }

    getContext() {
      return {
        game: scope.game.value!,
        scene: this,
        bridge: scope.bridge,
        registry: this.registry,
        registryState: this.registry.values as Record<string, unknown>,
      }
    }

    init(data?: unknown) {
      record.ready.value = false
      record.scene.value = this
      record.definition.init?.(this.getContext(), data)
    }

    preload() {
      record.definition.preload?.(this.getContext())
    }

    create(data?: unknown) {
      record.scene.value = this
      record.ready.value = true
      record.definition.create?.(this.getContext(), data)
      record.flushQueue()
      record.definition.ready?.(this.getContext())
      this.scene.setActive(record.active.value)
      this.scene.setVisible(record.visible.value)
    }

    update(time: number, delta: number) {
      record.definition.update?.(this.getContext(), time, delta)
    }
  }
}
