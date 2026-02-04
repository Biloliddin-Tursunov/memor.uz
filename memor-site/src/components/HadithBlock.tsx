
import React, { useState } from 'react';
import { HADITH_DATA, TRANSLATIONS } from '../constants';
import { Ornament } from './Ornament';
import { Language } from '../types';

interface HadithBlockProps {
  language: Language;
  variant?: 'full' | 'compact';
  className?: string;
}

export const HadithBlock: React.FC<HadithBlockProps> = ({ language, variant = 'full', className = "" }) => {
  const t = TRANSLATIONS[language];
  const hadith = HADITH_DATA;
  const localText = (hadith as any)[language] || hadith.uz;

  const isCompact = variant === 'compact';

  return (
    <div className={`${isCompact ? '' : 'max-w-4xl mx-auto px-4 py-8'} relative ${className}`}>
      <div className={`relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-sepia/10 ${isCompact ? 'p-6' : 'p-8 md:p-12'} text-center rounded-sm overflow-hidden group`}>
        {/* Decorative corner accents */}
        <div className={`absolute top-0 left-0 ${isCompact ? 'w-8 h-8' : 'w-12 h-12'} opacity-10`}>
          <Ornament type="corner" className="w-full h-full text-sepia" />
        </div>
        <div className={`absolute bottom-0 right-0 ${isCompact ? 'w-8 h-8' : 'w-12 h-12'} opacity-10 rotate-180`}>
          <Ornament type="corner" className="w-full h-full text-sepia" />
        </div>

        <div className={`relative z-10 ${isCompact ? 'space-y-4' : 'space-y-6'}`}>
          {!isCompact && (
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="h-px w-12 bg-sepia/20"></span>
              <h3 className="font-display text-[10px] tracking-[0.4em] uppercase text-sepia font-bold">
                {t.hadithTitle}
              </h3>
              <span className="h-px w-12 bg-sepia/20"></span>
            </div>
          )}

          <div className={`${isCompact ? 'space-y-3' : 'space-y-6'}`}>
            <p className={`font-serif ${isCompact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} text-sepia leading-relaxed`} dir="rtl">
              {hadith.arabic}
            </p>

            <p className={`font-serif ${isCompact ? 'text-sm md:text-base' : 'text-lg md:text-xl'} text-graphite/70 dark:text-slate-300 leading-relaxed italic max-w-2xl mx-auto`}>
              {localText}
            </p>
          </div>

          <div className={isCompact ? 'pt-2' : 'pt-4'}>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-graphite/40 dark:text-white/30">
              — {hadith.source} —
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
