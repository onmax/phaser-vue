import type Phaser from 'phaser'
import type { PhaserBridge, PhaserEventMap, PhaserGameExpose, PhaserSceneDefinition, PhaserVuePluginOptions } from '../types/public'
import type { FakePhaserRuntimeController } from './fake-phaser'
import { definePhaserScene } from '../scene/definePhaserScene'
import { getFakePhaserRuntimeController, installFakePhaserRuntime, resetFakePhaserRuntime } from './fake-phaser'

export interface PhaserTestHarness<Events extends PhaserEventMap = PhaserEventMap> {
  controller: FakePhaserRuntimeController
  bridge: PhaserBridge<Events> | null
  pluginOptions: PhaserVuePluginOptions
  reset: () => void
  attachExpose: (expose: PhaserGameExpose | null | undefined) => void
  getGames: () => Phaser.Game[]
  getScenes: () => Phaser.Scene[]
  getObjects: () => Phaser.GameObjects.GameObject[]
}

type PhaserHarnessTarget = PhaserTestHarness | { harness?: PhaserTestHarness } | undefined

let sceneCounter = 0

export function createFakeSceneDefinition<Events extends PhaserEventMap = PhaserEventMap>(
  definition: Partial<PhaserSceneDefinition<Events>> = {},
) {
  return definePhaserScene<Events>({
    key: definition.key ?? `fake-scene-${++sceneCounter}`,
    ...definition,
  })
}

export function createPhaserTestHarness<Events extends PhaserEventMap = PhaserEventMap>(options: {
  pluginOptions?: PhaserVuePluginOptions
} = {}): PhaserTestHarness<Events> {
  const controller = installFakePhaserRuntime()
  const harness: PhaserTestHarness<Events> = {
    controller,
    bridge: null,
    pluginOptions: options.pluginOptions ?? {},
    reset() {
      resetFakePhaserRuntime()
      harness.bridge = null
    },
    attachExpose(expose) {
      harness.bridge = (expose?.bridge as PhaserBridge<Events> | undefined) ?? null
    },
    getGames() {
      return controller.state.games as unknown as Phaser.Game[]
    },
    getScenes() {
      return controller.state.scenes as unknown as Phaser.Scene[]
    },
    getObjects() {
      return controller.state.objects as unknown as Phaser.GameObjects.GameObject[]
    },
  }

  return harness
}

function resolveHarness(target?: PhaserHarnessTarget) {
  if (target && 'getGames' in target)
    return target

  return target?.harness ?? createPhaserTestHarness()
}

export function getPhaserGame(target?: PhaserHarnessTarget) {
  const harness = resolveHarness(target)
  return harness.getGames().at(-1) ?? harness.getScenes().at(-1)?.game ?? null
}

export function getManagedScene(target?: PhaserHarnessTarget, key?: string) {
  const harness = resolveHarness(target)
  const scenes = harness.getScenes()
  if (!key)
    return scenes.at(-1) ?? null

  return scenes.find((scene: Phaser.Scene) => {
    const sceneKey = (scene as unknown as { key?: string }).key
    const settingsKey = (scene as unknown as { settings?: { key?: string } }).settings?.key
    return sceneKey === key || settingsKey === key
  }) ?? null
}

export function getPhaserObject(
  target?: PhaserHarnessTarget,
  predicate?: (object: Phaser.GameObjects.GameObject) => boolean,
) {
  const harness = resolveHarness(target)
  const objects = harness.getObjects()
  if (!predicate)
    return objects.at(-1) ?? null
  return objects.find(predicate) ?? null
}

export function getInstalledFakePhaserRuntime() {
  return getFakePhaserRuntimeController()
}
