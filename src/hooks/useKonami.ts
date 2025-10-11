import { useEffect, useRef } from 'react';
import { useUIStore } from '../state/uiStore';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useKonami() {
  const { togglePartyMode } = useUIStore();
  const idx = useRef(0);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const expected = KONAMI[idx.current];
      if (e.key === expected) {
        idx.current += 1;
        if (idx.current === KONAMI.length) {
          togglePartyMode();
          idx.current = 0;
        }
      } else {
        idx.current = 0;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePartyMode]);
}
