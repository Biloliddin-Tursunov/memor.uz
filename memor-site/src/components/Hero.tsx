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
    <section className="relative w-full pt-40 pb-8 px-3 md:pt-24 md:pb-12 md:px-6 lg:px-8">
      <div className="relative w-full min-h-[500px] md:min-h-[85vh] rounded-[2rem] flex flex-col items-center justify-center bg-[#01030a] overflow-hidden shadow-2xl border border-graphite/5 dark:border-white/10 px-4 py-16 md:px-12 md:py-24 transition-all duration-500">
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

        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto flex flex-col justify-center items-center h-auto py-12">


          {hasFeatured ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">

              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 md:mb-8 leading-tight drop-shadow-2xl px-2 break-words max-w-full">
                {title}
              </h1>
              <p className="font-serif text-base sm:text-lg md:text-xl text-white/70 italic mb-8 md:mb-12 max-w-xl md:max-w-3xl mx-auto leading-relaxed border-l-2 border-sepia/50 pl-4 md:pl-6 text-left md:text-center break-words">
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
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-sepia to-sepia/50 mb-4 tracking-tight drop-shadow-3xl">
                ME'MOR
              </h1>
              <p className="font-mono text-[10px] sm:text-xs md:text-sm text-teal uppercase tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12 opacity-80 max-w-xs md:max-w-none mx-auto leading-relaxed">
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
        {/* Scroll Indicator - Hidden on small mobile screens to save space */}
        {/* Scroll Indicator - Moved to bottom right to avoid overlap */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 animate-bounce opacity-50 hidden sm:flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/50 rotate-90 origin-right mr-2 hidden md:inline-block">Scroll</span>
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
