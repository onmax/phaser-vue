import type { PhaserEventMap, PhaserSceneDefinition } from '../types/public'

export function definePhaserScene<Events extends PhaserEventMap = PhaserEventMap, RegistryShape extends Record<string, unknown> = Record<string, unknown>>(
  definition: PhaserSceneDefinition<Events, RegistryShape>,
) {
  return definition
}
