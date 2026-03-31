import type { PhaserVuePluginOptions } from '../types/public'
import { createPhaserVue } from '../plugin'
import { installFakePhaserRuntime } from './fake-phaser'

export interface TestingPhaserVueOptions extends PhaserVuePluginOptions {
  resetRuntime?: boolean
}

export function createTestingPhaserVue(options: TestingPhaserVueOptions = {}) {
  const controller = installFakePhaserRuntime()
  if (options.resetRuntime !== false)
    controller.reset()

  return createPhaserVue(options)
}
