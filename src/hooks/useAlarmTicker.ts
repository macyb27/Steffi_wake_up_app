import { useEffect, useRef } from 'react';
import { useAlarmStore } from '../state/alarmStore';
import { useUIStore } from '../state/uiStore';

export function useAlarmTicker() {
  const { alarms } = useAlarmStore();
  const { showRinging } = useUIStore();
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      for (const a of alarms) {
        if (a.time <= now && !firedRef.current.has(a.id)) {
          firedRef.current.add(a.id);
          showRinging(a.id);
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [alarms, showRinging]);
}
