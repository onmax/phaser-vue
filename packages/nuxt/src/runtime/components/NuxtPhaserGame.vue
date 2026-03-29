<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{ instanceId?: string }>()
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <ClientOnly v-if="runtimeConfig.public.phaser.clientOnly">
    <PhaserGame v-bind="$attrs" :instance-id="props.instanceId">
      <template v-if="$slots.placeholder" #placeholder>
        <slot name="placeholder" />
      </template>
      <slot />
    </PhaserGame>
  </ClientOnly>
  <PhaserGame v-else v-bind="$attrs" :instance-id="props.instanceId">
    <template v-if="$slots.placeholder" #placeholder>
      <slot name="placeholder" />
    </template>
    <slot />
  </PhaserGame>
</template>
