import React, { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useAlarmStore } from '../state/alarmStore';
import { MonstersStrip } from './MonstersStrip';
import { QuickActions } from './QuickActions';
import { Onboarding } from './Onboarding';
import { Settings } from './Settings';
import { MessageFeed } from './MessageFeed';
import { MessagesInput } from './MessagesInput';

export function Home() {
  const { nextAlarmTime, alarms, setAlarmFor, load } = useAlarmStore();

  useEffect(() => { load(); }, [load]);

  const now = dayjs();
  const formattedNow = now.format('HH:mm');
  const next = useMemo(() => nextAlarmTime(), [alarms, nextAlarmTime]);

  return (
    <div className="glass panel">
      <div className="kicker">Gute-Laune-Wecker</div>
      <div className="clock">{formattedNow}</div>
      <div className="row">
        <div className="col">
          <div className="card-title">Nächster Alarm</div>
          <div className="badge">
            <span>⏰</span>
            <span>{next ? dayjs(next).format('ddd, HH:mm') : 'Keiner gesetzt'}</span>
          </div>
        </div>
        <div className="col">
          <div className="card-title">Schnell setzen</div>
          <div className="row">
            <button className="btn neon" onClick={() => setAlarmFor(10)}>+10 min</button>
            <button className="btn neon" onClick={() => setAlarmFor(20)}>+20 min</button>
            <button className="btn neon" onClick={() => setAlarmFor(30)}>+30 min</button>
          </div>
        </div>
      </div>

      <MonstersStrip />
      <QuickActions />
      <Onboarding />
      <Settings />
      <MessagesInput onChange={() => { /* Home shows feed below */ }} />
      <MessageFeed messages={(JSON.parse(localStorage.getItem('messages')||'[]'))} />
    </div>
  );
}
