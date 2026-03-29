import { vi } from 'vitest'

class FakeEventEmitter {
  private listeners = new Map<string, Set<(...args: any[]) => void>>()

  on(event: string, handler: (...args: any[]) => void) {
    if (!this.listeners.has(event))
      this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(handler)
  }

  off(event: string, handler: (...args: any[]) => void) {
    this.listeners.get(event)?.delete(handler)
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach(handler => handler(...args))
  }
}

class FakeGameObject extends FakeEventEmitter {
  x = 0
  y = 0
  alpha = 1
  angle = 0
  rotation = 0
  visible = true
  depth = 0
  destroyed = false
  scaleX = 1
  scaleY = 1

  destroy() {
    this.destroyed = true
  }

  setInteractive() {}
  setOrigin() {}

  setScale(x = 1, y = x) {
    this.scaleX = x
    this.scaleY = y
  }

  setFlipX() {}
  setFlipY() {}
  setScrollFactor() {}
  setTint() {}
}

class FakeContainer extends FakeGameObject {
  list: FakeGameObject[] = []

  add(child: FakeGameObject) {
    this.list.push(child)
  }
}

class FakeImage extends FakeGameObject {
  constructor(public texture: string, public frame?: string | number) {
    super()
  }
}

class FakeSprite extends FakeImage {
  playing = ''

  play(key: string) {
    this.playing = key
  }
}

class FakeText extends FakeGameObject {
  constructor(public value: string, public style?: Record<string, unknown>) {
    super()
  }

  setText(value: string) {
    this.value = value
  }

  setStyle(style: Record<string, unknown>) {
    this.style = style
  }
}

class FakeRegistry {
  values: Record<string, unknown> = {}
  events = new FakeEventEmitter()

  set(key: string, value: unknown) {
    this.values[key] = value
    this.events.emit('changedata', key, value)
  }
}

class FakeScene {
  add = {
    container: (x: number, y: number) => {
      const container = new FakeContainer()
      container.x = x
      container.y = y
      return container
    },
    image: (x: number, y: number, texture: string, frame?: string | number) => {
      const image = new FakeImage(texture, frame)
      image.x = x
      image.y = y
      return image
    },
    sprite: (x: number, y: number, texture: string, frame?: string | number) => {
      const sprite = new FakeSprite(texture, frame)
      sprite.x = x
      sprite.y = y
      return sprite
    },
    text: (x: number, y: number, text: string, style?: Record<string, unknown>) => {
      const object = new FakeText(text, style)
      object.x = x
      object.y = y
      return object
    },
  }

  registry = new FakeRegistry()
  input = {
    on: vi.fn(),
    off: vi.fn(),
    keyboard: {
      addKeys: (keys: string) => Object.fromEntries(keys.split(',').map(key => [key, { key, destroy: vi.fn() }])),
    },
  }

  events = new FakeEventEmitter()
  scene = {
    setActive: vi.fn(),
    setVisible: vi.fn(),
  }

  game: any

  constructor(public settings?: Record<string, unknown>) {}
}

class FakeGame {
  events = new FakeEventEmitter()
  destroyed = false
  scale: { width: number, height: number, resize: (width: number, height: number) => void }
  sceneInstances: FakeScene[] = []

  constructor(public config: Record<string, any>) {
    this.scale = {
      width: Number(config.width ?? 0),
      height: Number(config.height ?? 0),
      resize: (width: number, height: number) => {
        this.scale.width = width
        this.scale.height = height
      },
    }

    const scenes = Array.isArray(config.scene) ? config.scene : [config.scene].filter(Boolean)
    for (const SceneCtor of scenes) {
      if (typeof SceneCtor !== 'function')
        continue

      const instance = new SceneCtor() as FakeScene
      instance.game = this
      this.sceneInstances.push(instance)
      instance.init?.()
      instance.preload?.()
      instance.create?.()
    }
  }

  destroy() {
    this.destroyed = true
  }
}

vi.mock('phaser', () => {
  const runtime = {
    AUTO: 'AUTO',
    Game: FakeGame,
    Scene: FakeScene,
  }

  return {
    default: runtime,
    ...runtime,
  }
})
