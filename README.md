# Phaser Vue workspace

`phaser-vue` contains the Vue and Nuxt packages used to build Phaser games without hiding Phaser's scene model, plus the docs app, live playground, and examples used to develop the packages.

## What you will find here

- `@onmax/phaser-vue` for direct Vue 3 integration
- `@onmax/nuxt-phaser` for the Nuxt wrapper and runtime defaults
- `docs/` for the documentation site
- `playground/` for the live Nuxt example app
- `examples/` for smaller focused package examples
- `skills/phaser-best-practices/` for local authoring guidance

## Quickstart

If you want to work on the playground first:

```bash
pnpm install
pnpm dev:playground
```

Expected result: the Nuxt playground starts locally so you can validate scene wiring, bridge usage, and client-only mounting behavior.

## Install the packages

```bash
pnpm add @onmax/phaser-vue phaser
```

For Nuxt, install both packages:

```bash
pnpm add @onmax/nuxt-phaser @onmax/phaser-vue phaser
```

## Key links

- Docs: [phaser-vue-docs.vercel.app](https://phaser-vue-docs.vercel.app/)
- Playground: [phaser-vue-playground.vercel.app](https://phaser-vue-playground.vercel.app/)
- Local skill: [`skills/phaser-best-practices`](./skills/phaser-best-practices/SKILL.md)

## Common workflows

```bash
pnpm build
pnpm test
pnpm typecheck
pnpm dev:docs
pnpm dev:playground
```

## Workspace layout

```text
phaser-vue/
  docs/         # Docus site
  examples/     # Focused package examples
  packages/     # Published Vue and Nuxt packages
  playground/   # Nuxt demo app
  skills/       # Local authoring guidance
```

## Related docs

- [`docs/README.md`](./docs/README.md) for docs-site development
- [`playground/README.md`](./playground/README.md) for the local demo app
