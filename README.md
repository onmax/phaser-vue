# `phaser-vue`

`phaser-vue` is a hybrid monorepo for Phaser 3 inside Vue 3 and Nuxt 4.

It does not try to hide Phaser behind a renderer. The core package gives you:

- `PhaserGame` as the host that owns `Phaser.Game`
- `PhaserScene` as a scene-first registration layer
- typed composables and bridge events for Vue-driven orchestration
- small declarative primitives for common objects
- raw access to `game`, `scene`, and underlying Phaser objects when you need it

## Packages

- `@onmax/phaser-vue`
- `@onmax/nuxt-phaser`

## Commands

```bash
pnpm install
pnpm build
pnpm test
pnpm dev:playground
pnpm dev:docs
pnpm dev:example:minimal
```

## Philosophy

- Vue is for setup, UI, scene wiring, and low-frequency state.
- Phaser stays in charge of hot-path runtime behavior.
- Escape hatches are always available.
- The Nuxt layer adds ergonomics, not a second runtime.
