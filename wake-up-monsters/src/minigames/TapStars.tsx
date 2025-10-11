import React, { useEffect, useMemo, useState } from 'react'

export const TapStars: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const targets = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ id: i, x: Math.random()*100, y: Math.random()*60+10 })), [])
  const [hit, setHit] = useState<number>(0)

  useEffect(() => { if (hit >= targets.length) onWin() }, [hit, targets.length, onWin])

  return (
    <div className="card" style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
      {targets.map(t => (
        <button key={t.id} className="btn btn-neon" style={{ position: 'absolute', left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)', padding: '10px 12px' }}
          onClick={(e) => { setHit(h => h+1); (e.currentTarget as HTMLButtonElement).style.display='none' }} aria-label="Star">
          ✨
        </button>
      ))}
      <div style={{ position: 'absolute', right: 10, bottom: 10 }} className="badge">{hit}/{targets.length}</div>
    </div>
  )
}
