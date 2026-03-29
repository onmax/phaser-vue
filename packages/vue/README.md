# `@onmax/phaser-vue`

`@onmax/phaser-vue` is a hybrid integration layer for Phaser 3 in Vue 3.

## Install

```bash
pnpm add @onmax/phaser-vue phaser
```

## Core API

- `PhaserGame`
- `PhaserScene`
- `PhaserContainer`
- `PhaserImage`
- `PhaserSprite`
- `PhaserText`
- `definePhaserScene`
- `createPhaserBridge`
- `usePhaserGame`
- `usePhaserScene`
- `usePhaserBridge`

## Why hybrid?

Phaser already has a strong scene model and a fast imperative runtime. This package keeps that model intact and uses Vue for orchestration instead of trying to mirror every frame into reactivity.
