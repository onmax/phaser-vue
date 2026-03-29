---
title: Nuxt
description: The Nuxt-focused track for @onmax/nuxt-phaser, including module setup, runtime defaults, and client-only wrappers.
navigation: false
---

`@onmax/nuxt-phaser` wraps the Vue package with Nuxt-specific ergonomics. It registers the runtime plugin, exposes `#phaser`, adds auto-imports, and gives you a client-only wrapper component without duplicating the core lifecycle logic.

Use this section when you want to wire Phaser into a Nuxt app without losing the underlying Vue runtime model.

Read the Vue track when you want to understand the shared runtime behavior underneath the Nuxt wrapper.

::u-page-section{orientation="vertical"}
#title
Start in the Nuxt layer

#description
Use the module pages for install, runtime defaults, and client-only behavior.

:::u-page-grid{class="!grid-cols-1 lg:!grid-cols-2 !gap-3"}
::::u-page-card
---
icon: i-lucide-download
spotlight: true
to: /nuxt-module/installation
---
#title
Install the module

#description
Add `@onmax/nuxt-phaser`, register it in `nuxt.config.ts`, and keep Phaser client-only by default.
::::

::::u-page-card
---
icon: i-lucide-settings-2
spotlight: true
to: /nuxt-module/runtime-defaults
---
#title
Set runtime defaults

#description
Configure `pixelArt`, `transparent`, `suspendWhenHidden`, and the asset base URL once in the module config.
::::

::::u-page-card
---
icon: i-lucide-monitor-play
spotlight: true
to: /nuxt-module/client-only-wrapper
---
#title
Use `NuxtPhaserGame`

#description
Wrap the shared host component in `ClientOnly` while keeping slots and `instanceId` explicit.
::::

::::u-page-card
---
icon: i-lucide-arrow-right-left
spotlight: true
to: /vue
---
#title
Open the Vue runtime

#description
Read the shared composable and primitive behavior that the Nuxt layer re-exports.
::::
:::
::

::tip
Use the Nuxt pages for wrapper behavior and app integration. Use the Vue pages for the shared runtime contract.
::
