---
title: Vue
description: Use @onmax/phaser-vue directly in any Vue 3 app for host setup, scenes, primitives, bridge events, and raw Phaser access.
navigation: false
---

`@onmax/phaser-vue` gives you the shared runtime without any Nuxt-specific wiring. Use it in a Vite app, inside a component library preview, or anywhere you want Vue around a Phaser canvas.

This track covers the host component, scene lifecycle, primitives, composables, and the imperative escape hatches that keep Phaser in control of hot-path behavior.

Use this section when you already know you want the Vue runtime and you need to decide which part of the API to learn next.

::u-page-section{orientation="vertical"}
#title
Start in the Vue layer

#description
Follow the guides in order or jump to the topic you need.

:::u-page-grid{class="!grid-cols-1 lg:!grid-cols-2 !gap-3"}
::::u-page-card
---
icon: i-lucide-download
spotlight: true
to: /getting-started/installation
---
#title
Install the package

#description
Install `@onmax/phaser-vue`, mount the plugin, and verify the first scene.
::::

::::u-page-card
---
icon: i-lucide-layout-template
spotlight: true
to: /vue-guide/phaser-game
---
#title
Host the game

#description
Use `PhaserGame` as the only place that creates and destroys `Phaser.Game`.
::::

::::u-page-card
---
icon: i-lucide-layers-3
spotlight: true
to: /vue-guide/scenes
---
#title
Manage scenes

#description
Register managed scenes, control active and visible state, and keep scene keys explicit.
::::

::::u-page-card
---
icon: i-lucide-box
spotlight: true
to: /vue-guide/primitives
---
#title
Use primitives

#description
Create containers, images, sprites, and text declaratively when the scene setup is simple.
::::

::::u-page-card
---
icon: i-lucide-waypoints
spotlight: true
to: /vue-guide/composables-and-bridge
---
#title
Bridge Vue and Phaser

#description
Connect DOM controls and scenes with typed bridge events and low-frequency registry state.
::::

::::u-page-card
---
icon: i-lucide-zap
spotlight: true
to: /vue-guide/escape-hatches
---
#title
Drop to raw Phaser

#description
Reach for `usePhaserGame`, `usePhaserScene`, `usePhaserObjectRef`, and raw object access whenever performance matters.
::::
:::
::

::important
Use Vue to orchestrate the game. Keep per-frame movement, physics, and animation state in scene code or imperative hooks.
::
