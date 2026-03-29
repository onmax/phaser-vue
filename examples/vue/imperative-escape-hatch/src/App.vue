<script setup lang="ts">
import { definePhaserScene, usePhaserBridge } from '@onmax/phaser-vue'
import { ref } from 'vue'

interface DemoBridge {
  'player:turbo': { enabled: boolean }
}

const turbo = ref(false)

const scene = definePhaserScene<DemoBridge>({
  key: 'main',
  preload({ scene }) {
    scene.load.image('orb', 'https://labs.phaser.io/assets/particles/blue.png')
  },
  create({ scene, bridge }) {
    const orb = scene.add.image(160, 180, 'orb').setScale(0.35)
    let velocity = 80
    bridge.on('player:turbo', ({ enabled }) => {
      velocity = enabled ? 220 : 80
    })

    scene.events.on('update', (_time: number, delta: number) => {
      orb.x += velocity * (delta / 1000)
      if (orb.x > 840)
        orb.x = -40
    })
  },
})

const bridge = usePhaserBridge<DemoBridge>('imperative-demo')

function toggleTurbo() {
  turbo.value = !turbo.value
  bridge?.emit('player:turbo', { enabled: turbo.value })
}
</script>

<template>
  <main class="layout">
    <aside class="controls">
      <h1>Imperative escape hatch</h1>
      <p>Vue owns the toggle. Phaser owns per-frame motion.</p>
      <button @click="toggleTurbo">
        Turbo: {{ turbo ? 'on' : 'off' }}
      </button>
    </aside>

    <PhaserGame
      instance-id="imperative-demo"
      :width="800"
      :height="360"
      background-color="#111827"
    >
      <PhaserScene scene-key="main" :definition="scene" />
    </PhaserGame>
  </main>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

button {
  border: 0;
  border-radius: 999px;
  background: #38bdf8;
  color: #082f49;
  padding: 0.8rem 1.2rem;
  font-weight: 700;
}
</style>
