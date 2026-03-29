import type { PhaserBridge, PhaserEventMap } from '../types/public'

export function createPhaserBridge<Events extends PhaserEventMap = PhaserEventMap>(): PhaserBridge<Events> {
  const listeners = new Map<string, Set<(payload: unknown) => void>>()

  function on(event: string, handler: (payload: unknown) => void) {
    if (!listeners.has(event))
      listeners.set(event, new Set())
    listeners.get(event)!.add(handler)
    return () => off(event, handler)
  }

  function once(event: string, handler: (payload: unknown) => void) {
    const cleanup = on(event, (payload) => {
      cleanup()
      handler(payload)
    })
    return cleanup
  }

  function off(event: string, handler: (payload: unknown) => void) {
    listeners.get(event)?.delete(handler)
  }

  function emit(event: string, payload: unknown) {
    listeners.get(event)?.forEach(listener => listener(payload))
  }

  function clear() {
    listeners.clear()
  }

  return {
    on: on as PhaserBridge<Events>['on'],
    once: once as PhaserBridge<Events>['once'],
    off: off as PhaserBridge<Events>['off'],
    emit: emit as PhaserBridge<Events>['emit'],
    clear,
  }
}
