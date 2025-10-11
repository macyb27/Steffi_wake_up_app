import React from 'react';
import { useAlarmStore } from '../state/alarmStore';

export function QuickActions() {
  const { requestPermission, testSound } = useAlarmStore();
  return (
    <div className="row" style={{ marginTop: 16 }}>
      <button className="btn" onClick={requestPermission}>🔔 Benachrichtigungen</button>
      <button className="btn" onClick={testSound}>🎶 Sound testen</button>
    </div>
  );
}
