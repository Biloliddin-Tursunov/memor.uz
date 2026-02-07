
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language } from '../../types';
import { getLocalizedContent } from '../../lib/content';
import SEO from '../SEO';

export const CreationDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { creations, fetchCreations, isLoading } = useStore();
  const creation = creations.find(c => c.slug === slug || c.id === slug);
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
    <div className="min-h-screen bg-parchment dark:bg-graphite transition-colors duration-700 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-overlay z-50 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

      <SEO
        title={title}
        description={description}
        image={creation.imageUrl}
        lang={language}
      />

      {/* Global Style for internal images */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .content-area img {
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          border-radius: 4px;
          display: block;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }
        @media (min-width: 768px) {
          .content-area img {
            max-width: 60%;
          }
        }
      `}} />

      {/* Navigation */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-12 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-graphite/40 hover:text-teal transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.back}
        </button>
      </div>

      {/* Hero Section */}
      <div className="pt-12 pb-10 px-4 md:px-6 max-w-3xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6 opacity-60">
            <div className="h-px w-6 bg-teal/30" />
            <span className="text-teal text-[9px] font-bold uppercase tracking-[0.4em]">{creation.type}</span>
            <div className="h-px w-6 bg-teal/30" />
          </div>

          <h1 className="font-display italic text-3xl md:text-5xl lg:text-6xl dark:text-white mb-8 leading-[1.1] tracking-tight relative">
            {title}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-teal/10 to-transparent blur-3xl rounded-full pointer-events-none" />
          </h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-[10px] font-mono tracking-widest uppercase text-graphite/40 dark:text-white/30 border-y border-graphite/5 dark:border-white/5 py-4 px-6 w-full justify-center">
            <div className="flex items-center gap-2">
              <span className="opacity-40">{t.author}:</span>
              <span className="text-graphite dark:text-white font-bold">{creation.author}</span>
            </div>
            <div className="hidden md:block w-px h-3 bg-teal/20" />
            <LanguageSwitcher currentLang={language} variant="list" />
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 animate-in zoom-in duration-1000 delay-300 relative z-10 text-center">
        <div className="relative group overflow-hidden mx-auto">
          <img
            src={creation.imageUrl}
            alt={title}
            className="w-full h-auto max-h-[85vh] object-contain rounded-sm grayscale-[0.1] hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </div>

      {/* Content & Details */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-32 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="prose prose-base md:prose-lg dark:prose-invert font-serif text-graphite/80 dark:text-gray-300 first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-teal first-letter:font-bold first-letter:mt-1">
            <div
              className="content-area leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: description || '' }}
            />
          </div>

          {creation.downloadUrl && (
            <div className="mt-16 pt-12 border-t border-graphite/10 dark:border-white/10 flex flex-col items-center gap-5 animate-in slide-in-from-bottom-5 duration-700 delay-500">
              <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-graphite/30 dark:text-white/20">RAQAMLI ARXIVDAN NUSXA OLISH</p>
              <a
                href={creation.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-display font-medium tracking-tighter text-white bg-teal rounded-sm shadow-xl shadow-teal/20 hover:bg-teal/90 hover:scale-[1.02] transition-all duration-300 uppercase text-xs"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                <span className="relative flex items-center gap-3 tracking-[0.2em] font-bold text-[9px]">
                  {language === 'uz' ? 'Faylni Yuklash' : (language === 'ru' ? 'Скачать файл' : (language === 'tr' ? 'Dosyayı İndir' : 'Download File'))}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
