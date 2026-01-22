
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_ARTICLES, MOCK_PROJECTS, TRANSLATIONS } from '../constants';
import { PageRoute, DisplayItem, Language } from '../types';

interface HeroProps {
  onNavigate: (route: PageRoute) => void;
  onItemClick: (item: any) => void;
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, onItemClick, language }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const t = TRANSLATIONS[language];

  // Hero uchun slaydlar yoki fallback
  const slides = useMemo(() => {
    const dataSlides = [
      ...(MOCK_PROJECTS[0] ? [{
        type: t.project,
        navType: 'project',
        id: MOCK_PROJECTS[0].id,
        title: MOCK_PROJECTS[0].title,
        desc: MOCK_PROJECTS[0].description,
        image: MOCK_PROJECTS[0].imageUrl,
        tag: 'YANGI LOYIHA',
        status: 'BATAFSIL TANISHISH',
        route: PageRoute.ACTION,
        isFallback: false
      }] : []),
      ...(MOCK_ARTICLES[0] ? [{
        type: 'ILMIY MAQOLA',
        navType: 'article',
        id: MOCK_ARTICLES[0].id,
        title: MOCK_ARTICLES[0].title,
        desc: MOCK_ARTICLES[0].excerpt,
        image: MOCK_ARTICLES[0].imageUrl,
        tag: t.ilm,
        status: t.readMore?.toUpperCase() || 'O\'QISHNI DAVOM ETTIRISH',
        route: PageRoute.KNOWLEDGE,
        isFallback: false
      }] : [])
    ];

    if (dataSlides.length === 0) {
      return [{
        type: 'PLATFORMA',
        navType: 'about',
        id: 'intro',
        title: "Me'mor: Tarix Va Kelajak Uyg'unligi",
        desc: "An'anaviy me'morchilik va zamonaviy yondashuvni birlashtirgan intellektual platformaga xush kelibsiz.",
        image: 'https://memor.uz/favicon-light.svg',
        tag: 'MA\'LUMOT',
        status: 'BIZ HAQIMIZDA',
        route: PageRoute.ABOUT,
        isFallback: true
      }];
    }
    
    return dataSlides;
  }, [t, language]);

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const current = slides[activeSlide];

  const handleHeroAction = () => {
    if (!current) return;
    
    if (current.isFallback) {
      onNavigate(PageRoute.ABOUT);
    } else {
      onItemClick({ 
        id: current.id, 
        type: current.navType 
      });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] cosmic-bg text-white flex items-center pt-[80px] md:pt-[100px] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="nebula opacity-80"></div>
          <div className="absolute inset-0 stars-overlay opacity-50"></div>
          {/* Subtle gradient to transition to the next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-parchment/10 dark:from-[#01030a] to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* INFO ON THE LEFT */}
              <div className="lg:col-span-6 space-y-8 animate-in fade-in slide-in-from-left-12 duration-1000">
                  <div className="flex items-center gap-4">
                      <div className="h-px w-8 bg-sepia"></div>
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-sepia uppercase">
                          {current.tag}
                      </span>
                  </div>
                  
                  <h1 className="font-display text-4xl md:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight transition-all duration-1000 ease-out">
                      {current.title}
                  </h1>
                  
                  <p className="font-serif text-base md:text-xl text-white/60 max-w-xl leading-relaxed italic border-l-2 border-sepia/30 pl-8 py-2">
                      {current.desc}
                  </p>
                  
                  <div className="pt-4 flex flex-wrap gap-6 items-center">
                    <button 
                        onClick={handleHeroAction}
                        className="group relative flex items-center gap-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white border border-white/30 px-8 py-5 transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-sepia translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="relative z-10">{current.status}</span>
                        <span className="relative z-10 text-lg group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
                    </button>
                    
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setActiveSlide(idx)}
                                className={`h-1 transition-all duration-500 ${activeSlide === idx ? 'w-12 bg-sepia' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>
                  </div>
              </div>
              
              {/* VISUAL ON THE RIGHT */}
              <div className="lg:col-span-6 relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                  {current.isFallback ? (
                      <div className="relative group">
                           <img 
                              src={current.image} 
                              alt="Me'mor Logo" 
                              className="h-64 md:h-96 w-auto filter invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                           />
                           <div className="absolute inset-0 bg-sepia/20 blur-[100px] rounded-full -z-10 animate-pulse-slow"></div>
                      </div>
                  ) : (
                      <div 
                        className="relative p-1 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden aspect-[4/5] md:aspect-[3/4] w-full max-w-md group cursor-pointer" 
                        onClick={handleHeroAction}
                      >
                          <img 
                            src={current.image} 
                            alt={current.title} 
                            className="w-full h-full object-cover brightness-[0.85] grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                              <span className="text-[9px] font-mono text-white/40 tracking-widest">MEM-{current.navType?.toUpperCase()}-REF</span>
                              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
                                  <span className="text-xl">+</span>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
