<script setup lang="ts">
import type Phaser from 'phaser'
import type { CommonDisplayProps } from '../core/patchers'
import { useManagedPhaserObject } from '../core/object-lifecycle'
import { patchDisplayObject } from '../core/patchers'

defineOptions({ name: 'PhaserText' })

const props = defineProps<Props>()

const emit = defineEmits<{ ready: [object: Phaser.GameObjects.Text] }>()

interface Props extends CommonDisplayProps {
  text: string
  style?: Phaser.Types.GameObjects.Text.TextStyle
}

const object = useManagedPhaserObject<Phaser.GameObjects.Text, Props>({
  name: 'PhaserText',
  mutableProps: () => props,
  constructorProps: () => ({ style: props.style }),
  create(scene, parent) {
    const text = scene.add.text(props.x ?? 0, props.y ?? 0, props.text, props.style)
    if (parent)
      parent.add(text)
    return text
  },
  patch(raw, next) {
    patchDisplayObject(raw, next)
    raw.setText(next.text)
    if (next.style)
      raw.setStyle(next.style)
  },
  emitReady(raw) {
    emit('ready', raw)
  },
})

defineExpose({ object })
</script>

<template />
