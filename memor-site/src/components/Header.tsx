
import React, { useState, useEffect } from 'react';
import { NavItem, PageRoute, Language } from '../types';
import { NAV_ITEMS, TRANSLATIONS } from '../constants';
import { Ornament } from './Ornament';

interface HeaderProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  // Added onSearchOpen property to satisfy HeaderProps interface
  onSearchOpen: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ activeRoute, onNavigate, onSearchOpen, language, setLanguage, theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAtTop = scrollY < 50;

  const headerClass = `bg-parchment dark:bg-slate-900 border-b border-graphite/10 dark:border-white/5 transition-all duration-500 ease-in-out ${
    isAtTop ? 'py-5 md:py-6' : 'py-3 md:py-4 shadow-md'
  }`; 
  
  const textColor = "text-graphite dark:text-slate-200";
  const logoFilter = "brightness-0 dark:invert";
  const dividerColor = "border-graphite/5 dark:border-white/5";

  const handleNavigate = (route: PageRoute) => {
    onNavigate(route);
    setIsMenuOpen(false);
  };

  const navLinks = (className: string) => (
    <nav className={className}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeRoute === item.route;
        const label = t[item.id as keyof typeof t] || item.label;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.route)}
            className="group/btn relative flex flex-col items-center"
          >
            <span className={`font-display text-[10px] sm:text-xs lg:text-lg tracking-[0.2em] md:tracking-[0.25em] font-bold uppercase transition-all duration-500 ${
              isActive ? 'text-teal' : `${textColor} group-hover/btn:text-sepia`
            }`}>
              {label}
            </span>
            <span className={`h-[1.5px] bg-sepia mt-1 transition-all duration-500 ${
              isActive ? 'w-full' : 'w-0 group-hover/btn:w-full opacity-60'
            }`}></span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 ${headerClass}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
            <div className="hidden md:grid grid-cols-3 items-center w-full">
              <div 
                className="justify-self-start flex items-center gap-4 cursor-pointer group"
                onClick={() => handleNavigate(PageRoute.HOME)}
              >
                <img 
                  src="https://memor.uz/favicon-light.svg" 
                  alt="Logo" 
                  className={`h-9 w-9 lg:h-11 lg:w-11 transition-all duration-500 ${logoFilter}`}
                />
                <h1 className={`font-display text-lg lg:text-2xl font-bold tracking-[0.15em] transition-colors duration-500 ${textColor}`}>
                  ME'MOR
                </h1>
              </div>

              <div className="justify-self-center">
                 {navLinks("flex items-center gap-8 lg:gap-16")}
              </div>

              <div className="justify-self-end flex items-center gap-4 lg:gap-8">
                {/* Desktop Search Button */}
                <button 
                  onClick={onSearchOpen}
                  className={`group p-2 transition-colors ${textColor} hover:text-teal`}
                  aria-label={t.search}
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="group flex items-center gap-4 px-2 py-2 transition-all duration-500"
                >
                  <span className={`text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${textColor}`}>
                    {t.menu}
                  </span>
                  <div className="flex flex-col items-end gap-[5px] lg:gap-[6px]">
                    <span className={`h-[1.5px] lg:h-[2px] w-7 lg:w-9 bg-graphite dark:bg-white group-hover:bg-sepia transition-all duration-500`}></span>
                    <span className={`h-[1.5px] lg:h-[2px] w-5 lg:w-6 group-hover:w-7 lg:group-hover:w-9 bg-graphite dark:bg-white group-hover:bg-sepia transition-all duration-500`}></span>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex md:hidden flex-col">
              <div className="flex items-center justify-between w-full">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleNavigate(PageRoute.HOME)}
                >
                  <img src="https://memor.uz/favicon-light.svg" alt="Logo" className={`h-8 w-8 ${logoFilter}`} />
                  <span className={`font-display text-lg font-bold tracking-[0.1em] ${textColor}`}>ME'MOR</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Mobile Search Button */}
                  <button 
                    onClick={onSearchOpen}
                    className={`p-2 ${textColor}`}
                    aria-label={t.search}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>

                  <button onClick={() => setIsMenuOpen(true)} className="p-2 group">
                     <div className="flex flex-col items-end gap-[4px]">
                        <span className="h-[1.5px] w-6 bg-graphite dark:bg-white"></span>
                        <span className="h-[1.5px] w-4 bg-graphite dark:bg-white group-hover:w-6 transition-all"></span>
                     </div>
                  </button>
                </div>
              </div>

              <div className={`mt-3 pt-3 border-t ${dividerColor} flex justify-center`}>
                {navLinks("flex items-center gap-8")}
              </div>
            </div>
        </div>
      </header>

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-parchment dark:bg-slate-900 z-50 shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] border-l border-graphite/10 dark:border-white/5 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-8 md:p-12 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-10">
             <div className="flex items-center gap-3">
                <Ornament type="corner" className="w-5 h-5 text-sepia" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sepia">{t.settings}</span>
             </div>
             <button onClick={() => setIsMenuOpen(false)} className="group p-2 transition-transform duration-500 hover:rotate-90">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="absolute w-7 h-[1.5px] bg-graphite dark:bg-white rotate-45"></span>
                  <span className="absolute w-7 h-[1.5px] bg-graphite dark:bg-white -rotate-45"></span>
                </div>
             </button>
          </div>

          {/* Settings moved higher as requested */}
          <div className="space-y-8 mb-12">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-graphite/30 dark:text-white/20 mb-3">{t.language}</label>
                   <div className="grid grid-cols-2 gap-2">
                      {(['uz', 'en', 'ru', 'tr'] as Language[]).map((lang) => (
                         <button
                           key={lang}
                           onClick={() => setLanguage(lang)}
                           className={`h-9 text-[10px] tracking-widest uppercase border transition-all ${
                              language === lang ? 'border-sepia bg-sepia text-white font-bold' : 'border-graphite/10 dark:border-white/10 text-graphite/40'
                           }`}
                         >
                            {lang}
                         </button>
                      ))}
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-graphite/30 dark:text-white/20 mb-3">{t.theme}</label>
                   <div className="flex gap-2">
                       <button 
                          onClick={() => setTheme('light')} 
                          className={`flex-1 h-9 text-[10px] flex items-center justify-center gap-2 tracking-widest uppercase border transition-all ${theme === 'light' ? 'border-teal bg-teal text-white font-bold' : 'border-graphite/10 dark:border-white/10 text-graphite/40'}`}
                       >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                           <span className="hidden sm:inline">{t.themeLight}</span>
                       </button>
                       <button 
                          onClick={() => setTheme('dark')} 
                          className={`flex-1 h-9 text-[10px] flex items-center justify-center gap-2 tracking-widest uppercase border transition-all ${theme === 'dark' ? 'border-teal bg-teal text-white font-bold' : 'border-graphite/10 dark:border-white/10 text-graphite/40'}`}
                       >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                           <span className="hidden sm:inline">{t.themeDark}</span>
                       </button>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex-grow space-y-4">
               {[
                 { label: t.about, route: PageRoute.ABOUT },
                 { label: t.news, route: PageRoute.NEWS },
                 { label: t.support, route: PageRoute.SUPPORT },
                 { label: t.contact, route: PageRoute.CONTACT },
               ].map((item) => (
                 <button
                   key={item.route}
                   onClick={() => handleNavigate(item.route)}
                   className="block text-2xl md:text-3xl font-display text-graphite/50 dark:text-white/30 hover:text-sepia dark:hover:text-sepia hover:translate-x-4 transition-all duration-500 text-left w-full border-b border-graphite/5 dark:border-white/5 pb-4"
                 >
                   {item.label}
                 </button>
               ))}
          </div>

          <div className="mt-auto pt-8 border-t border-graphite/10 dark:border-white/10 text-center">
             <p className="text-[10px] text-graphite/30 dark:text-white/20 font-mono tracking-[0.4em] uppercase">{t.copyright}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
