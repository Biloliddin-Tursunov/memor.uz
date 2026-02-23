
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { Ornament } from '../Ornament';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language } from '../../types';
import { getLocalizedContent, stripHtml } from '../../lib/content';
import SEO from '../SEO';

export const EventDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, fetchEvents, isLoading } = useStore();
  const event = events.find(e => e.id === id);
  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

  if (isLoading && !event) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!event) return <div className="p-20 text-center">{t.notFound}</div>;

  const { title, description, location } = getLocalizedContent(event, language);

  return (
    <div className="w-full animate-in fade-in duration-700 bg-parchment dark:bg-[#020617]">
      <SEO
        title={title}
        description={description}
        type="event"
        lang={language}
      />
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-graphite/40 hover:text-teal transition-all mb-12"
        >
          <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> {t.back}
        </button>

        <div className="bg-white dark:bg-white/5 border border-dashed border-sepia p-8 md:p-16 relative shadow-sm">
          <div className="text-center mb-12">
            <span className="font-display text-6xl text-sepia block mb-2">{event.date.split(' ')[0]}</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-graphite/30">{event.date.split(' ').slice(1).join(' ')}</span>
          </div>

          <div className="border-y border-graphite/5 py-10 text-center">
            <h1 className="font-display text-3xl md:text-5xl dark:text-white mb-6 uppercase tracking-tight">{title}</h1>
            <div className="flex justify-center mb-4">
              <LanguageSwitcher currentLang={language} variant="list" />
            </div>
            <p className="font-mono text-xs text-teal uppercase tracking-widest flex items-center justify-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /></svg>
              {location}
            </p>
          </div>

          <div className="py-10 text-center">
            <p className="font-serif text-lg text-graphite/70 dark:text-slate-300 leading-relaxed max-w-lg mx-auto italic">
              {stripHtml(description)}
            </p>
          </div>

          <div className="text-center pt-8">
            <button className="px-12 py-4 bg-teal text-white font-display text-[10px] uppercase tracking-widest hover:bg-teal/90 transition-all shadow-xl shadow-teal/20">
              {t.participate}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
