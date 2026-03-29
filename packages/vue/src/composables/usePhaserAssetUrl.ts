import type { AssetManifest } from '../types/public'
import { inject } from 'vue'
import { phaserGameScopeKey, phaserPluginOptionsKey } from '../core/context'

export function usePhaserAssetUrl(manifest?: AssetManifest, options?: { baseUrl?: string }) {
  const gameScope = inject(phaserGameScopeKey, null)
  const pluginOptions = inject(phaserPluginOptionsKey, {})

  return function resolveAssetUrl(key: string) {
    const source = manifest?.[key] ?? key
    const baseUrl = options?.baseUrl ?? gameScope?.defaults.value.assetsBaseUrl ?? pluginOptions.defaults?.assetsBaseUrl ?? '/'
    if (/^https?:\/\//.test(source))
      return source

    const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    const normalizedPath = source.startsWith('/') ? source : `/${source}`
    return `${normalizedBase}${normalizedPath}`
  }
}
