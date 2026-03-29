<script setup lang="ts">
import type Phaser from 'phaser'
import { useManagedPhaserObject } from '../core/object-lifecycle'
import { patchDisplayObject, type CommonDisplayProps } from '../core/patchers'

defineOptions({ name: 'PhaserSprite' })

interface Props extends CommonDisplayProps {
  texture: string
  frame?: string | number
  playing?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ ready: [object: Phaser.GameObjects.Sprite] }>()

const object = useManagedPhaserObject<Phaser.GameObjects.Sprite, Props>({
  name: 'PhaserSprite',
  mutableProps: () => props,
  constructorProps: () => ({ texture: props.texture, frame: props.frame }),
  create(scene, parent) {
    const sprite = scene.add.sprite(props.x ?? 0, props.y ?? 0, props.texture, props.frame)
    if (parent)
      parent.add(sprite)
    return sprite
  },
  patch(raw, next) {
    patchDisplayObject(raw, next)
    if (next.playing)
      raw.play(next.playing)
  },
  emitReady(raw) {
    emit('ready', raw)
  },
})

defineExpose({ object })
</script>

<template />
