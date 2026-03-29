import type { ShallowRef } from 'vue'
import { inject, onMounted, onUnmounted, shallowRef, useAttrs, watch } from 'vue'
import type Phaser from 'phaser'
import type { ParentContainerScope, PhaserSceneScope } from '../types/internal'
import type { PhaserObjectRef } from '../types/public'
import { phaserParentContainerKey, phaserSceneScopeKey } from './context'
import { warnDebug } from './debug'

const pointerEventNames = ['pointerdown', 'pointerup', 'pointerover', 'pointerout', 'pointermove'] as const

function bindInteractiveEvents(object: Phaser.GameObjects.GameObject, attrs: Record<string, unknown>) {
  const handlers = pointerEventNames
    .map(eventName => [eventName, attrs[`on${eventName[0].toUpperCase()}${eventName.slice(1)}`]] as const)
    .filter(([, handler]) => typeof handler === 'function')

  if (!handlers.length)
    return () => {}

  const interactive = object as Phaser.GameObjects.GameObject & { setInteractive?: () => void, on: (name: string, handler: (...args: any[]) => void) => void, off: (name: string, handler: (...args: any[]) => void) => void }
  interactive.setInteractive?.()

  for (const [eventName, handler] of handlers)
    interactive.on(eventName, handler as (...args: any[]) => void)

  return () => {
    for (const [eventName, handler] of handlers)
      interactive.off(eventName, handler as (...args: any[]) => void)
  }
}

export function createPhaserObjectRef<T>(): PhaserObjectRef<T> {
  const object: ShallowRef<T | null> = shallowRef(null)
  return {
    object,
    set(value) {
      object.value = value
    },
    clear() {
      object.value = null
    },
  }
}

export function useManagedPhaserObject<T extends Phaser.GameObjects.GameObject, MutableProps extends object>(options: {
  name: string
  mutableProps: () => MutableProps
  constructorProps: () => Record<string, unknown>
  create: (scene: Phaser.Scene, parent: ParentContainerScope['object']['value']) => T
  patch: (object: T, next: MutableProps, previous: MutableProps | undefined) => void
  emitReady?: (object: T) => void
  onExposed?: (object: ShallowRef<T | null>) => void
}): ShallowRef<T | null> {
  const sceneScope = inject(phaserSceneScopeKey, null)
  const parentScope = inject(phaserParentContainerKey, null)
  const attrs = useAttrs()
  const object: ShallowRef<T | null> = shallowRef(null)
  const cleanupFns = new Set<() => void>()
  let previousMutableProps: MutableProps | undefined
  let previousConstructorProps = options.constructorProps()

  function cleanup() {
    for (const cleanupFn of cleanupFns)
      cleanupFn()
    cleanupFns.clear()

    object.value?.destroy?.()
    object.value = null
  }

  function createObject(scene: Phaser.Scene) {
    const run = (parent: ParentContainerScope['object']['value']) => {
      if (object.value)
        return

      const raw = options.create(scene, parent)
      object.value = raw
      cleanupFns.add(bindInteractiveEvents(raw, attrs))
      options.patch(raw, options.mutableProps(), previousMutableProps)
      previousMutableProps = options.mutableProps()
      options.emitReady?.(raw)
    }

    if (parentScope) {
      cleanupFns.add(parentScope.enqueue({ run }))
      return
    }

    run(null)
  }

  onMounted(() => {
    if (!sceneScope) {
      warnDebug(`${options.name} must be used inside <PhaserScene>.`, true)
      return
    }

    cleanupFns.add(sceneScope.enqueue({ run: createObject }))
  })

  watch(options.mutableProps, (next) => {
    if (!object.value)
      return
    options.patch(object.value, next, previousMutableProps)
    previousMutableProps = next
  }, { deep: true })

  watch(options.constructorProps, (next) => {
    if (!object.value)
      return

    if (JSON.stringify(next) !== JSON.stringify(previousConstructorProps))
      warnDebug(`${options.name} received a constructor-only prop change. The object was kept and the new value was ignored.`, true)

    previousConstructorProps = next
  }, { deep: true })

  onUnmounted(cleanup)
  options.onExposed?.(object as ShallowRef<T | null>)
  return object
}
