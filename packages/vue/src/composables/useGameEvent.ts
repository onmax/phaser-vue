import { onUnmounted, watch } from 'vue'
import { usePhaserGame } from './usePhaserGame'

export function useGameEvent(event: string, handler: (...args: any[]) => void, instanceId?: string) {
  const game = usePhaserGame(instanceId)
  if (game) {
    watch(game, () => {
      game.value?.events.on(event, handler)
    }, { immediate: true })
    onUnmounted(() => game.value?.events.off(event, handler))
  }
}
