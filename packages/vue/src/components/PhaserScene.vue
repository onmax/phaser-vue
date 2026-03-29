<script setup lang="ts">
import { computed, inject, onUnmounted, provide, shallowRef, watch } from 'vue'
import type { PhaserSceneComponentProps } from '../types/public'
import { phaserGameScopeKey, phaserSceneScopeKey } from '../core/context'
import { warnDebug } from '../core/debug'

defineOptions({ name: 'PhaserScene' })

const props = withDefaults(defineProps<PhaserSceneComponentProps>(), {
  active: true,
  visible: true,
  autoStart: true,
})

const gameScope = inject(phaserGameScopeKey, null)

if (!gameScope)
  warnDebug('<PhaserScene> must be nested inside <PhaserGame>.', true)

const active = computed(() => props.active)
const visible = computed(() => props.visible)
const autoStart = computed(() => props.autoStart)
const definition = computed(() => props.definition ?? { key: props.sceneKey })

const record = gameScope?.registerScene({
  key: props.sceneKey,
  definition: definition.value,
  active: shallowRef(active.value),
  visible: shallowRef(visible.value),
  autoStart: shallowRef(autoStart.value),
}) ?? null

watch(active, (value) => {
  if (!record)
    return
  record.active.value = value
  record.scene.value?.scene.setActive(value)
})

watch(visible, (value) => {
  if (!record)
    return
  record.visible.value = value
  record.scene.value?.scene.setVisible(value)
})

if (record) {
  provide(phaserSceneScopeKey, {
    key: record.key,
    record,
    enqueue(entry) {
      if (record.ready.value && record.scene.value) {
        entry.run(record.scene.value)
        return () => {}
      }

      record.queue.push(entry)
      return () => {
        const index = record.queue.indexOf(entry)
        if (index >= 0)
          record.queue.splice(index, 1)
      }
    },
  })
}

onUnmounted(() => {
  if (record)
    gameScope?.unregisterScene(record.key)
})
</script>

<template>
  <slot />
</template>
