import type Phaser from 'phaser'
import type { ComputedRef, ShallowRef } from 'vue'
import type { PhaserBridge, PhaserEventMap, PhaserGameRuntimeDefaults, PhaserSceneDefinition } from './public'

export interface SceneQueueEntry {
  run: (scene: Phaser.Scene) => void | (() => void)
}

export interface ParentQueueEntry<T extends Phaser.GameObjects.Container = Phaser.GameObjects.Container> {
  run: (container: T) => void | (() => void)
}

export interface SceneRecord {
  key: string
  definition: PhaserSceneDefinition
  ready: ShallowRef<boolean>
  scene: ShallowRef<Phaser.Scene | null>
  active: ShallowRef<boolean>
  visible: ShallowRef<boolean>
  autoStart: ShallowRef<boolean>
  queue: SceneQueueEntry[]
  flushQueue: () => void
  reset: () => void
}

export interface ParentContainerScope<T extends Phaser.GameObjects.Container = Phaser.GameObjects.Container> {
  object: ShallowRef<T | null>
  enqueue: (entry: ParentQueueEntry<T>) => () => void
  flushQueue: () => void
}

export interface PhaserGameScope {
  instanceId: string
  game: ShallowRef<Phaser.Game | null>
  containerEl: ShallowRef<HTMLElement | null>
  mounted: ShallowRef<boolean>
  bridge: PhaserBridge<PhaserEventMap>
  debug: ComputedRef<boolean>
  defaults: ComputedRef<Required<PhaserGameRuntimeDefaults>>
  scenes: Map<string, SceneRecord>
  registerScene: (input: {
    key: string
    definition: PhaserSceneDefinition
    active: ShallowRef<boolean>
    visible: ShallowRef<boolean>
    autoStart: ShallowRef<boolean>
  }) => SceneRecord | null
  unregisterScene: (key: string) => void
  recreate: () => Promise<void>
  destroy: () => void
}

export interface PhaserSceneScope {
  key: string
  record: SceneRecord
  enqueue: (entry: SceneQueueEntry) => () => void
}
