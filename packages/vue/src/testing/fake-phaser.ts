import type Phaser from 'phaser'
import { vi } from 'vitest'

type EventHandler = (...args: any[]) => void

type FakeSceneLifecycle = {
  init?: () => void
  preload?: () => void
  create?: () => void
}

interface FakeInputPlugin {
  on: ReturnType<typeof vi.fn>
  off: ReturnType<typeof vi.fn>
  keyboard: {
    addKey: (key: string) => { key: string, destroy: ReturnType<typeof vi.fn> }
    addKeys: (keys: string) => Record<string, { key: string, destroy: ReturnType<typeof vi.fn> }>
  }
}

interface FakeSceneManager {
  restart: ReturnType<typeof vi.fn>
  setActive: ReturnType<typeof vi.fn>
  setVisible: ReturnType<typeof vi.fn>
}

export interface FakePhaserRuntimeState {
  games: FakeGame[]
  scenes: FakeScene[]
  objects: FakeGameObject[]
}

export interface FakePhaserRuntimeController {
  runtime: typeof Phaser
  state: FakePhaserRuntimeState
  reset: () => void
}

class FakeEventEmitter {
  private listeners = new Map<string, Set<EventHandler>>()

  on(event: string, handler: EventHandler) {
    if (!this.listeners.has(event))
      this.listeners.set(event, new Set())

    this.listeners.get(event)!.add(handler)
    return this
  }

  once(event: string, handler: EventHandler) {
    const wrapped: EventHandler = (...args) => {
      this.off(event, wrapped)
      handler(...args)
    }

    this.on(event, wrapped)
    return this
  }

  off(event: string, handler: EventHandler) {
    this.listeners.get(event)?.delete(handler)
    return this
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach(handler => handler(...args))
    return this
  }

  removeAllListeners() {
    this.listeners.clear()
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
  tint = 0xffffff
  scrollFactorX = 1
  scrollFactorY = 1
  flipX = false
  flipY = false
  originX = 0.5
  originY = 0.5
  interactive = false

  destroy() {
    this.destroyed = true
    this.removeAllListeners()
  }

  setInteractive() {
    this.interactive = true
    return this
  }

  setOrigin(x = 0.5, y = x) {
    this.originX = x
    this.originY = y
    return this
  }

  setScale(x = 1, y = x) {
    this.scaleX = x
    this.scaleY = y
    return this
  }

  setFlipX(value = true) {
    this.flipX = value
    return this
  }

  setFlipY(value = true) {
    this.flipY = value
    return this
  }

  setScrollFactor(x = 1, y = x) {
    this.scrollFactorX = x
    this.scrollFactorY = y
    return this
  }

  setTint(value = 0xffffff) {
    this.tint = value
    return this
  }

  setAlpha(value = 1) {
    this.alpha = value
    return this
  }

  setDepth(value = 0) {
    this.depth = value
    return this
  }
}

class FakeContainer extends FakeGameObject {
  list: FakeGameObject[] = []

  add(child: FakeGameObject) {
    this.list.push(child)
    return this
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
    return this
  }
}

class FakeText extends FakeGameObject {
  constructor(public value: string, public style?: Record<string, unknown>) {
    super()
  }

  setText(value: string) {
    this.value = value
    return this
  }

  setStyle(style: Record<string, unknown>) {
    this.style = style
    return this
  }
}

class FakeDataManager {
  values: Record<string, unknown> = {}

  get(key: string) {
    return this.values[key]
  }

  set(key: string, value: unknown) {
    this.values[key] = value
    return value
  }

  remove(key: string) {
    delete this.values[key]
  }
}

class FakeRegistry extends FakeDataManager {
  events = new FakeEventEmitter()

