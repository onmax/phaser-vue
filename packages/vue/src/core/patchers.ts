import type Phaser from 'phaser'

type BasicDisplayObject = Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.Visible & Phaser.GameObjects.Components.AlphaSingle & Partial<Phaser.GameObjects.Components.Depth> & {
  setOrigin?: (x?: number, y?: number) => void
  setScale?: (x?: number, y?: number) => void
  setFlipX?: (value: boolean) => void
  setFlipY?: (value: boolean) => void
  setScrollFactor?: (x: number, y?: number) => void
  setTint?: (...values: number[]) => void
}

export interface CommonDisplayProps {
  x?: number
  y?: number
  alpha?: number
  angle?: number
  rotation?: number
  visible?: boolean
  depth?: number
  originX?: number
  originY?: number
  scale?: number
  scaleX?: number
  scaleY?: number
  flipX?: boolean
  flipY?: boolean
  scrollFactorX?: number
  scrollFactorY?: number
  tint?: number
}

export function patchDisplayObject(object: BasicDisplayObject, next: CommonDisplayProps) {
  if (next.x != null)
    object.x = next.x
  if (next.y != null)
    object.y = next.y
  if (next.alpha != null)
    object.alpha = next.alpha
  if (next.angle != null)
    object.angle = next.angle
  if (next.rotation != null)
    object.rotation = next.rotation
  if (next.visible != null)
    object.visible = next.visible
  if (next.depth != null && 'depth' in object)
    object.depth = next.depth
  if (next.originX != null || next.originY != null)
    object.setOrigin?.(next.originX, next.originY)
  if (next.scale != null)
    object.setScale?.(next.scale)
  else if (next.scaleX != null || next.scaleY != null)
    object.setScale?.(next.scaleX ?? 1, next.scaleY ?? next.scaleX ?? 1)
  if (next.flipX != null)
    object.setFlipX?.(next.flipX)
  if (next.flipY != null)
    object.setFlipY?.(next.flipY)
  if (next.scrollFactorX != null || next.scrollFactorY != null)
    object.setScrollFactor?.(next.scrollFactorX ?? 1, next.scrollFactorY ?? next.scrollFactorX ?? 1)
  if (next.tint != null)
    object.setTint?.(next.tint)
}
