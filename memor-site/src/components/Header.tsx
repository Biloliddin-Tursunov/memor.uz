
import React from 'react';
import { NavItem, PageRoute } from '../types';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const Header: React.FC<HeaderProps> = ({ activeRoute, onNavigate }) => {
  const subNavItems = [
    { label: 'Biz Haqimizda', route: PageRoute.ABOUT },
    { label: 'Yangiliklar', route: PageRoute.NEWS },
    { label: 'Homiylik', route: PageRoute.SUPPORT },
    { label: 'Aloqa', route: PageRoute.CONTACT },
  ];

  return (
    <header className="w-full pt-4 pb-2 md:pt-8 md:pb-4 px-4 md:px-12 flex flex-col items-center border-b-[3px] border-double border-graphite/10">
      
      {/* Top Ornamental Bar */}
      <div className="w-full flex justify-center md:justify-between items-center mb-4 md:mb-6">
        <div className="hidden md:block w-32 h-[1px] bg-graphite/30"></div>
        <div className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] font-serif text-graphite/60 uppercase text-center">
          Samarqand • 2025 • SamDAQu
        </div>
        <div className="hidden md:block w-32 h-[1px] bg-graphite/30"></div>
      </div>

      {/* Main Title Area (Clean, no side logo) */}
      <div 
        className="flex flex-col items-center mb-2 cursor-pointer hover:opacity-90 transition-opacity select-none"
        onClick={() => onNavigate(PageRoute.HOME)}
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-graphite text-center leading-none">
          ME'MOR
        </h1>
      </div>

      <p className="font-serif italic text-sepia-dark text-sm md:text-lg mb-6 md:mb-8 text-center px-4">
        — Dunyoni go'zallashtirish uchun! —
      </p>

      {/* Navigation - Roman Numerals */}
      <nav className="w-full max-w-4xl border-t border-graphite/20 py-3 mb-2">
        <ul className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-12">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="text-center w-full md:w-auto">
              <button
                onClick={() => onNavigate(item.route)}
                className={`group relative py-2 px-4 md:px-6 w-full transition-all duration-300 ${
                  activeRoute === item.route 
                    ? 'text-teal font-semibold' 
                    : 'text-graphite hover:text-teal'
                }`}
              >
                <span className="block font-display text-xl md:text-2xl mb-1">
                  {item.roman}. {item.label}
                </span>
                <span className="block text-[8px] md:text-[10px] tracking-widest uppercase opacity-60 font-sans">
                  {item.subLabel}
                </span>
                
                {/* Active Indicator (Ornamental) */}
                {activeRoute === item.route && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sepia text-lg leading-none hidden md:block">
                    ◈
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Subnav Links */}
      <div className="w-full max-w-3xl flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-12 py-3 border-t border-b border-graphite/10 text-[10px] md:text-sm font-bold tracking-[0.15em] uppercase text-graphite/70">
        {subNavItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => onNavigate(item.route)}
            className={`hover:text-sepia-dark transition-colors relative whitespace-nowrap ${activeRoute === item.route ? 'text-teal' : ''}`}
          >
            {item.label}
            {activeRoute === item.route && (
               <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-px bg-teal"></span>
            )}
          </button>
        ))}
      </div>
      
    </header>
  );
};

export default Header;
