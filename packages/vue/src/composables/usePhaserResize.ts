import { computed } from 'vue'
import { usePhaserGame } from './usePhaserGame'

export function usePhaserResize(instanceId?: string) {
  const game = usePhaserGame(instanceId)

  return {
    width: computed(() => game?.value?.scale.width ?? 0),
    height: computed(() => game?.value?.scale.height ?? 0),
    resize(width: number, height: number) {
      game?.value?.scale.resize(width, height)
    },
  }
}
