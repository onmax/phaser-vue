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

The module owns global component registration. Its runtime plugin installs `createPhaserVue()` with `registerComponents: false`, so Nuxt gets the shared Phaser context/defaults without re-registering `PhaserGame`, `PhaserScene`, or the other primitives during dev/HMR.

## Testing

`@onmax/nuxt-phaser` publishes a Nuxt-aware testing entrypoint:

```ts
import {
  mountSuspendedWithPhaser,
  renderSuspendedWithPhaser,
  withNuxtPhaserTesting,
  withPhaserRuntimeConfig,
} from '@onmax/nuxt-phaser/testing'
```

Use it with `@nuxt/test-utils/runtime` style tests. The helper installs the shared fake Phaser runtime before `mountSuspended()` or `renderSuspended()` runs, so Nuxt component tests stay deterministic.

Example:

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspendedWithPhaser } from '@onmax/nuxt-phaser/testing'
import MyGameShell from '~/components/MyGameShell.vue'

describe('game shell', () => {
  it('mounts in Nuxt runtime tests', async () => {
    const wrapper = await mountSuspendedWithPhaser(MyGameShell)
    expect(wrapper.find('.phaser-game-host').exists()).toBe(true)
  })
})
```

`withPhaserRuntimeConfig()` and `withNuxtPhaserTesting()` are the light-weight config helpers when you need the resolved public runtime contract in a test.

Use browser-mode smoke tests for client-only and canvas mount checks. Keep Playwright for full gameplay and end-to-end verification.
