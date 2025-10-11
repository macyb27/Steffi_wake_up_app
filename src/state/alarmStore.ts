import { create } from 'zustand';
import dayjs from 'dayjs';

export type Alarm = {
  id: string;
  time: number; // epoch ms
  label?: string;
};

type AlarmState = {
  alarms: Alarm[];
  permission: NotificationPermission | 'unsupported';
  load: () => void;
  save: () => void;
  setAlarmFor: (minutesFromNow: number) => void;
  nextAlarmTime: () => number | null;
  requestPermission: () => Promise<void>;
  testSound: () => void;
};

function playChimes() {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const now = audioContext.currentTime;

  function tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine') {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(0.4, now + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(now + start);
    osc.stop(now + start + duration + 0.02);
  }

  const base = 660;
  const motif = [0, 3, 7, 12, 7, 10, 12];
  motif.forEach((s, i) => tone(base * Math.pow(2, s/12), i * 0.2, 0.18, 'triangle'));
}

export const useAlarmStore = create<AlarmState>((set, get) => ({
  alarms: [],
  permission: 'default',
  load: () => {
    try {
      const raw = localStorage.getItem('alarms');
      const alarms = raw ? (JSON.parse(raw) as Alarm[]) : [];
      set({ alarms });
    } catch {}
  },
  save: () => {
    const { alarms } = get();
    localStorage.setItem('alarms', JSON.stringify(alarms));
  },
  setAlarmFor: (minutesFromNow: number) => {
    const time = dayjs().add(minutesFromNow, 'minute').second(0).millisecond(0).valueOf();
    const alarm: Alarm = { id: String(time), time };
    const { alarms } = get();
    const next = [...alarms.filter(a => a.time !== time), alarm].sort((a,b) => a.time - b.time);
    set({ alarms: next });
    get().save();
    if ('serviceWorker' in navigator && 'showTrigger' in Notification.prototype) {
      // Experimental: Notification Triggers (Chrome origin trial dep.)
    }
    if ('Notification' in window && Notification.permission === 'granted') {
      navigator.serviceWorker?.ready.then(reg => {
        reg.showNotification('Wecker gesetzt', {
          body: dayjs(time).format('ddd HH:mm'),
          icon: '/icon.svg',
          badge: '/icon.svg',
          vibrate: [50, 20, 50],
          tag: 'alarm-set'
        });
      });
    }
  },
  nextAlarmTime: () => {
    const { alarms } = get();
    const now = Date.now();
    const future = alarms.filter(a => a.time >= now).sort((a,b) => a.time - b.time);
    return future[0]?.time ?? null;
  },
  requestPermission: async () => {
    if (!('Notification' in window)) {
      set({ permission: 'unsupported' });
      return;
    }
    const p = await Notification.requestPermission();
    set({ permission: p });
  },
  testSound: () => {
    playChimes();
  }
}));
