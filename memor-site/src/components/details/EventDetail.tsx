
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findEvent } from '../../constants';
import { Ornament } from '../Ornament';
import { Language } from '../../types';

export const EventDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = findEvent(id || '');

  if (!event) return <div className="p-20 text-center">Tadbir topilmadi.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <button onClick={() => navigate(-1)} className="mb-8 text-[10px] font-bold uppercase tracking-widest text-graphite/40 hover:text-teal transition-all">
        &larr; {language === 'uz' ? 'Tadbirlarga qaytish' : 'Back'}
      </button>

      <div className="bg-white dark:bg-white/5 border border-dashed border-sepia p-8 md:p-16 relative shadow-sm">
        <div className="text-center mb-12">
          <span className="font-display text-6xl text-sepia block mb-2">{event.date.split(' ')[0]}</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-graphite/30">{event.date.split(' ').slice(1).join(' ')}</span>
        </div>

        <div className="border-y border-graphite/5 py-10 text-center">
          <h1 className="font-display text-3xl md:text-5xl dark:text-white mb-6 uppercase tracking-tight">{event.title}</h1>
          <p className="font-mono text-xs text-teal uppercase tracking-widest flex items-center justify-center gap-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
            {event.location}
          </p>
        </div>

        <div className="py-10 text-center">
          <p className="font-serif text-lg text-graphite/70 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
            {event.description}
          </p>
        </div>

        <div className="text-center">
          <button className="px-12 py-4 bg-teal text-white font-display text-[10px] uppercase tracking-widest hover:bg-teal-dark transition-all">
            Ro'yxatdan O'tish
          </button>
        </div>
      </div>
    </div>
  );
};
