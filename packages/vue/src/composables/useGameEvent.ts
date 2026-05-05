import { watch } from 'vue'
import { usePhaserGame } from './usePhaserGame'

export function useGameEvent(event: string, handler: (...args: any[]) => void, instanceId?: string) {
  const game = usePhaserGame(instanceId)
  if (game) {
    watch(game, (current, _, onCleanup) => {
      if (!current)
        return

      current.events.on(event, handler)
      onCleanup(() => current.events.off(event, handler))
    }, { immediate: true })
  }
}
