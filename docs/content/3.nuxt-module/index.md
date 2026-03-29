---
title: Nuxt Module
description: Configure @onmax/nuxt-phaser without duplicating the shared runtime contract from @onmax/phaser-vue.
---

The Nuxt module stays thin by design. It installs the shared Vue runtime, wires auto-imports and aliases, and keeps Phaser on the client by default.

The module does not replace the Vue package API. It wraps it.

## Read in order

- [Installation](/nuxt-module/installation)
- [Runtime defaults](/nuxt-module/runtime-defaults)
- [Client-only wrapper](/nuxt-module/client-only-wrapper)
