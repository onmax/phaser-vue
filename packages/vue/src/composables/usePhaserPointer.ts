import type Phaser from 'phaser'
import { ref, shallowRef, watch } from 'vue'
import { useActivePhaserScene } from './usePhaserScene'

export function usePhaserPointer() {
  const scene = useActivePhaserScene()
  const pointer = shallowRef<Phaser.Input.Pointer | null>(null)
  const worldX = ref(0)
  const worldY = ref(0)
  const isDown = ref(false)

  watch(scene, (current, _, onCleanup) => {
    if (!current)
      return

    const handle = (nextPointer: Phaser.Input.Pointer) => {
      pointer.value = nextPointer
      worldX.value = nextPointer.worldX
      worldY.value = nextPointer.worldY
      isDown.value = nextPointer.isDown
    }

    current.input.on('pointermove', handle)
    current.input.on('pointerdown', handle)
    current.input.on('pointerup', handle)
    onCleanup(() => {
      current.input.off('pointermove', handle)
      current.input.off('pointerdown', handle)
      current.input.off('pointerup', handle)
    })
  }, { immediate: true })

  return { pointer, worldX, worldY, isDown }
}
