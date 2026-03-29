<script setup lang="ts">
import { provide, shallowRef } from 'vue'
import type Phaser from 'phaser'
import { phaserParentContainerKey } from '../core/context'
import { useManagedPhaserObject } from '../core/object-lifecycle'
import { patchDisplayObject, type CommonDisplayProps } from '../core/patchers'

defineOptions({ name: 'PhaserContainer' })

const props = defineProps<CommonDisplayProps>()
const emit = defineEmits<{ ready: [object: Phaser.GameObjects.Container] }>()

const queue: Array<(container: Phaser.GameObjects.Container) => void> = []
const object = useManagedPhaserObject<Phaser.GameObjects.Container, CommonDisplayProps>({
  name: 'PhaserContainer',
  mutableProps: () => props,
  constructorProps: () => ({ x: props.x, y: props.y }),
  create(scene, parent) {
    const container = scene.add.container(props.x ?? 0, props.y ?? 0)
    if (parent)
      parent.add(container)
    return container
  },
  patch(raw, next) {
    patchDisplayObject(raw, next)
    for (const task of [...queue])
      task(raw)
    queue.length = 0
  },
  emitReady(raw) {
    emit('ready', raw)
  },
})

provide(phaserParentContainerKey, {
  object,
  enqueue(entry) {
    if (object.value) {
      entry.run(object.value)
      return () => {}
    }

    const task = (container: Phaser.GameObjects.Container) => {
      entry.run(container)
    }
    queue.push(task)
    return () => {
      const index = queue.indexOf(task)
      if (index >= 0)
        queue.splice(index, 1)
    }
  },
  flushQueue() {
    if (!object.value)
      return
    for (const task of [...queue])
      task(object.value)
    queue.length = 0
  },
})

defineExpose({ object })
</script>

<template>
  <slot />
</template>
