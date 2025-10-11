import React, { useState } from 'react'
import { MonsterAvatar } from './MonsterAvatar'

export type Monster = {
  id: string
  name: string
  mood: 'sleepy' | 'happy' | 'party'
  owned: boolean
}

const initial: Monster[] = [
  { id: 'm1', name: 'Pinky', mood: 'happy', owned: true },
  { id: 'm2', name: 'Dozy', mood: 'sleepy', owned: false },
  { id: 'm3', name: 'Twinkle', mood: 'party', owned: false },
]

export const MonsterGallery: React.FC = () => {
  const [monsters, setMonsters] = useState<Monster[]>(initial)

  return (
    <div className="card">
      <div className="card-inner" style={{ display: 'grid', gap: 12 }}>
        <h2>Deine Monster</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
          {monsters.map(m => (
            <div key={m.id} className="card" style={{ padding: 12, textAlign: 'center', opacity: m.owned ? 1 : 0.5 }}>
              <MonsterAvatar mood={m.mood} size={72} />
              <div style={{ marginTop: 8, fontWeight: 700 }}>{m.name}</div>
              <div style={{ marginTop: 6 }}>
                {m.owned ? (
                  <span className="badge">Freund</span>
                ) : (
                  <button className="btn btn-ghost" onClick={() => setMonsters(prev => prev.map(x => x.id === m.id ? { ...x, owned: true } : x))}>Freischalten</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
