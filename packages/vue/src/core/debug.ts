export function isDev() {
  return typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.DEV : process.env.NODE_ENV !== 'production'
}

export function warnDebug(message: string, enabled = true) {
  if (!enabled || !isDev())
    return

  console.warn(`[phaser-vue] ${message}`)
}
