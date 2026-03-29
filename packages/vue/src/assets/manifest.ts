import type { AssetManifest } from '../types/public'

export function defineAssetManifest<const T extends AssetManifest>(manifest: T) {
  return manifest
}
