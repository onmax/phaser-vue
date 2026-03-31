import type { NuxtPhaserRuntimeConfig } from '../../src/testing'
import { withPhaserRuntimeConfig } from '../../src/testing'

let runtimeConfig: NuxtPhaserRuntimeConfig = withPhaserRuntimeConfig()

export function setBrowserRuntimeConfig(next: NuxtPhaserRuntimeConfig) {
  runtimeConfig = next
}

export function useRuntimeConfig() {
  return runtimeConfig
}
