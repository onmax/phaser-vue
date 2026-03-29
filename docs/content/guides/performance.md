---
title: Performance
description: When to use Vue reactivity vs Phaser imperative updates.
---

# When to use Vue reactivity vs Phaser imperative updates

Use Vue reactivity for:

- scene registration
- bridge-driven UI
- pause, restart, and low-frequency state
- menus, overlays, HUD DOM, and route integration

Use Phaser imperative updates for:

- movement every frame
- physics
- particle systems
- tween orchestration
- collision-heavy loops

## Rules of thumb

- Do not mirror every frame into Vue refs.
- Patch only the props that change.
- Keep raw Phaser objects away from deep proxy graphs.
- Destroy listeners, timers, tweens, and objects on unmount.
