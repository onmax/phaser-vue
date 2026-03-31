import type { NuxtPhaserModuleOptions, ResolvedNuxtPhaserModuleOptions } from './types'
import { defu } from 'defu'
import { resolveModuleOptions } from './options'

export interface NuxtPhaserRuntimeConfig {
  app: {
    baseURL: string
    buildAssetsDir: string
  }
  public: {
    phaser: ResolvedNuxtPhaserModuleOptions
  }
}

export interface NuxtPhaserTestingSetup {
  runtimeConfig: NuxtPhaserRuntimeConfig
  resetRuntime: () => void
}

export interface NuxtPhaserTestingOptions {
  runtimeConfig?: NuxtPhaserModuleOptions
}

async function ensureFakePhaserRuntime() {
  const testingSpecifier = '@onmax/phaser-vue/testing'
  const { installFakePhaserRuntime } = await import(/* @vite-ignore */ testingSpecifier)
  installFakePhaserRuntime({ reset: true })
}

export function withPhaserRuntimeConfig(overrides: NuxtPhaserModuleOptions = {}): NuxtPhaserRuntimeConfig {
  return {
    app: {
      baseURL: '/',
      buildAssetsDir: '/_nuxt/',
    },
    public: {
      phaser: defu(overrides, resolveModuleOptions()),
    },
  }
}

export function withNuxtPhaserTesting(options: NuxtPhaserTestingOptions = {}): NuxtPhaserTestingSetup {
  return {
    runtimeConfig: withPhaserRuntimeConfig(options.runtimeConfig),
    resetRuntime() {
      return undefined
    },
  }
}

export async function mountSuspendedWithPhaser<T>(
  component: T,
  options?: any,
): Promise<any> {
  await ensureFakePhaserRuntime()
  const runtimeSpecifier = '@nuxt/test-utils/runtime'
  const { mountSuspended } = await import(/* @vite-ignore */ runtimeSpecifier)
  return mountSuspended(component, options)
}

export async function renderSuspendedWithPhaser<T>(
  component: T,
  options?: any,
): Promise<any> {
  await ensureFakePhaserRuntime()
  const runtimeSpecifier = '@nuxt/test-utils/runtime'
  const { renderSuspended } = await import(/* @vite-ignore */ runtimeSpecifier)
  return renderSuspended(component, options)
}
