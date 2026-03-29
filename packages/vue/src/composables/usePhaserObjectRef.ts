import { createPhaserObjectRef } from '../core/object-lifecycle'

export function usePhaserObjectRef<T>() {
  return createPhaserObjectRef<T>()
}
