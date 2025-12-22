
import { useMemo } from 'react';

export const useCoverStyle = (seed: number, type: 'geometric' | 'gradient' | 'profile' = 'geometric') => {
  return useMemo(() => {
    const hash = (n: number) => Math.sin(n) * 10000;
    const hue1 = Math.abs(Math.floor(hash(seed) * 360)); 
    const hue2 = (hue1 + 120) % 360; 

    if (type === 'gradient') {
      return { 
        background: `linear-gradient(${seed % 360}deg, hsla(${hue1}, 20%, 80%, 0.4), hsla(${hue2}, 20%, 80%, 0.4))` 
      };
    }

    if (type === 'profile') {
      return {
        background: `
          radial-gradient(circle at 10% 20%, hsla(180, 40%, 40%, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, hsla(300, 40%, 40%, 0.1) 0%, transparent 40%),
          linear-gradient(180deg, var(--bg-sidebar) 0%, var(--bg-main) 100%)
        `
      };
    }

    return { 
      background: `radial-gradient(circle at 80% 20%, hsla(${hue2}, 0%, 50%, 0.05) 0%, transparent 40%), radial-gradient(circle at 20% 80%, hsla(${hue1}, 0%, 50%, 0.05) 0%, transparent 40%), linear-gradient(180deg, var(--bg-sidebar) 0%, var(--bg-main) 100%)` 
    };
  }, [seed, type]);
};
