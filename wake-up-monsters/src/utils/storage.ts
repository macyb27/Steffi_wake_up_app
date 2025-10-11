export type StoredAlarm = {
  id: string
  label: string
  time: string
  enabled: boolean
  sound: string
  days?: number[]
}

const KEY = 'wake_up_monsters_alarms_v1'

export function loadAlarms(): StoredAlarm[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveAlarms(alarms: StoredAlarm[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(alarms))
  } catch {}
}
