import { describe, expect, it } from 'vitest'
import { withNuxtPhaserTesting, withPhaserRuntimeConfig } from '../../src/testing'

describe('testing helpers', () => {
  it('builds a resolved runtime config payload', () => {
    expect(withPhaserRuntimeConfig({
      clientOnly: false,
      defaults: {
        pixelArt: true,
      },
    })).toMatchObject({
      public: {
        phaser: {
          clientOnly: false,
          defaults: {
            pixelArt: true,
            suspendWhenHidden: true,
          },
        },
      },
    })
  })

  it('creates a reusable testing setup bundle', () => {
    const setup = withNuxtPhaserTesting({
      runtimeConfig: {
        componentPrefix: 'Game',
      },
    })

    expect(setup.runtimeConfig.public.phaser.componentPrefix).toBe('Game')
    expect(typeof setup.resetRuntime).toBe('function')
  })
})
