<script setup lang="ts">
interface DemoBridge {
  'hud:boost': { amount: number }
}

const bridge = usePhaserBridge<DemoBridge>('demo')

const scene = definePhaserScene<DemoBridge>({
  key: 'demo',
  preload({ scene }: { scene: any }) {
    scene.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png')
  },
  create({ scene, bridge }: { scene: any, bridge: any }) {
    scene.add.image(420, 170, 'logo').setScale(0.42)
    const label = scene.add.text(32, 32, 'Bridge score: 0', { color: '#fff', fontSize: '28px' })
    let score = 0
    bridge.on('hud:boost', ({ amount }: DemoBridge['hud:boost']) => {
      score += amount
      label.setText(`Bridge score: ${score}`)
    })
  },
})

function boost() {
  bridge?.emit('hud:boost', { amount: 1 })
}
</script>

<template>
  <main class="page">
    <section class="copy">
      <h1>Nuxt playground</h1>
      <p>Client-only mounting with module auto-imports and a typed bridge.</p>
      <button @click="boost">
        Boost score
      </button>
    </section>

    <NuxtPhaserGame instance-id="demo" :width="840" :height="420" background-color="#111827">
      <PhaserScene scene-key="demo" :definition="scene" />
    </NuxtPhaserGame>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
}

.copy {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
