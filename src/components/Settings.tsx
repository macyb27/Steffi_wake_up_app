import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAlarmStore } from '../state/alarmStore';
import { useRewardsStore } from '../state/rewardsStore';

export function Settings() {
  const { alarms, setAlarmFor, save, load } = useAlarmStore();
  const { stars, streakDays, load: loadRewards } = useRewardsStore();
  const [customMinutes, setCustomMinutes] = useState(45);

  useEffect(() => { load(); loadRewards(); }, [load, loadRewards]);

  return (
    <div className="glass panel" id="settings" style={{ marginTop: 16 }}>
      <div className="card-title">Einstellungen & Status</div>
      <div className="row">
        <div className="col">
          <label className="card-title">Benutzerdefiniert (Minuten)</label>
          <div className="row">
            <input className="input" type="number" value={customMinutes} onChange={(e)=> setCustomMinutes(parseInt(e.target.value||'0',10))} />
            <button className="btn neon" onClick={() => setAlarmFor(customMinutes)}>Setzen</button>
          </div>
        </div>
        <div className="col">
          <div className="card-title">Belohnungen</div>
          <div className="badge">⭐ {stars} Sterne • 🔥 {streakDays} Tage</div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <div className="card-title">Geplante Alarme</div>
        {alarms.length === 0 && <div className="kicker">Keine Alarme</div>}
        {alarms.map(a => (
          <div key={a.id} className="badge" style={{ marginRight: 8, marginBottom: 8 }}>
            ⏰ {dayjs(a.time).format('ddd HH:mm')}
          </div>
        ))}
      </div>
    </div>
  );
}
