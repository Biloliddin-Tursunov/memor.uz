import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { PageRoute, Language, Article } from '../types';
import { Ornament } from './Ornament';
import { getLocalizedContent } from '../lib/content';

interface HeroProps {
  onNavigate: (route: PageRoute) => void;
  onItemClick: (item: any) => void;
  language: Language;
  featuredItem?: Article | null;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, language, featuredItem }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  // Logic to determine what to show. If data exists, show the latest article.
  const hasFeatured = !!featuredItem;
  const { title, description } = hasFeatured && featuredItem ? getLocalizedContent(featuredItem, language) : { title: '', description: '' };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#01030a] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {hasFeatured && featuredItem?.imageUrl ? (
          <>
            <img src={featuredItem.imageUrl} alt={title} className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01030a] via-[#01030a]/60 to-transparent"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            <div className="nebula opacity-40"></div>
          </>
        )}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <Ornament type="flourish" className="mb-8 opacity-60 w-24 h-24 mx-auto text-sepia animate-spin-slow" />

        {hasFeatured ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block px-4 py-1 mb-6 border border-teal/30 text-teal text-xs font-bold uppercase tracking-[0.4em] bg-teal/5 rounded-full backdrop-blur-sm">
              {t.newArticle || 'Yangi Maqola'}
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8 leading-tight drop-shadow-2xl">
              {title}
            </h1>
            <p className="font-serif text-lg md:text-2xl text-white/70 italic mb-12 max-w-3xl mx-auto leading-relaxed border-l-2 border-sepia/50 pl-6">
              {description?.slice(0, 150)}...
            </p>

            <button
              onClick={() => navigate(`/${language}/article/${featuredItem?.slug}`)}
              className="group relative px-12 py-5 bg-transparent border border-white/20 text-white font-display uppercase tracking-[0.25em] text-sm overflow-hidden transition-all hover:border-teal hover:text-teal"
            >
              <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-[250ms] ease-out group-hover:w-full"></span>
              <span className="relative z-10 flex items-center gap-3">
                {t.readMore} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </button>
          </div>
        ) : (
          // Fallback / Initial State (Logo)
          <>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-sepia to-sepia/50 mb-4 tracking-tight drop-shadow-3xl">
              ME'MOR
            </h1>
            <p className="font-mono text-xs md:text-sm text-teal uppercase tracking-[0.6em] mb-12 opacity-80">
              {language === 'uz' ? "O'tmish va Kelajak Garmoniyasi" : "Harmony of Past & Future"}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full px-4">
              <button onClick={() => onNavigate(PageRoute.KNOWLEDGE)} className="w-full md:w-auto px-8 py-3 md:px-10 md:py-4 bg-teal text-white font-display uppercase tracking-widest text-xs hover:bg-teal-dark transition-all shadow-lg hover:shadow-teal/20 transform hover:-translate-y-1">
                {t.explore}
              </button>
              <button onClick={() => onNavigate(PageRoute.ABOUT)} className="w-full md:w-auto px-8 py-3 md:px-10 md:py-4 border border-white/10 text-white font-display uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                {t.aboutUs}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
