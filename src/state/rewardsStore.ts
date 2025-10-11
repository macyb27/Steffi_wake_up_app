import { create } from 'zustand';
import dayjs from 'dayjs';

type RewardsState = {
  stars: number;
  streakDays: number;
  lastWakeDate?: string; // YYYY-MM-DD
  unlockedMonsters: string[];
  addStars: (n: number) => void;
  recordWakeSuccess: () => void;
  unlockMonster: (id: string) => void;
  load: () => void;
  save: () => void;
};

export const useRewardsStore = create<RewardsState>((set, get) => ({
  stars: 0,
  streakDays: 0,
  unlockedMonsters: ['sparkle'],
  addStars: (n) => {
    const stars = get().stars + n;
    set({ stars });
    get().save();
  },
  recordWakeSuccess: () => {
    const today = dayjs().format('YYYY-MM-DD');
    const { lastWakeDate, streakDays } = get();
    let nextStreak = 1;
    if (lastWakeDate) {
      const diff = dayjs(today).diff(dayjs(lastWakeDate), 'day');
      if (diff === 0) nextStreak = streakDays; // already counted today
      else if (diff === 1) nextStreak = streakDays + 1;
      else nextStreak = 1;
    }
    set({ lastWakeDate: today, streakDays: nextStreak });
    if (nextStreak === 3) get().unlockMonster('bubbles');
    if (nextStreak === 7) get().unlockMonster('puff');
    if (nextStreak === 14) get().unlockMonster('glim');
    if (nextStreak === 21) get().unlockMonster('twirl');
    get().save();
  },
  unlockMonster: (id) => {
    const setUnlocked = new Set(get().unlockedMonsters);
    setUnlocked.add(id);
    set({ unlockedMonsters: Array.from(setUnlocked) });
    get().save();
  },
  load: () => {
    try {
      const raw = localStorage.getItem('rewards');
      if (raw) set(JSON.parse(raw));
    } catch {}
  },
  save: () => {
    const { stars, streakDays, lastWakeDate, unlockedMonsters } = get();
    localStorage.setItem('rewards', JSON.stringify({ stars, streakDays, lastWakeDate, unlockedMonsters }));
  }
}));
