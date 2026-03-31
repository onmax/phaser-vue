import type { NuxtPhaserModuleOptions, ResolvedNuxtPhaserModuleOptions } from './types'

export function resolveModuleOptions(options: NuxtPhaserModuleOptions = {}): ResolvedNuxtPhaserModuleOptions {
  return {
    autoImports: options.autoImports ?? true,
    components: options.components ?? true,
    componentPrefix: options.componentPrefix ?? 'Phaser',
    clientOnly: options.clientOnly ?? true,
    debug: options.debug ?? false,
    devtools: options.devtools ?? false,
    defaults: {
      pixelArt: options.defaults?.pixelArt ?? false,
      transparent: options.defaults?.transparent ?? false,
      suspendWhenHidden: options.defaults?.suspendWhenHidden ?? true,
      assetsBaseUrl: options.defaults?.assetsBaseUrl ?? '/',
    },
  }
}
