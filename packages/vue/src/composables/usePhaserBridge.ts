import type { PhaserBridge, PhaserEventMap } from '../types/public'
import { inject } from 'vue'
import { phaserGameScopeKey } from '../core/context'
import { getGameInstance } from '../core/instance-registry'

export function usePhaserBridge<Events extends PhaserEventMap = PhaserEventMap>(instanceId?: string) {
  const scope = inject(phaserGameScopeKey, null)
  if (scope)
    return scope.bridge as PhaserBridge<Events>
  return (instanceId ? getGameInstance(instanceId)?.bridge : null) as PhaserBridge<Events> | null
}
