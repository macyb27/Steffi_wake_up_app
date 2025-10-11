import React from 'react';

export function Onboarding() {
  return (
    <div className="glass panel" style={{ marginTop: 16 }}>
      <div className="card-title">Erste Schritte</div>
      <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
        <li>Benachrichtigungen erlauben, damit der Wecker dich anstupst.</li>
        <li>Wähle eine Zeit oder nutze die Schnell-Buttons.</li>
        <li>Schalte den Test-Sound an – fühl den Neon-Vibe.</li>
        <li>Wecke Monster, sammle Sterne und schalte Überraschungen frei.</li>
      </ol>
    </div>
  );
}
