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

`createPhaserVue()` registers the Phaser components by default. Pass `registerComponents: false` when another integration layer, such as `@onmax/nuxt-phaser`, owns component registration and you only need the shared plugin context/defaults.
- `usePhaserBridge`

Integration layers that own component registration can use the lightweight context entry without importing Phaser component modules:

```ts
import { createPhaserVueContext } from '@onmax/phaser-vue/context'
```

## Testing

`@onmax/phaser-vue` now publishes a dedicated testing entrypoint:

```ts
import { createFakeSceneDefinition, mountPhaser } from '@onmax/phaser-vue/testing'
```

Use it for unit and component tests where you want deterministic Phaser state without spinning up the real renderer.

Available helpers:

- `installFakePhaserRuntime()`
- `resetFakePhaserRuntime()`
- `createFakeSceneDefinition()`
- `createTestingPhaserVue()`
- `createPhaserTestHarness()`
- `mountPhaser()`
- `getPhaserGame()`
- `getManagedScene()`
- `getPhaserObject()`

Minimal example:

```ts
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import { PhaserGame, PhaserScene } from '@onmax/phaser-vue'
import { createFakeSceneDefinition, mountPhaser } from '@onmax/phaser-vue/testing'

const scene = createFakeSceneDefinition({
  key: 'spec-scene',
  create({ scene }) {
    scene.add.text(16, 24, 'ready')
  },
})

describe('scene host', () => {
  it('mounts with the fake runtime', () => {
    const wrapper = mountPhaser(defineComponent({
      setup() {
        return () => h(PhaserGame, { width: 320, height: 180 }, {
          default: () => h(PhaserScene, { sceneKey: scene.key, definition: scene }),
        })
      },
    }))

    expect(wrapper.harness.getScenes()).toHaveLength(1)
    expect(wrapper.harness.getObjects()).toHaveLength(1)
  })
})
```

For browser-backed smoke tests, prefer Vitest Browser Mode. For real gameplay flows, keep using Playwright.

## Why hybrid?

Phaser already has a strong scene model and a fast imperative runtime. This package keeps that model intact and uses Vue for orchestration instead of trying to mirror every frame into reactivity.
