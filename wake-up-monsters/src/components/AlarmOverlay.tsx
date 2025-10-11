import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MonsterAvatar } from './MonsterAvatar'
import { playPreset } from '../audio/engine'
import { TapStars } from '../minigames/TapStars'
import { SliderMatch } from '../minigames/SliderMatch'
import type { Alarm } from '../hooks/useAlarmScheduler'

export type AlarmOverlayProps = {
  alarm: Alarm
  onDismiss: () => void
  onSnooze: (minutes: number) => void
}

export const AlarmOverlay: React.FC<AlarmOverlayProps> = ({ alarm, onDismiss, onSnooze }) => {
  const [challengePassed, setChallengePassed] = useState(false)
  const challenge = useMemo<'tap' | 'slider'>(() => (Math.random() > 0.5 ? 'tap' : 'slider'), [])
  const wakeLockRef = useRef<any>(null)

  useEffect(() => {
    const start = async () => {
      try { (navigator as any).wakeLock && (wakeLockRef.current = await (navigator as any).wakeLock.request('screen')) } catch {}
      try { playPreset(alarm.sound) } catch {}
    }
    start()
    const onLoop = () => {
      try { playPreset(alarm.sound) } catch {}
    }
    window.addEventListener('alarm-loop-audio', onLoop as any)
    return () => {
      window.removeEventListener('alarm-loop-audio', onLoop as any)
      try { wakeLockRef.current && wakeLockRef.current.release && wakeLockRef.current.release() } catch {}
    }
  }, [alarm.sound])

  const Game = useMemo(() => (challenge === 'tap' ? TapStars : SliderMatch), [challenge])

  return (
    <div role="dialog" aria-modal className="card" style={{
      position: 'fixed', inset: 12, background: 'rgba(10,10,18,0.95)',
      border: '1px solid rgba(255,255,255,0.2)', zIndex: 1000, display: 'grid', gridTemplateRows: 'auto 1fr auto'
    }}>
      <div className="card-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MonsterAvatar mood={challengePassed ? 'happy' : 'party'} size={56} />
          <div>
            <h1 className="pink" style={{ margin: 0 }}>{alarm.time}</h1>
            <p>{alarm.label}</p>
          </div>
        </div>
        <span className="badge">{alarm.sound}</span>
      </div>

      <div className="card-inner" style={{ display: 'grid', gap: 12 }}>
        {!challengePassed ? (
          <>
            <p>Guten Morgen! Löse die kleine Aufgabe, um den Wecker abzuschalten.</p>
            <Game onWin={() => setChallengePassed(true)} />
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p>Yeah! Geschafft. Du kannst jetzt abschalten oder snoozen.</p>
          </div>
        )}
      </div>

      <div className="card-inner" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button className="btn" onClick={() => onSnooze(5)}>Snooze 5</button>
        <button className="btn" onClick={() => onSnooze(10)}>Snooze 10</button>
        <button className="btn btn-neon" disabled={!challengePassed} onClick={onDismiss}>Ausschalten</button>
      </div>
    </div>
  )
}