  override set(key: string, value: unknown) {
    super.set(key, value)
    this.events.emit('changedata', key, value)
    return value
  }
}

class FakeScene {
  registry = new FakeRegistry()
  data = new FakeDataManager()
  events = new FakeEventEmitter()
  input: FakeInputPlugin = {
    on: vi.fn(),
    off: vi.fn(),
    keyboard: {
      addKey: (key: string) => ({ key, destroy: vi.fn() }),
      addKeys: (keys: string) => Object.fromEntries(keys.split(',').map(key => [key.trim(), { key: key.trim(), destroy: vi.fn() }])),
    },
  }
  scene: FakeSceneManager = {
    restart: vi.fn(),
    setActive: vi.fn(),
    setVisible: vi.fn(),
  }

  game: FakeGame | null = null
  key: string
  createdObjects: FakeGameObject[] = []
  add: {
    container: (x: number, y: number) => FakeContainer
    image: (x: number, y: number, texture: string, frame?: string | number) => FakeImage
    sprite: (x: number, y: number, texture: string, frame?: string | number) => FakeSprite
    text: (x: number, y: number, text: string, style?: Record<string, unknown>) => FakeText
  }

  constructor(public settings: Record<string, unknown> = {}, private state: FakePhaserRuntimeState) {
    this.key = String(settings.key ?? '')
    this.add = {
      container: (x, y) => this.track(new FakeContainer(), x, y),
      image: (x, y, texture, frame) => this.track(new FakeImage(texture, frame), x, y),
      sprite: (x, y, texture, frame) => this.track(new FakeSprite(texture, frame), x, y),
      text: (x, y, text, style) => this.track(new FakeText(text, style), x, y),
    }
  }

  private track<T extends FakeGameObject>(object: T, x: number, y: number) {
    object.x = x
    object.y = y
    this.createdObjects.push(object)
    this.state.objects.push(object)
    return object
  }
}

class FakeGame {
  events = new FakeEventEmitter()
  destroyed = false
  sceneInstances: FakeScene[] = []
  scale: { width: number, height: number, resize: (width: number, height: number) => void }

  constructor(public config: Record<string, any>, private state: FakePhaserRuntimeState) {
    this.scale = {
      width: Number(config.width ?? 0),
      height: Number(config.height ?? 0),
      resize: (width: number, height: number) => {
        this.scale.width = width
        this.scale.height = height
      },
    }

    state.games.push(this)

    const scenes = Array.isArray(config.scene) ? config.scene : [config.scene].filter(Boolean)
    for (const SceneCtor of scenes) {
      if (typeof SceneCtor !== 'function')
        continue

      const instance = new SceneCtor() as FakeScene & FakeSceneLifecycle
      instance.game = this
      this.sceneInstances.push(instance)
      state.scenes.push(instance)
      instance.init?.()
      instance.preload?.()
      instance.create?.()
    }
  }

  destroy() {
    this.destroyed = true
    this.events.emit('destroy')
  }
}

let controller: FakePhaserRuntimeController | null = null

function createController(): FakePhaserRuntimeController {
  const state: FakePhaserRuntimeState = {
    games: [],
    scenes: [],
    objects: [],
  }

  const runtime = {
    AUTO: 'AUTO',
    HEADLESS: 'HEADLESS',
    Game: class extends FakeGame {
      constructor(config: Record<string, any>) {
        super(config, state)
      }
    },
    Scene: class extends FakeScene {
      constructor(settings?: Record<string, unknown>) {
        super(settings, state)
      }
    },
  } as unknown as typeof Phaser

  return {
    runtime,
    state,
    reset() {
      state.games.length = 0
      state.scenes.length = 0
      state.objects.length = 0
    },
  }
}

function getController() {
  controller ??= createController()
  return controller
}

export function installFakePhaserRuntime(options: { reset?: boolean } = {}) {
  const next = getController()
  if (options.reset !== false)
    next.reset()

  vi.doMock('phaser', () => ({
    default: next.runtime,
    ...next.runtime,
  }))
  return next
}

export function resetFakePhaserRuntime() {
  getController().reset()
}

export function getFakePhaserRuntimeController() {
  return getController()
}
