import React from 'react';
import { useRewardsStore } from '../state/rewardsStore';
import { playClick } from '../sound/engine';

const monsters = [
  { id: 'sparkle', name: 'Sparkle', hue: 315 },
  { id: 'bubbles', name: 'Bubbles', hue: 290 },
  { id: 'puff', name: 'Puff', hue: 330 },
  { id: 'glim', name: 'Glim', hue: 300 },
  { id: 'twirl', name: 'Twirl', hue: 340 },
  { id: 'blink', name: 'Blink', hue: 280 },
  { id: 'zippy', name: 'Zippy', hue: 350 },
  { id: 'momo', name: 'Momo', hue: 305 },
  { id: 'nibi', name: 'Nibi', hue: 325 },
  { id: 'lumo', name: 'Lumo', hue: 295 }
];

function MonsterIcon({ hue }: { hue: number }) {
  const color = `hsl(${hue} 100% 60%)`;
  return (
    <svg className="neon-glow" width="72" height="72" viewBox="0 0 72 72" aria-hidden>
      <defs>
        <filter id="f" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <g>
        <circle cx="36" cy="36" r="22" fill={color} opacity="0.9" />
        <circle cx="28" cy="32" r="3" fill="#0b0b0f" />
        <circle cx="44" cy="32" r="3" fill="#0b0b0f" />
        <rect x="26" y="42" width="20" height="4" rx="2" fill="#0b0b0f" />
        <g transform="translate(12,10)">
          <circle cx="10" cy="10" r="6" fill={color} filter="url(#f)" opacity="0.8" />
          <circle cx="50" cy="10" r="6" fill={color} filter="url(#f)" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
}

export function MonstersStrip() {
  const { unlockedMonsters, stars, load } = useRewardsStore();
  React.useEffect(() => { load(); }, [load]);
  return (
    <div className="monster-grid" style={{ marginTop: 16 }}>
      {monsters.map(m => {
        const unlocked = unlockedMonsters.includes(m.id);
        return (
          <div
            className="monster-card"
            key={m.id}
            style={{ opacity: unlocked ? 1 : 0.45, filter: unlocked ? undefined : 'grayscale(60%)' }}
            onClick={() => unlocked && playClick()}
            title={unlocked ? `${m.name} tanzt! ⭐ ${stars}` : 'Schalte durch Streaks frei'}
          >
            <MonsterIcon hue={m.hue} />
            <div style={{ fontWeight: 800, marginTop: 6 }}>{m.name}{!unlocked ? ' 🔒' : ''}</div>
          </div>
        );
      })}
    </div>
  );
}
