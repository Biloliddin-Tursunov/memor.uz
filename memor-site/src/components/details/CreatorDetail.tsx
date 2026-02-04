
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { Ornament } from '../Ornament';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language } from '../../types';
import { getLocalizedContent } from '../../lib/content';

export const CreatorDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { creators, fetchCreators, isLoading } = useStore();
  const creator = creators.find(u => u.id === id);
  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (creators.length === 0) {
      fetchCreators();
    }
  }, [creators.length, fetchCreators]);

  if (isLoading && !creator) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!creator) return <div className="p-20 text-center">{t.notFound}</div>;

  const { role, bio } = getLocalizedContent(creator, language);

  return (
    <div className="w-full animate-in fade-in duration-700 bg-parchment dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 text-center">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-graphite/40 hover:text-teal transition-all mb-12"
        >
          <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> {t.back}
        </button>

        <div className="mb-10 inline-block relative">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
            <img src={creator.avatarUrl} className="w-full h-full object-cover" alt={creator.name} />
          </div>
          <Ornament type="corner" className="absolute -top-4 -right-4 w-10 h-10 text-sepia rotate-90" />
        </div>

        <h1 className="font-display text-4xl md:text-5xl dark:text-white mb-2 uppercase tracking-tight">{creator.name}</h1>
        <div className="flex justify-center mb-2">
          <LanguageSwitcher currentLang={language} />
        </div>
        <p className="text-teal font-display text-xl uppercase tracking-widest mb-8">{role}</p>

        <div className="prose dark:prose-invert font-serif text-xl italic text-graphite/60 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
          <p>"{bio}"</p>
        </div>

        <div className="grid grid-cols-3 gap-8 border-t border-graphite/10 pt-10">
          <div><span className="block font-display text-2xl dark:text-white">12</span><span className="text-[10px] uppercase text-graphite/30">{t.projects}</span></div>
          <div><span className="block font-display text-2xl dark:text-white">40+</span><span className="text-[10px] uppercase text-graphite/30">{language === 'uz' ? 'Shogird' : (language === 'ru' ? 'Ученики' : (language === 'tr' ? 'Öğrenciler' : 'Students'))}</span></div>
          <div><span className="block font-display text-2xl dark:text-white">25y</span><span className="text-[10px] uppercase text-graphite/30">{language === 'uz' ? 'Tajriba' : (language === 'ru' ? 'Опыт' : (language === 'tr' ? 'Tecrübe' : 'Experience'))}</span></div>
        </div>
      </div>
    </div>
  );
};
