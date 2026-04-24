export function isClient() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

let phaserRuntimePromise: Promise<any> | null = null

export async function loadPhaserRuntime() {
  if (!isClient())
    return null

  if (!phaserRuntimePromise) {
    phaserRuntimePromise = import('phaser').then((module) => {
      return module.default ?? module
    })
  }

  return phaserRuntimePromise
}

export async function preloadPhaserRuntime() {
  return loadPhaserRuntime()
}
