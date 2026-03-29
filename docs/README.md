# Phaser Vue docs

This app contains the documentation site for the `phaser-vue` workspace. It uses Docus on top of Nuxt and Nuxt Content.

## Quickstart

Run these commands from the `phaser-vue/` workspace root.

```bash
pnpm install
pnpm dev:docs
```

Expected result: the docs site starts locally so you can edit pages in `docs/content/` and review the rendered navigation and content structure in a browser.

## Common workflows

```bash
pnpm docs:build
pnpm --filter docs preview
```

## Notes

The docs use a custom landing page, a Vue and Nuxt track switcher, and numbered content sections for stable navigation.
