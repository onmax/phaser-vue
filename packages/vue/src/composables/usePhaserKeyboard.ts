import type Phaser from 'phaser'
import { shallowRef, watch } from 'vue'
import { useActivePhaserScene } from './usePhaserScene'

export function usePhaserKeyboard(keys: string | string[]) {
  const scene = useActivePhaserScene()
  const resolvedKeys = Array.isArray(keys) ? keys : [keys]
  const keyMap = shallowRef<Record<string, Phaser.Input.Keyboard.Key>>({})

  watch(scene, (current, _, onCleanup) => {
    if (!current?.input.keyboard)
      return

    const created = current.input.keyboard.addKeys(resolvedKeys.join(',')) as Record<string, Phaser.Input.Keyboard.Key>
    keyMap.value = created
    onCleanup(() => {
      Object.values(created).forEach(key => key.destroy())
      if (keyMap.value === created)
        keyMap.value = {}
    })
  }, { immediate: true })

  return { keys: keyMap }
}
