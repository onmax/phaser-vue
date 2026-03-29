---
title: Roadmap
description: See what the alpha intentionally leaves for later versions.
---

The alpha focuses on boring correctness: one host, managed scenes, a typed bridge, a small primitive layer, and a thin Nuxt wrapper.

## Planned for v0.2

- `PhaserGraphics`, `PhaserTileSprite`, and `PhaserZone`
- more helper composables like `usePhaserTween` and `usePhaserCamera`
- better debug warnings around missing textures and bridge misuse
- browser smoke tests
- first extension points for DOM overlays

## Planned for v1.0

- a stable extension API for scene and plugin integrations
- richer asset manifest helpers
- a documented HMR preservation story if it proves reliable
- optional devtools hooks
- broader primitive coverage only after the patching model proves out

::tip
The roadmap deliberately avoids a full renderer. The long-term direction stays hybrid.
::
