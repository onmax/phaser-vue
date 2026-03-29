import type Phaser from 'phaser'
import type { PhaserGameScope, SceneRecord } from '../types/internal'
import type { PhaserBridge, PhaserGameProps, PhaserGameRuntimeDefaults, PhaserSceneDefinition } from '../types/public'
import { computed, shallowRef } from 'vue'
import { createPhaserBridge } from './bridge'
import { warnDebug } from './debug'
import { createInstanceId, registerGameInstance, unregisterGameInstance } from './instance-registry'
import { createManagedSceneClass, registerManagedScene } from './scene-manager'
import { isClient, loadPhaserRuntime } from './ssr'

const defaultRuntimeDefaults: Required<PhaserGameRuntimeDefaults> = {
  pixelArt: false,
  transparent: false,
  suspendWhenHidden: true,
  assetsBaseUrl: '/',
}

function isSceneDefinition(value: unknown): value is PhaserSceneDefinition {
  return !!value && typeof value === 'object' && 'key' in (value as Record<string, unknown>)
}

export function createGameManager(options: {
  props: Readonly<PhaserGameProps>
  emit: (event: 'ready' | 'destroyed' | 'error', payload?: unknown) => void
  pluginDefaults?: PhaserGameRuntimeDefaults
}) {
  const game = shallowRef<Phaser.Game | null>(null)
  const mounted = shallowRef(false)
  const containerEl = shallowRef<HTMLElement | null>(null)
  const instanceId = options.props.instanceId || createInstanceId()
  const bridge = createPhaserBridge()
  const scenes = new Map<string, SceneRecord>()

  const defaults = computed(() => ({
    ...defaultRuntimeDefaults,
    ...options.pluginDefaults,
  }))

  const debug = computed(() => Boolean(options.props.debug))

  async function buildSceneEntries(PhaserRuntime: typeof Phaser) {
    const managed = Array.from(scenes.values()).map(record => createManagedSceneClass(scope, record, PhaserRuntime))
    const external = (options.props.scenes ?? []).map((sceneEntry) => {
      if (isSceneDefinition(sceneEntry))
        return createManagedSceneClass(scope, registerManagedScene(scope, { key: sceneEntry.key, definition: sceneEntry, active: shallowRef(true), visible: shallowRef(true), autoStart: shallowRef(true) })!, PhaserRuntime)
      return sceneEntry
    })
    return [...managed, ...external]
  }

  async function mount() {
    if (!isClient()) {
      warnDebug('PhaserGame attempted to mount during SSR. Rendering stays inert until client mount.', debug.value)
      return
    }

    if (!containerEl.value)
      return

    const PhaserRuntime = await loadPhaserRuntime()
    if (!PhaserRuntime)
      return

    for (const record of scenes.values())
      record.reset()

    const sceneEntries = await buildSceneEntries(PhaserRuntime)
    const nextConfig: Phaser.Types.Core.GameConfig = {
      type: PhaserRuntime.AUTO,
      parent: containerEl.value,
      width: options.props.width ?? options.props.config?.width ?? 800,
      height: options.props.height ?? options.props.config?.height ?? 600,
      autoFocus: options.props.autoFocus ?? true,
      backgroundColor: options.props.backgroundColor,
      transparent: options.props.transparent ?? defaults.value.transparent,
      pixelArt: options.props.pixelArt ?? defaults.value.pixelArt,
      scene: sceneEntries,
      ...options.props.config,
    }

    if (options.props.suspendWhenHidden ?? defaults.value.suspendWhenHidden) {
      ;(nextConfig as Phaser.Types.Core.GameConfig & { disableVisibilityChange?: boolean }).disableVisibilityChange = false
    }

    try {
      game.value = new PhaserRuntime.Game(nextConfig)
      mounted.value = true
      options.emit('ready', game.value)
    }
    catch (error) {
      options.emit('error', error)
      warnDebug(`Unable to create Phaser game: ${error instanceof Error ? error.message : String(error)}`, true)
    }
  }

  async function recreate() {
    destroy(false, false)
    await mount()
  }

  function destroy(emitEvent = true, removeInstance = true) {
    if (game.value) {
      game.value.destroy(true)
      game.value = null
    }
    mounted.value = false
    if (removeInstance)
      unregisterGameInstance(instanceId)
    if (emitEvent)
      options.emit('destroyed')
  }

  const scope: PhaserGameScope = {
    instanceId,
    game,
    containerEl,
    mounted,
    bridge: bridge as PhaserBridge,
    debug,
    defaults,
    scenes,
    registerScene(input) {
      return registerManagedScene(scope, input)
    },
    unregisterScene(key) {
      scenes.delete(key)
    },
    recreate,
    destroy() {
      destroy()
    },
  }

  registerGameInstance(scope)

  return {
    scope,
    mount,
    destroy,
    recreate,
  }
}
