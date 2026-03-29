import type { PhaserGameScope } from '../types/internal'

const instances = new Map<string, PhaserGameScope>()
let uid = 0

export function createInstanceId() {
  uid += 1
  return `phaser-game-${uid}`
}

export function registerGameInstance(scope: PhaserGameScope) {
  instances.set(scope.instanceId, scope)
}

export function unregisterGameInstance(instanceId: string) {
  instances.delete(instanceId)
}

export function getGameInstance(instanceId: string) {
  return instances.get(instanceId) ?? null
}
