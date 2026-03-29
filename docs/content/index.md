---
title: phaser-vue
description: Hybrid Phaser primitives for Vue and Nuxt. Scene-first APIs, typed bridges, SSR-safe mounting, and direct escape hatches.
navigation: false
---

::u-page-hero{class="hero-glow"}

#title
Phaser for Vue and Nuxt, :br without hiding Phaser

#description
Build Phaser games with Vue orchestration, typed scene wiring, and explicit escape hatches. Use the Vue package directly or add the Nuxt wrapper on top.

#links
:u-button{to="/getting-started" size="xl" trailing-icon="i-lucide-arrow-right" label="Get started"}
:u-button{to="https://phaser-vue-playground.vercel.app" target="_blank" size="xl" color="neutral" variant="outline" trailing-icon="i-lucide-monitor-play" label="Live demo"}
:u-button{to="https://github.com/onmax/phaser-vue" target="_blank" size="xl" color="neutral" variant="outline" trailing-icon="i-simple-icons-github" label="View on GitHub"}

#body
  :::code-group{class="landing-install-command max-w-lg mx-auto"}
  ```bash [Vue]
  pnpm add @onmax/phaser-vue phaser
  ```
  ```bash [Nuxt]
  pnpm add @onmax/nuxt-phaser @onmax/phaser-vue phaser
  ```
  :::
::

::u-page-section{orientation="vertical"}
#title
Choose your track

#description
The same hybrid runtime powers both packages. Pick the wrapper that matches your app.

  :::u-page-grid{class="max-w-3xl mx-auto !grid-cols-1 sm:!grid-cols-2 !gap-6"}
  ::::u-page-card
  ---
  icon: i-simple-icons-vuedotjs
  spotlight: true
  to: /vue
  ---
  #title
  Vue package

  #description
  Install `@onmax/phaser-vue` in any Vue 3 app. Use `PhaserGame`, `PhaserScene`, composables, and primitives directly.
  ::::

  ::::u-page-card
  ---
  icon: i-simple-icons-nuxtdotjs
  spotlight: true
  to: /nuxt
  ---
  #title
  Nuxt module

  #description
  Add `@onmax/nuxt-phaser` for auto-imports, `#phaser`, client-only mounting, and runtime defaults.
  ::::
  :::
::

::u-page-section{orientation="vertical"}
#title
Built for a hybrid workflow

#description
Vue handles setup, UI, and low-frequency state. Phaser stays in charge of scenes, display objects, and hot-path runtime behavior.

  :::u-page-grid{class="max-w-5xl mx-auto !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-4"}
  ::::u-page-card
  ---
  icon: i-lucide-layout-template
  ---
  #title
  `PhaserGame` host

  #description
  One component owns `Phaser.Game`, merges defaults, mounts safely on the client, and cleans up on unmount.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-layers-3
  ---
  #title
  Scene-first API

  #description
  Register managed scenes with `definePhaserScene` and `PhaserScene` without replacing Phaser's own scene model.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-waypoints
  ---
  #title
  Typed bridge

  #description
  Connect Vue UI and Phaser scenes with `createPhaserBridge` and `usePhaserBridge`, scoped per game instance.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-box
  ---
  #title
  Small primitive layer

  #description
  Create images, sprites, text, and containers declaratively without pretending Vue should reconcile the whole game tree.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-shield-check
  ---
  #title
  SSR-safe mounting

  #description
  Phaser only boots on mount. The Nuxt wrapper keeps that client-only boundary explicit.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-zap
  ---
  #title
  Escape hatches

  #description
  Grab `game`, `scene`, and raw Phaser objects at any point. The abstraction stays removable.
  ::::
  :::
::

::u-page-section{orientation="vertical" class="landing-section-alt"}
#title
What the Nuxt module adds

#description
The Nuxt layer stays thin. It improves ergonomics without duplicating the core runtime.

  :::u-page-grid{class="max-w-4xl mx-auto !grid-cols-1 sm:!grid-cols-2 !gap-4"}
  ::::u-page-card
  ---
  icon: i-lucide-hash
  ---
  #title
  `#phaser` alias

  #description
  Import shared runtime APIs through a Nuxt alias when you want one source of truth in app code.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-download
  ---
  #title
  Auto-imports

  #description
  Register the composables you actually use, including `definePhaserScene`, `usePhaserBridge`, and scene helpers.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-monitor-play
  ---
  #title
  `NuxtPhaserGame`

  #description
  Wrap `PhaserGame` in `ClientOnly` when `clientOnly` stays enabled, and keep the mounting contract clear.
  ::::

  ::::u-page-card
  ---
  icon: i-lucide-settings-2
  ---
  #title
  Runtime defaults

  #description
  Set defaults for `pixelArt`, `transparent`, `suspendWhenHidden`, and `assetsBaseUrl` in one Nuxt module config block.
  ::::
  :::
::

::u-page-section{orientation="vertical"}
#title
Try the demo

#description
Open the live Nuxt playground to see the bridge, scene wiring, and client-only host running together.

#links
:u-button{to="https://phaser-vue-playground.vercel.app" target="_blank" size="xl" label="Open playground" trailing-icon="i-lucide-arrow-up-right"}
::

::u-page-section{orientation="vertical"}
#title
Start with the docs that match your next step

#links
:u-button{to="/getting-started" size="xl" label="Installation" trailing-icon="i-lucide-arrow-right"}
:u-button{to="/vue-guide" size="xl" color="neutral" variant="outline" label="Vue guide" trailing-icon="i-lucide-arrow-right"}
:u-button{to="/nuxt-module" size="xl" color="neutral" variant="outline" label="Nuxt module" trailing-icon="i-lucide-arrow-right"}
::
