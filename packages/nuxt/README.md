# `@onmax/nuxt-phaser`

Nuxt 4 module for `@onmax/phaser-vue`.

## Install

```bash
pnpm add @onmax/nuxt-phaser @onmax/phaser-vue phaser
```

```ts
export default defineNuxtConfig({
  modules: ['@onmax/nuxt-phaser'],
})
```

## What it adds

- runtime plugin that installs `createPhaserVue`
- `#phaser` alias
- composable auto-imports
- component registration
- `NuxtPhaserGame` client-only wrapper
- public runtime config defaults
