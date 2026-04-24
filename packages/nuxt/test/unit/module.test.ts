import { beforeEach, describe, expect, it, vi } from 'vitest'

const addComponent = vi.fn()
const addImports = vi.fn()
const addPlugin = vi.fn()
const addTemplate = vi.fn(() => ({ dst: '#build/phaser/index.mjs' }))
const addTypeTemplate = vi.fn()

vi.mock('@nuxt/kit', () => ({
  addComponent,
  addImports,
  addPlugin,
  addTemplate,
  addTypeTemplate,
  createResolver: () => ({ resolve: (value: string) => value }),
  defineNuxtModule: (definition: any) => definition,
}))

describe('nuxt module', async () => {
  const { default: module, resolveModuleOptions } = await import('../../src/module')

  beforeEach(() => {
    addComponent.mockClear()
    addImports.mockClear()
    addPlugin.mockClear()
    addTemplate.mockClear()
    addTypeTemplate.mockClear()
  })

  it('resolves defaults', () => {
    expect(resolveModuleOptions({})).toMatchObject({
      autoImports: true,
      components: true,
      componentPrefix: 'Phaser',
      clientOnly: true,
    })
  })

  it('registers plugin, imports, alias template, and components', async () => {
    const nuxt = {
      options: {
        runtimeConfig: {
          public: {},
        },
        alias: {},
      },
    } as any

    await module.setup({}, nuxt)

    expect(addPlugin).toHaveBeenCalled()
    expect(addImports).toHaveBeenCalled()
    expect(addImports).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ name: 'preloadPhaserRuntime', from: '#phaser' }),
    ]))
    expect(addTemplate).toHaveBeenCalled()
    expect(addTypeTemplate).toHaveBeenCalled()
    expect(addComponent).toHaveBeenCalled()
    expect(nuxt.options.runtimeConfig.public.phaser.defaults.suspendWhenHidden).toBe(true)
  })
})
