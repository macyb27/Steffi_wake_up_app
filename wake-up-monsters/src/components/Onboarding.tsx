import React from 'react'

export const Onboarding: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div role="dialog" aria-modal className="card" style={{ position: 'fixed', inset: 12, zIndex: 1100, background: 'rgba(10,10,18,0.96)' }}>
      <div className="card-inner" style={{ display: 'grid', gap: 14 }}>
        <h1 className="pink" style={{ margin: 0 }}>Willkommen bei Wake‑Up Monsters</h1>
        <p>So wirst du happy wach:</p>
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
          <li>Erstelle einen Alarm mit Zeit, Titel und Sound.</li>
          <li>Wenn er klingelt, löse ein kleines Mini‑Game.</li>
          <li>Sammle Münzen, steigere deine Streak, schalte Monster frei.</li>
        </ul>
        <p>Schreibe mir deine Lieblings‑Morgen‑Messages – ich baue sie ein!</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-neon" onClick={onClose}>Los geht’s</button>
        </div>
      </div>
    </div>
  )
}
