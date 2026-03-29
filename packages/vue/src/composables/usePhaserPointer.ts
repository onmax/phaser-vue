import { onUnmounted, ref, shallowRef, watch } from 'vue'
import type Phaser from 'phaser'
import { useActivePhaserScene } from './usePhaserScene'

export function usePhaserPointer() {
  const scene = useActivePhaserScene()
  const pointer = shallowRef<Phaser.Input.Pointer | null>(null)
  const worldX = ref(0)
  const worldY = ref(0)
  const isDown = ref(false)
  let stop: (() => void) | null = null

  watch(scene, () => {
    stop?.()
    if (!scene.value)
      return

    const handle = (nextPointer: Phaser.Input.Pointer) => {
      pointer.value = nextPointer
      worldX.value = nextPointer.worldX
      worldY.value = nextPointer.worldY
      isDown.value = nextPointer.isDown
    }

    scene.value.input.on('pointermove', handle)
    scene.value.input.on('pointerdown', handle)
    scene.value.input.on('pointerup', handle)
    stop = () => {
      scene.value?.input.off('pointermove', handle)
      scene.value?.input.off('pointerdown', handle)
      scene.value?.input.off('pointerup', handle)
    }
  }, { immediate: true })

  onUnmounted(() => stop?.())
  return { pointer, worldX, worldY, isDown }
}
