
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language } from '../../types';
import { getLocalizedContent } from '../../lib/content';

export const CreationDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { creations, fetchCreations, isLoading } = useStore();
  const creation = creations.find(c => c.id === id);
  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (creations.length === 0) {
      fetchCreations();
    }
  }, [creations.length, fetchCreations]);

  if (isLoading && !creation) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!creation) return <div className="p-20 text-center">{t.notFound}</div>;

  const { title, description } = getLocalizedContent(creation, language);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in zoom-in duration-700">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-3/5 bg-white dark:bg-white/5 p-4 border border-graphite/10 shadow-sm">
          <img src={creation.imageUrl} alt={title} className="w-full h-auto" />
        </div>

        <div className="w-full lg:w-2/5 sticky top-32">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-graphite/30 hover:text-teal transition-all mb-12"
          >
            <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> {t.back}
          </button>

          <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{creation.type}</span>
          <h1 className="font-display text-4xl md:text-5xl dark:text-white mb-8 leading-tight">{title}</h1>
          <div className="flex justify-start mb-8">
            <LanguageSwitcher currentLang={language} />
          </div>

          <div className="prose prose-lg dark:prose-invert font-serif text-graphite/70 mb-10">
            <p>{description}</p>
          </div>

          <div className="space-y-6 border-t border-graphite/10 pt-8">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-graphite/40">
              <span>{t.author}:</span>
              <span className="text-graphite dark:text-white font-bold">{creation.author}</span>
            </div>

            <button className="w-full py-4 bg-teal text-white font-display text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-teal/90 transition-all shadow-xl shadow-teal/10">
              {creation.type === 'Vector' ? (language === 'uz' ? 'Faylni Yuklash' : (language === 'ru' ? 'Скачать файл' : (language === 'tr' ? 'Dosyayı İndir' : 'Download File'))) : t.view}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
