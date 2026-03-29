<script setup lang="ts">
import { definePhaserScene, usePhaserBridge } from '@onmax/phaser-vue'

interface DemoBridge {
  'hud:boost': { amount: number }
}

const scene = definePhaserScene<DemoBridge>({
  key: 'main',
  preload({ scene }) {
    scene.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png')
  },
  create({ scene, bridge }) {
    scene.add.image(400, 160, 'logo').setScale(0.45)
    const scoreText = scene.add.text(32, 32, 'Score: 0', { color: '#ffffff', fontSize: '28px' })
    let score = 0

    bridge.on('hud:boost', ({ amount }) => {
      score += amount
      scoreText.setText(`Score: ${score}`)
    })
  },
})

const bridge = usePhaserBridge<DemoBridge>('minimal-demo')

function boostScore() {
  bridge?.emit('hud:boost', { amount: 5 })
}
</script>

<template>
  <main class="shell">
    <section class="panel">
      <h1>Minimal hybrid scene</h1>
      <p>Vue handles orchestration. Phaser owns runtime objects.</p>
      <button @click="boostScore">
        Add 5 points
      </button>
    </section>

    <PhaserGame
      instance-id="minimal-demo"
      :width="800"
      :height="480"
      background-color="#16213e"
      debug
    >
      <PhaserScene scene-key="main" :definition="scene" />
    </PhaserGame>
  </main>
</template>

<style scoped>
.shell {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

.panel {
  display: flex;
  gap: 1rem;
  align-items: center;
}

button {
  border: 0;
  border-radius: 999px;
  background: #00d084;
  color: #08101f;
  padding: 0.8rem 1.2rem;
  font-weight: 700;
}
</style>
