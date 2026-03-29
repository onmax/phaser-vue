import { describe, expect, it, vi } from 'vitest'
import { createPhaserBridge } from '../src/core/bridge'

interface Events {
  'hud:update': { score: number }
}

describe('createPhaserBridge', () => {
  it('emits and listens with types', () => {
    const bridge = createPhaserBridge<Events>()
    const handler = vi.fn()

    bridge.on('hud:update', handler)
    bridge.emit('hud:update', { score: 3 })

    expect(handler).toHaveBeenCalledWith({ score: 3 })
  })
})
