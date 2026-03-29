import type Phaser from 'phaser'
import { onUnmounted, shallowRef, watch } from 'vue'
import { useActivePhaserScene } from './usePhaserScene'

export function usePhaserKeyboard(keys: string | string[]) {
  const scene = useActivePhaserScene()
  const resolvedKeys = Array.isArray(keys) ? keys : [keys]
  const keyMap = shallowRef<Record<string, Phaser.Input.Keyboard.Key>>({})

  watch(scene, () => {
    if (!scene.value?.input.keyboard)
      return

    const created = scene.value.input.keyboard.addKeys(resolvedKeys.join(',')) as Record<string, Phaser.Input.Keyboard.Key>
    keyMap.value = created
  }, { immediate: true })

  onUnmounted(() => {
    Object.values(keyMap.value).forEach(key => key.destroy())
  })

  return { keys: keyMap }
}
