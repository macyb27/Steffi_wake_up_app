import { useEffect, useMemo, useState } from 'react'
import './App.css'
import './theme.css'
import { MonsterAvatar } from './components/MonsterAvatar'
import { playPreset } from './audio/engine'
import { loadAlarms, saveAlarms } from './utils/storage'
import { useAlarmScheduler, type Alarm as AlarmType } from './hooks/useAlarmScheduler'
import { AlarmOverlay } from './components/AlarmOverlay'
import { MonsterGallery } from './components/MonsterGallery'
import { awardForDismiss, loadRewards, saveRewards, type RewardsState } from './utils/rewards'
import { Onboarding } from './components/Onboarding'
import { listenKonami } from './utils/konami'

type SoundPreset = 'sunriseChimes' | 'ocean' | 'birdsong' | 'lofi'

type Alarm = {
  id: string
  label: string
  time: string // HH:MM
  enabled: boolean
  sound: SoundPreset
}

function App() {
  const [alarms, setAlarms] = useState<Alarm[]>(() => loadAlarms() as Alarm[])
  const [rewards, setRewards] = useState<RewardsState>(() => loadRewards())
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('wum_onboarded'))
  const [label, setLabel] = useState('Guten Morgen!')
  const [time, setTime] = useState(() => defaultTime())
  const [sound, setSound] = useState<SoundPreset>('sunriseChimes')
  const [party, setParty] = useState(false)

  const nextAlarm = useMemo(() => alarms.find(a => a.enabled) ?? null, [alarms])
  const scheduler = useAlarmScheduler(alarms as unknown as AlarmType[], (id) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, enabled: false } : a))
  })

  // Easter egg: Konami toggles party mode
  useEffect(() => listenKonami(() => setParty(p => !p)), [])

  function addAlarm() {
    if (!time) return
    const id = crypto.randomUUID()
    const newAlarm: Alarm = { id, label: label.trim() || 'Wecker', time, enabled: true, sound }
    setAlarms([newAlarm, ...alarms])
    // Play a preview so sie freut sich gleich
    try { playPreset(sound) } catch {}
  }

  // persist whenever alarms change
  useEffect(() => { saveAlarms(alarms) }, [alarms])

  function toggle(id: string) {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))
  }

  function remove(id: string) {
    setAlarms(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="container">
      <header className="header" style={party ? { filter: 'hue-rotate(40deg) saturate(1.2)', animation: 'pulse 2s infinite' } : undefined}>
        <div className="brand">
          <MonsterAvatar mood={party ? 'party' : 'happy'} size={40} />
          <h1 className="brand-title"><span className="pink">Wake‑Up</span> Monsters</h1>
        </div>
        <div className="chip" aria-hidden>
          Neon‑Theme <span className="kbd">pink</span>
        </div>
      </header>

      <div className="spacer" />

      <main className="grid grid-cols-2">
        <section className="card">
          <div className="card-inner">
            <h2>Nächster Wecker</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
              <div className="monster-plate card" style={{ width: 120, height: 120 }}>
                <MonsterAvatar mood="sleepy" size={80} />
              </div>
              <div>
                <h1 className="pink" style={{ margin: 0 }}>{nextAlarm ? nextAlarm.time : '—:—'}</h1>
                <p>{nextAlarm ? nextAlarm.label : 'Noch kein Alarm gesetzt'}</p>
              </div>
            </div>
            <div className="spacer" />
            <div className="actions">
              <button className="btn btn-neon" onClick={addAlarm}>Neuen Alarm</button>
              <button className="btn btn-ghost" onClick={() => alert('Bald: Belohnungen & Monster!')}>Monster & Belohnungen</button>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-inner">
            <h2>Alarm anlegen</h2>
            <div style={{ display: 'grid', gap: 12, marginTop: 10 }}>
              <label>
                <span className="sr-only">Zeit</span>
                <input className="input" type="time" value={time} onChange={e => setTime(e.target.value)} />
              </label>
              <label>
                <span className="sr-only">Titel</span>
                <input className="input" placeholder="Titel (z.B. Sanft aufwachen)" value={label} onChange={e => setLabel(e.target.value)} />
              </label>
              <label>
                <span className="sr-only">Sound</span>
                <select className="input" value={sound} onChange={e => setSound(e.target.value as SoundPreset)}>
                  <option value="sunriseChimes">Sunrise Chimes</option>
                  <option value="ocean">Ocean Whisper</option>
                  <option value="birdsong">Morning Birds</option>
                  <option value="lofi">Lo‑Fi Hugs</option>
                </select>
              </label>
              <button className="btn btn-neon" onClick={addAlarm}>Speichern</button>
            </div>
          </div>
        </section>
      </main>

      <section style={{ marginTop: 18 }} className="card">
        <div className="card-inner">
          <h2>Alarme</h2>
          <div className="list" role="list">
            {alarms.length === 0 && <p>Hier erscheinen deine Alarme.</p>}
            {alarms.map(a => (
              <div key={a.id} className="list-item" role="listitem">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="badge">{a.sound}</span>
                  <strong className="pink" style={{ fontSize: 20 }}>{a.time}</strong>
                  <span>{a.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="btn btn-ghost" onClick={() => toggle(a.id)}>{a.enabled ? 'On' : 'Off'}</button>
                  <button className="btn" onClick={() => remove(a.id)}>Löschen</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: 18 }}>
        <MonsterGallery />
      </div>

      {scheduler.ringing && (
        <AlarmOverlay
          alarm={scheduler.ringing.alarm as unknown as AlarmType}
          onDismiss={() => {
            setRewards(prev => {
              const next = awardForDismiss(prev, new Date())
              saveRewards(next)
              return next
            })
            scheduler.dismiss(true)
          }}
          onSnooze={(m) => scheduler.snooze(m)}
        />
      )}

      {showOnboarding && (
        <Onboarding onClose={() => { localStorage.setItem('wum_onboarded', '1'); setShowOnboarding(false) }} />
      )}

      <footer className="container" style={{ padding: 0, marginTop: 14 }}>
        <p className="footer-note">Streak: <strong className="pink">{rewards.streakDays}</strong> · Münzen: <strong className="pink">{rewards.coins}</strong></p>
        <p className="footer-note">Tipp: Probiere die <span className="kbd">↑↑↓↓←→←→BA</span>‑Kombination für eine Überraschung.</p>
      </footer>
    </div>
  )
}

function defaultTime(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 5)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export default App
