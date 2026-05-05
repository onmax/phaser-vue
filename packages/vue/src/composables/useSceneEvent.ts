import { watch } from 'vue'
import { useActivePhaserScene, usePhaserScene } from './usePhaserScene'

export function useSceneEvent(event: string, handler: (...args: any[]) => void, sceneKey?: string) {
  const scene = sceneKey ? usePhaserScene(sceneKey) : useActivePhaserScene()
  watch(scene, (current, _, onCleanup) => {
    if (!current)
      return

    current.events.on(event, handler)
    onCleanup(() => current.events.off(event, handler))
  }, { immediate: true })
}
