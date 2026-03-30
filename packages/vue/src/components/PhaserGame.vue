<script setup lang="ts">
import type { PhaserGameExpose, PhaserGameProps } from '../types/public'
import { computed, inject, onMounted, onUnmounted, provide, watch } from 'vue'
import { phaserGameScopeKey, phaserPluginOptionsKey } from '../core/context'
import { warnDebug } from '../core/debug'
import { createGameManager } from '../core/game-manager'

defineOptions({ name: 'PhaserGame' })

const props = withDefaults(defineProps<PhaserGameProps>(), {
  autoFocus: true,
  autoStart: true,
  hmrStrategy: 'recreate',
})

const emit = defineEmits<{
  ready: [game: unknown]
  destroyed: []
  error: [error: unknown]
}>()

const pluginOptions = inject(phaserPluginOptionsKey, {})
const manager = createGameManager({
  props,
  emit: (event, payload) => {
    if (event === 'destroyed')
      emit('destroyed')
    else if (event === 'ready')
      emit('ready', payload)
    else
      emit('error', payload)
  },
  pluginDefaults: pluginOptions.defaults,
})

provide(phaserGameScopeKey, manager.scope)
const containerEl = manager.scope.containerEl

function normalizeDimension(value: number | string | undefined) {
  return typeof value === 'number' ? `${value}px` : value
}

const hostStyle = computed(() => ({
  width: normalizeDimension(props.width),
  height: normalizeDimension(props.height),
}))

const structuralSignature = computed(() => JSON.stringify({
  width: props.width,
  height: props.height,
  pixelArt: props.pixelArt,
  transparent: props.transparent,
  backgroundColor: props.backgroundColor,
  autoFocus: props.autoFocus,
  suspendWhenHidden: props.suspendWhenHidden,
  config: props.config,
  scenes: (props.scenes ?? []).length,
  managedScenes: [...manager.scope.scenes.keys()],
}))

watch(structuralSignature, async (_, previous) => {
  if (!manager.scope.mounted.value || previous == null)
    return

  if (props.hmrStrategy === 'preserve')
    warnDebug('hmrStrategy="preserve" is not implemented yet in alpha. Falling back to recreate.', manager.scope.debug.value)

  await manager.recreate()
})

onMounted(manager.mount)
onUnmounted(() => manager.destroy())

const exposeApi: PhaserGameExpose = {
  game: manager.scope.game,
  mounted: manager.scope.mounted,
  containerEl: manager.scope.containerEl,
  bridge: manager.scope.bridge,
}

defineExpose(exposeApi)
</script>

<template>
  <div class="phaser-game-host" :style="hostStyle">
    <slot v-if="!manager.scope.mounted.value" name="placeholder" />
    <div
      ref="containerEl"
      class="phaser-game-canvas"
      :style="hostStyle"
    />
    <div class="phaser-game-scenes" aria-hidden="true">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.phaser-game-host {
  position: relative;
  display: block;
}

.phaser-game-canvas {
  display: grid;
}

.phaser-game-scenes {
  display: none;
}
</style>
