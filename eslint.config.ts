import antfu from '@antfu/eslint-config'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: { standalone: false },
}).prepend(
  antfu(
    {
      type: 'lib',
      pnpm: true,
      formatters: true,
      typescript: true,
      vue: true,
    },
    {
      ignores: [
        '.artifacts/**',
        '**/*.md',
        '**/dist/**',
        '**/.nuxt/**',
        '**/.output/**',
        '**/node_modules/**',
        'playground/.data/**',
      ],
    },
  ),
  {
    files: ['package.json'],
    rules: {
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    rules: {
      'e18e/prefer-static-regex': 'off',
      'node/prefer-global/process': 'off',
      'ts/explicit-function-return-type': 'off',
      'ts/no-use-before-define': 'off',
    },
  },
  {
    files: [
      'packages/vue/src/components/PhaserImage.vue',
      'packages/vue/src/components/PhaserSprite.vue',
      'packages/vue/src/components/PhaserText.vue',
    ],
    rules: {
      'vue/valid-template-root': 'off',
    },
  },
)
