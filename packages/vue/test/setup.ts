import { beforeEach } from 'vitest'
import { installFakePhaserRuntime, resetFakePhaserRuntime } from '../src/testing'

installFakePhaserRuntime()

beforeEach(() => {
  resetFakePhaserRuntime()
})
