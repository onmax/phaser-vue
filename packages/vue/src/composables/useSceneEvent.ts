import { onUnmounted, watch } from 'vue'
import { useActivePhaserScene, usePhaserScene } from './usePhaserScene'

export function useSceneEvent(event: string, handler: (...args: any[]) => void, sceneKey?: string) {
  const scene = sceneKey ? usePhaserScene(sceneKey) : useActivePhaserScene()
  watch(scene, () => scene.value?.events.on(event, handler), { immediate: true })
  onUnmounted(() => scene.value?.events.off(event, handler))
}
