import type Phaser from 'phaser'
import type { Ref, ShallowRef } from 'vue'

export type PhaserEventMap = Record<string, unknown>
export type PhaserHmrStrategy = 'recreate' | 'preserve'

export interface PhaserVuePluginOptions {
  debug?: boolean
  defaults?: PhaserGameRuntimeDefaults
}

export interface PhaserGameRuntimeDefaults {
  pixelArt?: boolean
  transparent?: boolean
  suspendWhenHidden?: boolean
  assetsBaseUrl?: string
}

export interface PhaserGameProps {
  config?: Phaser.Types.Core.GameConfig
  scenes?: Array<Phaser.Scene | Phaser.Types.Scenes.SettingsConfig | PhaserSceneDefinition | PhaserSceneClass>
  width?: number | string
  height?: number | string
  pixelArt?: boolean
  transparent?: boolean
  backgroundColor?: string
  autoFocus?: boolean
  autoStart?: boolean
  instanceId?: string
  debug?: boolean
  suspendWhenHidden?: boolean
  hmrStrategy?: PhaserHmrStrategy
  assetsBaseUrl?: string
}

export interface PhaserGameExpose {
  game: ShallowRef<Phaser.Game | null>
  mounted: ShallowRef<boolean>
  containerEl: ShallowRef<HTMLElement | null>
  bridge: PhaserBridge<PhaserEventMap>
}

export type PhaserSceneClass = new (...args: any[]) => Phaser.Scene

export interface PhaserSceneContext<Events extends PhaserEventMap = PhaserEventMap, RegistryShape extends Record<string, unknown> = Record<string, unknown>> {
  game: Phaser.Game
  scene: Phaser.Scene
  bridge: PhaserBridge<Events>
  registry: Phaser.Data.DataManager
  registryState: RegistryShape
}

export interface PhaserSceneDefinition<Events extends PhaserEventMap = PhaserEventMap, RegistryShape extends Record<string, unknown> = Record<string, unknown>> {
  key: string
  init?: (ctx: PhaserSceneContext<Events, RegistryShape>, data?: unknown) => void
  preload?: (ctx: PhaserSceneContext<Events, RegistryShape>) => void
  create?: (ctx: PhaserSceneContext<Events, RegistryShape>, data?: unknown) => void
  update?: (ctx: PhaserSceneContext<Events, RegistryShape>, time: number, delta: number) => void
  ready?: (ctx: PhaserSceneContext<Events, RegistryShape>) => void
}

export interface PhaserBridge<Events extends PhaserEventMap = PhaserEventMap> {
  on<K extends keyof Events & string>(event: K, handler: (payload: Events[K]) => void): () => void
  once<K extends keyof Events & string>(event: K, handler: (payload: Events[K]) => void): () => void
  off<K extends keyof Events & string>(event: K, handler: (payload: Events[K]) => void): void
  emit<K extends keyof Events & string>(event: K, payload: Events[K]): void
  clear(): void
}

export interface PhaserObjectRef<T> {
  object: ShallowRef<T | null>
  set: (value: T | null) => void
  clear: () => void
}

export type AssetManifest = Record<string, string>

export interface PhaserSceneComponentProps {
  sceneKey: string
  definition?: PhaserSceneDefinition
  active?: boolean
  visible?: boolean
  autoStart?: boolean
}

export interface PhaserResizeState {
  width: Ref<number>
  height: Ref<number>
  resize: (width: number, height: number) => void
}

export interface PhaserPointerState {
  pointer: ShallowRef<Phaser.Input.Pointer | null>
  worldX: Ref<number>
  worldY: Ref<number>
  isDown: Ref<boolean>
}

export interface PhaserKeyboardState {
  keys: ShallowRef<Record<string, Phaser.Input.Keyboard.Key>>
}
