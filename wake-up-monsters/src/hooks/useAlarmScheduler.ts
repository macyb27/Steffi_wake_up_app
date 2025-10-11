import { useEffect, useMemo, useRef, useState } from 'react'

export type SoundPreset = 'sunriseChimes' | 'ocean' | 'birdsong' | 'lofi'

export type Alarm = {
  id: string
  label: string
  time: string // HH:MM
  enabled: boolean
  sound: SoundPreset
  days?: number[] // 0-6 (0=So)
}

export type Ringing = {
  alarm: Alarm
  snoozeUntil?: number // epoch ms
}

function parseTimeToTodayMinutes(time: string): number | null {
  const m = time.match(/^(\d{2}):(\d{2})$/)
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h < 0 || h > 23 || min < 0 || min > 59) return null
  return h * 60 + min
}

function nowLocalMinutes(): { mins: number; weekday: number; epochMs: number } {
  const d = new Date()
  return { mins: d.getHours() * 60 + d.getMinutes(), weekday: d.getDay(), epochMs: d.getTime() }
}

export function useAlarmScheduler(alarms: Alarm[], onOneTimeConsumed?: (id: string) => void) {
  const [ringing, setRinging] = useState<Ringing | null>(null)
  const lastFiredRef = useRef<Map<string, string>>(new Map())
  const loopTimerRef = useRef<number | null>(null)

  const enabledAlarms = useMemo(() => alarms.filter(a => a.enabled), [alarms])

  useEffect(() => {
    if (ringing) return
    const tick = () => {
      const { mins, weekday } = nowLocalMinutes()
      for (const a of enabledAlarms) {
        const target = parseTimeToTodayMinutes(a.time)
        if (target == null) continue
        const dayMatch = !a.days || a.days.length === 0 || a.days.includes(weekday)
        if (!dayMatch) continue
        if (mins === target) {
          const key = new Date().toDateString() + ' ' + a.time
          if (lastFiredRef.current.get(a.id) === key) continue
          lastFiredRef.current.set(a.id, key)
          setRinging({ alarm: a })
          break
        }
      }
    }
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [enabledAlarms, ringing])

  function dismiss(requireConsume: boolean = true) {
    if (!ringing) return
    const current = ringing
    setRinging(null)
    // If alarm has no recurrence days, consume (disable) after dismiss
    if (requireConsume) {
      const a = current.alarm
      if (!a.days || a.days.length === 0) {
        onOneTimeConsumed?.(a.id)
      }
    }
  }

  function snooze(minutes: number) {
    const until = Date.now() + minutes * 60 * 1000
    if (!ringing) return
    setRinging({ alarm: ringing.alarm, snoozeUntil: until })
    // Setup a one-shot timer
    window.setTimeout(() => setRinging({ alarm: ringing.alarm }), minutes * 60 * 1000)
  }

  // Auto-stop loop timer when overlay closes
  useEffect(() => {
    if (!ringing) {
      if (loopTimerRef.current) {
        window.clearInterval(loopTimerRef.current)
        loopTimerRef.current = null
      }
      return
    }
    // Start audio repeat ping (every 15s)
    loopTimerRef.current = window.setInterval(() => {
      const ev = new CustomEvent('alarm-loop-audio', { detail: { id: ringing.alarm.id, sound: ringing.alarm.sound } })
      window.dispatchEvent(ev)
      if (navigator.vibrate) navigator.vibrate([80, 40, 80])
    }, 15000) as unknown as number
    return () => {
      if (loopTimerRef.current) {
        window.clearInterval(loopTimerRef.current)
        loopTimerRef.current = null
      }
    }
  }, [ringing])

  return { ringing, setRinging, dismiss, snooze }
}
