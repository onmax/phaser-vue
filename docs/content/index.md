---
title: phaser-vue
description: Hybrid Phaser primitives for Vue and Nuxt.
---

# `phaser-vue`

`phaser-vue` is a scene-first, hybrid integration for Phaser 3 in Vue 3 and Nuxt 4.

## Why hybrid instead of a renderer?

Phaser already owns the parts that need to be fast. A renderer would make Vue responsible for reconciling object trees that Phaser already manages efficiently. This repo keeps Phaser in charge of hot-path runtime updates and uses Vue where it actually improves developer experience:

- app and scene setup
- DOM UI around the canvas
- low-frequency reactive state
- tooling, types, and orchestration
- explicit escape hatches

## Packages

- `@onmax/phaser-vue`
- `@onmax/nuxt-phaser`

## Start here

- [Getting started](/guides/getting-started)
- [Performance guide](/guides/performance)
- [Nuxt guide](/guides/nuxt)
- [API reference](/reference/api)
