import { create } from 'zustand';

export type ViewName = 'home' | 'settings';

type OverlayState = {
  ringing: boolean;
  alarmId?: string;
};

type UIState = {
  view: ViewName;
  partyMode: boolean;
  overlay: OverlayState;
  setView: (v: ViewName) => void;
  togglePartyMode: () => void;
  showRinging: (alarmId: string) => void;
  hideRinging: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  view: 'home',
  partyMode: false,
  overlay: { ringing: false },
  setView: (v) => set({ view: v }),
  togglePartyMode: () => set((s) => ({ partyMode: !s.partyMode })),
  showRinging: (alarmId) => set({ overlay: { ringing: true, alarmId } }),
  hideRinging: () => set({ overlay: { ringing: false } })
}));
