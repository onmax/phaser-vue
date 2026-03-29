---
title: Getting started
description: Install and mount PhaserGame in Vue.
---

# Getting started

## Vue

```bash
pnpm add @onmax/phaser-vue phaser
```

```ts
import { createApp } from 'vue'
import { createPhaserVue } from '@onmax/phaser-vue'

createApp(App).use(createPhaserVue()).mount('#app')
```

## Nuxt

```bash
pnpm add @onmax/nuxt-phaser @onmax/phaser-vue phaser
```

```ts
export default defineNuxtConfig({
  modules: ['@onmax/nuxt-phaser'],
})
```

## First scene

```ts
const scene = definePhaserScene({
  key: 'main',
  create({ scene }) {
    scene.add.text(32, 32, 'hello phaser-vue')
  },
})
```

```vue
<PhaserGame :width="800" :height="480">
  <PhaserScene scene-key="main" :definition="scene" />
</PhaserGame>
```
