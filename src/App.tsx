import React from 'react';
import { Home } from './components/Home';
import { RingingOverlay } from './components/RingingOverlay';
import { useAlarmTicker } from './hooks/useAlarmTicker';
import { useKonami } from './hooks/useKonami';
import './components/PartyMode.css';
import { useUIStore } from './state/uiStore';

export default function App() {
  useAlarmTicker();
  useKonami();
  const { partyMode } = useUIStore();
  return (
    <div className={`app-shell ${partyMode ? 'party-mode' : ''}`}>
      <header className="header container">
        <div className="brand">
          <img className="logo" src="/icon.svg" alt="Neon Monsters" />
          <div className="title">Neon Monsters Alarm</div>
        </div>
        <a className="btn neon" href="#settings">Einstellungen</a>
      </header>
      <main className="container">
        <Home />
      </main>
      <footer className="footer">© {new Date().getFullYear()} Neon Monsters. Wach mit einem Lächeln. ♡</footer>
      <RingingOverlay />
    </div>
  );
}
