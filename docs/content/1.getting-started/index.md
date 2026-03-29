---
title: Getting Started
description: Install the package, mount the first game, and understand the SSR-safe mounting model.
---

Start here when you want the shortest path from install to a running canvas.

Use this section when you need to:

- choose between the Vue package and the Nuxt module
- install the right package for your app
- mount your first `PhaserGame`
- understand the client-only boundary before you debug SSR behavior

The same rule applies in both runtimes: `PhaserGame` owns the `Phaser.Game` instance, and Phaser only boots on the client.

## Read these pages in order

- [Installation](/getting-started/installation)
- [First game](/getting-started/first-game)
- [SSR and mounting](/getting-started/ssr-and-mounting)
- [Skills](/getting-started/skills)

Expected result: after these pages, you should have one running scene, one working bridge event, and a clear idea of which runtime layer owns which part of the integration.
