import { onUnmounted, reactive, shallowRef, watch } from 'vue'
import { usePhaserScene } from './usePhaserScene'

export function usePhaserRegistry<T extends Record<string, unknown> = Record<string, unknown>>(sceneKey?: string) {
  const scene = usePhaserScene(sceneKey)
  const state = reactive({} as T)
  const ready = shallowRef(false)
  let stop: (() => void) | null = null

  function attach() {
    stop?.()
    const current = scene.value
    if (!current)
      return

    ready.value = true
    Object.assign(state, current.registry.values as T)
    const update = () => {
      Object.assign(state, current.registry.values as T)
    }
    current.registry.events.on('changedata', update)
    stop = () => current.registry.events.off('changedata', update)
  }

  watch(scene, attach, { immediate: true })
  onUnmounted(() => stop?.())

  return {
    state,
    ready,
    get<K extends keyof T>(key: K) {
      return (state as T)[key]
    },
    set<K extends keyof T>(key: K, value: T[K]) {
      scene.value?.registry.set(key as string, value)
    },
  }
}
