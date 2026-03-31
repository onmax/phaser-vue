import { fileURLToPath } from 'node:url'
import { playwright } from '@vitest/browser-playwright'
import { defineVitestProject } from '@nuxt/test-utils/config'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const rootDir = fileURLToPath(new URL('./test/fixture', import.meta.url))
const phaserVueEntry = fileURLToPath(new URL('../vue/src/index.ts', import.meta.url))
const phaserVueTestingEntry = fileURLToPath(new URL('../vue/src/testing/index.ts', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@onmax/phaser-vue/testing', replacement: phaserVueTestingEntry },
      { find: '@onmax/phaser-vue', replacement: phaserVueEntry },
    ],
  },
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'node',
          include: ['test/unit/**/*.test.ts'],
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.test.ts'],
          environmentOptions: {
            nuxt: {
              rootDir,
              domEnvironment: 'jsdom',
            },
          },
        },
      }),
      {
        plugins: [vue()],
        resolve: {
          alias: [
            { find: '#imports', replacement: fileURLToPath(new URL('./test/browser/imports.ts', import.meta.url)) },
            { find: '@onmax/phaser-vue/testing', replacement: phaserVueTestingEntry },
            { find: '@onmax/phaser-vue', replacement: phaserVueEntry },
          ],
        },
        test: {
          name: 'nuxt-browser',
          globals: true,
          environment: 'jsdom',
          include: ['test/browser/**/*.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
