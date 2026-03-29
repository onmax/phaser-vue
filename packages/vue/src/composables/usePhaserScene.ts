import { computed, inject, shallowRef } from 'vue'
import { phaserGameScopeKey, phaserSceneScopeKey } from '../core/context'

export function useActivePhaserScene() {
  const scope = inject(phaserSceneScopeKey, null)
  return scope?.record.scene ?? shallowRef(null)
}

export function usePhaserScene(key?: string) {
  const activeScene = inject(phaserSceneScopeKey, null)
  const gameScope = inject(phaserGameScopeKey, null)

  if (!key)
    return activeScene?.record.scene ?? shallowRef(null)

  return computed(() => gameScope?.scenes.get(key)?.scene.value ?? null)
}
