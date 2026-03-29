import type { InjectionKey, ShallowRef } from 'vue'
import type Phaser from 'phaser'
import type { PhaserGameRuntimeDefaults, PhaserVuePluginOptions } from '../types/public'
import type { ParentContainerScope, PhaserGameScope, PhaserSceneScope } from '../types/internal'

export const phaserPluginOptionsKey = Symbol('phaser-plugin-options') as InjectionKey<PhaserVuePluginOptions>
export const phaserGameScopeKey = Symbol('phaser-game-scope') as InjectionKey<PhaserGameScope>
export const phaserSceneScopeKey = Symbol('phaser-scene-scope') as InjectionKey<PhaserSceneScope>
export const phaserParentContainerKey = Symbol('phaser-parent-container') as InjectionKey<ParentContainerScope<Phaser.GameObjects.Container>>
export const phaserDefaultsKey = Symbol('phaser-defaults') as InjectionKey<Required<PhaserGameRuntimeDefaults>>
export const phaserObjectRefKey = Symbol('phaser-object-ref') as InjectionKey<ShallowRef<Phaser.GameObjects.GameObject | null>>
