import type { ComponentMountingOptions, VueWrapper } from '@vue/test-utils'
import type { Component, ComponentPublicInstance } from 'vue'
import type { PhaserEventMap } from '../types/public'
import { mount } from '@vue/test-utils'
import { createPhaserTestHarness, type PhaserTestHarness } from './harness'
import { createTestingPhaserVue, type TestingPhaserVueOptions } from './plugin'

export interface MountPhaserOptions extends ComponentMountingOptions<any> {
  phaser?: TestingPhaserVueOptions
}

export type PhaserMountedWrapper<Events extends PhaserEventMap = PhaserEventMap> =
  VueWrapper<ComponentPublicInstance> & { harness: PhaserTestHarness<Events> }

export function mountPhaser<T extends Component, Events extends PhaserEventMap = PhaserEventMap>(
  component: T,
  options: MountPhaserOptions = {},
): PhaserMountedWrapper<Events> {
  const harness = createPhaserTestHarness<Events>({ pluginOptions: options.phaser })
  harness.reset()

  const wrapper = mount(component as any, {
    ...options,
    global: {
      ...options.global,
      plugins: [
        ...(options.global?.plugins ?? []),
        createTestingPhaserVue(options.phaser),
      ],
    },
  } as any)

  harness.attachExpose((wrapper as VueWrapper<any>).vm as any)
  return Object.assign(wrapper, { harness }) as PhaserMountedWrapper<Events>
}
