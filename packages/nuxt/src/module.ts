import { addComponent, addImports, addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { version } from '../package.json'
import type { NuxtPhaserModuleOptions, ResolvedNuxtPhaserModuleOptions } from './types'

export * from './types'

const coreImports = [
  'createPhaserBridge',
  'defineAssetManifest',
  'definePhaserScene',
  'useActivePhaserScene',
  'useGameEvent',
  'usePhaserAssetUrl',
  'usePhaserBridge',
  'usePhaserGame',
  'usePhaserKeyboard',
  'usePhaserObjectRef',
  'usePhaserPointer',
  'usePhaserRegistry',
  'usePhaserResize',
  'usePhaserScene',
  'useSceneEvent',
] as const

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

export default defineNuxtModule<NuxtPhaserModuleOptions>({
  meta: {
    name: '@onmax/nuxt-phaser',
    version,
    configKey: 'phaser',
    compatibility: { nuxt: '>=4.0.0' },
  },
  defaults: resolveModuleOptions(),
  setup(options, nuxt) {
    const resolved = resolveModuleOptions(options)
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.phaser = defu(
      nuxt.options.runtimeConfig.public.phaser as Record<string, unknown> | undefined,
      resolved,
    )

    addPlugin(resolve('./runtime/plugin'))

    const aliasTemplate = addTemplate({
      filename: 'phaser/index.mjs',
      getContents: () => `export * from '@onmax/phaser-vue'\n`,
      write: true,
    })

    addTypeTemplate({
      filename: 'types/phaser.d.ts',
      getContents: () => `declare module '#phaser' {\n  export * from '@onmax/phaser-vue'\n}\n`,
    }, { nitro: true, nuxt: true })

    nuxt.options.alias['#phaser'] = aliasTemplate.dst

    if (resolved.autoImports)
      addImports(coreImports.map(name => ({ name, from: '#phaser' })))

    if (resolved.components) {
      const prefix = resolved.componentPrefix
      addComponent({ name: `${prefix}Game`, export: 'PhaserGame', filePath: '@onmax/phaser-vue', global: true })
      addComponent({ name: `${prefix}Scene`, export: 'PhaserScene', filePath: '@onmax/phaser-vue', global: true })
      addComponent({ name: `${prefix}Container`, export: 'PhaserContainer', filePath: '@onmax/phaser-vue', global: true })
      addComponent({ name: `${prefix}Image`, export: 'PhaserImage', filePath: '@onmax/phaser-vue', global: true })
      addComponent({ name: `${prefix}Sprite`, export: 'PhaserSprite', filePath: '@onmax/phaser-vue', global: true })
      addComponent({ name: `${prefix}Text`, export: 'PhaserText', filePath: '@onmax/phaser-vue', global: true })
      addComponent({ name: `Nuxt${prefix}Game`, filePath: resolve('./runtime/components/NuxtPhaserGame.vue'), global: true })
    }
  },
})
