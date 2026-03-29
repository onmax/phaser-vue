import { inject } from 'vue'
import { phaserGameScopeKey } from '../core/context'
import { getGameInstance } from '../core/instance-registry'

export function usePhaserGame(instanceId?: string) {
  const scope = inject(phaserGameScopeKey, null)
  if (scope)
    return scope.game
  if (instanceId)
    return getGameInstance(instanceId)?.game ?? null
  return null
}
