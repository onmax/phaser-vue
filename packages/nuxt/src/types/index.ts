export interface NuxtPhaserModuleOptions {
  autoImports?: boolean
  components?: boolean
  componentPrefix?: string
  clientOnly?: boolean
  debug?: boolean
  devtools?: boolean
  defaults?: {
    pixelArt?: boolean
    transparent?: boolean
    suspendWhenHidden?: boolean
    assetsBaseUrl?: string
  }
}

export interface ResolvedNuxtPhaserModuleOptions extends Required<Omit<NuxtPhaserModuleOptions, 'defaults'>> {
  defaults: Required<NonNullable<NuxtPhaserModuleOptions['defaults']>>
}
