
import React, { useState } from 'react';
import { NavItem, PageRoute, Language } from '../types';
import { NAV_ITEMS, TRANSLATIONS } from '../constants';

interface HeaderProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ activeRoute, onNavigate, language, setLanguage, theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const subNavItems = [
    { label: t.about, route: PageRoute.ABOUT },
    { label: t.news, route: PageRoute.NEWS },
    { label: t.support, route: PageRoute.SUPPORT },
    { label: t.contact, route: PageRoute.CONTACT },
  ];

  const handleNavigate = (route: PageRoute) => {
    onNavigate(route);
    setIsMenuOpen(false);
  };

  const renderNavLinks = (isMobile: boolean) => (
    <ul className={`flex items-center ${isMobile ? 'gap-8 md:gap-16' : 'gap-16'}`}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeRoute === item.route;
        const label = t[item.id as keyof typeof t] || item.label;
        return (
          <li key={item.id} className="relative">
            <button
              onClick={() => handleNavigate(item.route)}
              className={`group/btn relative py-1 lg:py-2 px-1 lg:px-3 transition-all duration-300 flex flex-col items-center`}
            >
              {/* Top Ornament */}
              <span className={`text-sepia text-[8px] lg:text-xs mb-1 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover/btn:opacity-100 group-hover/btn:translate-y-0'}`}>
                ✦
              </span>

              <span className={`font-display text-sm md:text-lg lg:text-xl tracking-widest font-bold uppercase transition-colors duration-300 ${isActive ? 'text-teal' : 'text-graphite group-hover/btn:text-sepia-dark'
                }`}>
                {label}
              </span>

              {/* Bottom Line */}
              <span className={`h-[1px] md:h-[2px] bg-teal mt-1 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover/btn:w-full opacity-50'
                }`}></span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-parchment/95 backdrop-blur-sm shadow-sm transition-all duration-300 flex flex-col border-b border-graphite/10">

        {/* TOP ROW: Logo and Burger (Mobile/Tablet) | All (Desktop) */}
        {/* On Mobile/Tablet: This row has a bottom border acting as Divider 1 */}
        {/* On Desktop: No bottom border for this inner div, the Header's bottom border is the main one */}
        <div className="w-full flex justify-between items-center px-4 md:px-8 lg:px-12 h-16 md:h-20 lg:h-28 relative lg:border-none border-b border-graphite/10">

          {/* LEFT: Logo & Brand */}
          <div
            className="flex items-center gap-3 md:gap-4 cursor-pointer group z-50 shrink-0"
            onClick={() => handleNavigate(PageRoute.HOME)}
          >
            <img
              src="https://memor.uz/favicon-light.svg"
              alt="Logo"
              className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 filter brightness-0 opacity-90 group-hover:opacity-100 transition-all dark:invert dark:brightness-0"
            />
            <div className="flex flex-col justify-center hidden sm:flex">
              <h1 className="font-display text-xl md:text-2xl lg:text-5xl tracking-tighter text-graphite leading-none group-hover:text-teal transition-colors">
                ME'MOR
              </h1>
            </div>
          </div>

          {/* CENTER: Desktop Nav (Hidden on Mobile/Tablet) */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {renderNavLinks(false)}
          </nav>

          {/* RIGHT: Burger Menu Trigger */}
          <div>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex flex-col items-end gap-[5px] md:gap-[6px] p-2 md:p-3 cursor-pointer hover:bg-graphite/5 rounded-full transition-colors"
              aria-label="Menu"
            >
              <span className="w-6 md:w-8 h-[2px] bg-graphite group-hover:bg-teal transition-colors"></span>
              <span className="w-4 md:w-6 h-[2px] bg-graphite group-hover:bg-teal transition-colors group-hover:w-6 md:group-hover:w-8 duration-300"></span>
              <span className="w-6 md:w-8 h-[2px] bg-graphite group-hover:bg-teal transition-colors"></span>
            </button>
          </div>
        </div>

        {/* BOTTOM ROW: Navigation Links (Mobile/Tablet Only) */}
        {/* Sits between Top Row border (Divider 1) and Header border (Divider 2) */}
        <div className="lg:hidden w-full flex justify-center py-3 bg-parchment/50">
          <nav>
            {renderNavLinks(true)}
          </nav>
        </div>

      </header>

      {/* OVERLAY BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* SIDEBAR DRAWER (Right Side) */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] md:w-[400px] bg-parchment z-50 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] border-l border-graphite/10 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Background Texture inside Sidebar */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-paper-texture mix-blend-multiply dark:mix-blend-overlay"></div>

        <div className="relative z-50 h-full flex flex-col p-6 md:p-10 overflow-y-auto">

          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-10 shrink-0">
            <div className="flex items-center gap-2 opacity-50">
              <span className="text-xs font-mono uppercase tracking-widest">{t.menu}</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="group p-2 hover:bg-graphite/5 rounded-full transition-colors"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className="absolute w-6 h-[2px] bg-graphite rotate-45 group-hover:bg-teal transition-colors"></span>
                <span className="absolute w-6 h-[2px] bg-graphite -rotate-45 group-hover:bg-teal transition-colors"></span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow space-y-8">
            {/* Secondary Links */}
            <div className="space-y-4">
              {subNavItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavigate(item.route)}
                  className="block text-xl md:text-2xl font-display text-graphite/80 hover:text-teal hover:pl-4 transition-all duration-300 text-left w-full"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="w-full h-px bg-graphite/10 my-6"></div>

            {/* SETTINGS AREA */}
            <div className="space-y-6">

              {/* Language Switcher */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite/50 mb-3">{t.language}</label>
                <div className="flex gap-2">
                  {(['uz', 'en', 'ru', 'tr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1 text-xs uppercase border transition-colors ${language === lang
                          ? 'border-teal bg-teal text-parchment font-bold'
                          : 'border-graphite/20 text-graphite hover:border-graphite'
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite/50 mb-3">{t.theme}</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-2 px-3 py-1 text-xs uppercase border transition-colors ${theme === 'light'
                        ? 'border-teal bg-teal text-parchment font-bold'
                        : 'border-graphite/20 text-graphite hover:border-graphite'
                      }`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    {t.themeLight}
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-2 px-3 py-1 text-xs uppercase border transition-colors ${theme === 'dark'
                        ? 'border-teal bg-teal text-parchment font-bold'
                        : 'border-graphite/20 text-graphite hover:border-graphite'
                      }`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    {t.themeDark}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="mt-10 pt-10 border-t border-graphite/10">
            {/* Search */}
            <div className="mb-8">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite/50 mb-2">{t.search}</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="..."
                  className="w-full bg-transparent border-b border-graphite/20 py-2 text-base font-serif placeholder:text-graphite/30 focus:outline-none focus:border-teal transition-colors text-graphite"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-graphite/50 hover:text-teal transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Instagram', 'Telegram', 'Facebook', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="text-graphite hover:text-teal transition-colors group relative">
                    <span className="text-xs font-bold uppercase tracking-widest border-b border-transparent group-hover:border-teal pb-0.5">{social}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 text-[10px] text-graphite/40 font-mono">
                {t.copyright}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
