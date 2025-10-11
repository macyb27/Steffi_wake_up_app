export function listenKonami(callback: () => void) {
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA']
  let idx = 0
  const handler = (e: KeyboardEvent) => {
    const key = e.code
    if (key === seq[idx]) {
      idx++
      if (idx === seq.length) {
        idx = 0
        callback()
      }
    } else {
      idx = 0
    }
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}
