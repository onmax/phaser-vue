---
title: Nuxt guide
description: SSR-safe mounting with the Nuxt adapter.
---

# Nuxt guide

`@onmax/nuxt-phaser` is intentionally thin.

## What it does

- installs the Vue runtime plugin
- exposes `#phaser`
- auto-imports composables
- registers components
- provides `NuxtPhaserGame` as a `ClientOnly` wrapper

## SSR safety

- Phaser itself is never server-rendered
- the game runtime only boots on `onMounted`
- `NuxtPhaserGame` defaults to client-only behavior
