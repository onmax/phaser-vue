import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
      outDir: 'dist',
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PhaserVue',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.mjs' : 'index.cjs',
    },
    rollupOptions: {
      external: ['vue', 'phaser'],
      output: {
        globals: {
          vue: 'Vue',
          phaser: 'Phaser',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
})
