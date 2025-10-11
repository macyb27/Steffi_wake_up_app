import React, { useEffect, useMemo, useState } from 'react'

export const SliderMatch: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const target = useMemo(() => Math.floor(Math.random()*80)+10, [])
  const [value, setValue] = useState(50)

  useEffect(() => {
    if (Math.abs(value - target) <= 2) onWin()
  }, [value, target, onWin])

  return (
    <div className="card-inner" style={{ display: 'grid', gap: 10 }}>
      <p>Ziel: Stelle den Regler auf <strong className="pink">{target}</strong></p>
      <input className="input" type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>0</span>
        <span className="badge">{value}</span>
        <span>100</span>
      </div>
    </div>
  )
}
