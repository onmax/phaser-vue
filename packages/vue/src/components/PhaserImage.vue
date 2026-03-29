<script setup lang="ts">
import type Phaser from 'phaser'
import { useManagedPhaserObject } from '../core/object-lifecycle'
import { patchDisplayObject, type CommonDisplayProps } from '../core/patchers'

defineOptions({ name: 'PhaserImage' })

interface Props extends CommonDisplayProps {
  texture: string
  frame?: string | number
}

const props = defineProps<Props>()
const emit = defineEmits<{ ready: [object: Phaser.GameObjects.Image] }>()

const object = useManagedPhaserObject<Phaser.GameObjects.Image, CommonDisplayProps>({
  name: 'PhaserImage',
  mutableProps: () => props,
  constructorProps: () => ({ texture: props.texture, frame: props.frame }),
  create(scene, parent) {
    const image = scene.add.image(props.x ?? 0, props.y ?? 0, props.texture, props.frame)
    if (parent)
      parent.add(image)
    return image
  },
  patch(raw, next) {
    patchDisplayObject(raw, next)
  },
  emitReady(raw) {
    emit('ready', raw)
  },
})

defineExpose({ object })
</script>

<template />
