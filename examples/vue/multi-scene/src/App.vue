<script setup lang="ts">
import { definePhaserScene } from '@onmax/phaser-vue'

const gameplay = definePhaserScene({
  key: 'gameplay',
  create({ scene }) {
    scene.add.text(32, 60, 'Gameplay scene', { fontSize: '42px', color: '#ffffff' })
  },
})

const hud = definePhaserScene({
  key: 'hud',
  create({ scene }) {
    scene.add.text(32, 20, 'HUD scene overlay', { fontSize: '20px', color: '#93c5fd' })
  },
})
</script>

<template>
  <main class="stack">
    <h1>Multiple scenes in one game</h1>
    <PhaserGame :width="800" :height="300" background-color="#0f172a">
      <PhaserScene scene-key="gameplay" :definition="gameplay" />
      <PhaserScene scene-key="hud" :definition="hud" />
    </PhaserGame>
  </main>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 1rem;
  padding: 2rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
}
</style>
