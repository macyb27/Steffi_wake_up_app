import React, { useEffect, useRef, useState } from 'react';
import { useUIStore } from '../state/uiStore';
import { useRewardsStore } from '../state/rewardsStore';
import { playAlarmLoop, type AlarmSoundName } from '../sound/engine';

function MiniGame({ onWin }: { onWin: () => void }) {
  const [target, setTarget] = useState<number>(() => Math.floor(Math.random() * 5) + 3);
  const [count, setCount] = useState(0);
  return (
    <div className="glass panel" style={{ marginTop: 12 }}>
      <div className="card-title">Mini-Game: Tap the Star</div>
      <div>Drücke den Stern {target - count}x</div>
      <button className="btn neon" onClick={() => {
        const next = count + 1;
        setCount(next);
        if (next >= target) onWin();
      }}>⭐</button>
    </div>
  );
}

export function RingingOverlay() {
  const { overlay, hideRinging } = useUIStore();
  const { addStars, recordWakeSuccess } = useRewardsStore();
  const playerRef = useRef<ReturnType<typeof playAlarmLoop> | null>(null);
  const [sound, setSound] = useState<AlarmSoundName>('Lullaby');
  const [volume, setVolume] = useState(0.6);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (overlay.ringing) {
      playerRef.current = playAlarmLoop(sound, volume);
    }
    return () => {
      playerRef.current?.stop();
      playerRef.current = null;
    };
  }, [overlay.ringing, sound, volume]);

  if (!overlay.ringing) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backdropFilter: 'blur(8px)', background: 'rgba(11,11,15,0.6)', zIndex: 50 }}>
      <div className="container" style={{ paddingTop: 24 }}>
        <div className="glass panel">
          <div className="kicker">Es ist Zeit!</div>
          <h2>Guten Morgen ✨</h2>
          <div className="row" style={{ marginTop: 12 }}>
            <div className="col">
              <label className="card-title">Sound</label>
              <select className="input" value={sound} onChange={(e) => setSound(e.target.value as AlarmSoundName)}>
                <option>Lullaby</option>
                <option>Sunrise</option>
                <option>Chiptune</option>
                <option>Ocean</option>
                <option>SoftPiano</option>
              </select>
            </div>
            <div className="col">
              <label className="card-title">Lautstärke</label>
              <input className="input" type="range" min={0} max={1} step={0.05} value={volume} onChange={(e)=> setVolume(parseFloat(e.target.value))} />
            </div>
          </div>
          <MiniGame onWin={() => setWon(true)} />
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn" onClick={() => {
              // Snooze +5 Minuten
              const in5 = Date.now() + 5 * 60 * 1000;
              try {
                const raw = localStorage.getItem('alarms');
                const alarms = raw ? JSON.parse(raw) as { id: string; time: number }[] : [];
                const next = [...alarms, { id: String(in5), time: in5 }].sort((a,b) => a.time - b.time);
                localStorage.setItem('alarms', JSON.stringify(next));
              } catch {}
              playerRef.current?.stop();
              setWon(false);
              hideRinging();
            }}>Snooze (+5)</button>
            <button className="btn neon" disabled={!won} onClick={() => {
              addStars(5);
              recordWakeSuccess();
              playerRef.current?.stop();
              hideRinging();
            }}>Ich bin wach! +5⭐</button>
          </div>
        </div>
      </div>
    </div>
  );
}
