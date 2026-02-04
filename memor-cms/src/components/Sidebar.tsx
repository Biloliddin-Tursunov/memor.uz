import React from 'react';
import { Feather, Map as MapIcon, ChevronRight } from 'lucide-react';
import { Section } from '../types';

interface NavProps {
  currentSection: Section;
  onHome: () => void;
}

const Navigation: React.FC<NavProps> = ({ currentSection, onHome }) => {
  const titles: Record<string, string> = {
    'ilm': "Ilmiy bo'lim",
    'harakat': 'Harakat',
    'ijod': 'Ijod',
    'settings': 'Rejalar',
    'team': "Jamoa A'zolari",
    'messages': 'Xabarlar'
  };

  return (
    <nav className="w-full h-20 flex items-center justify-between px-8 border-b border-sepia/30 bg-parchment-dark/95 backdrop-blur fixed top-0 left-0 z-50">
      <button onClick={onHome} className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full border border-sepia flex items-center justify-center bg-graphite group-hover:bg-teal transition-colors shadow-[0_0_10px_#B08968]">
          <MapIcon size={20} className="text-sepia" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-cinzel font-bold text-parchment tracking-widest text-lg group-hover:text-sepia transition-colors">ME'MOR</span>
          <span className="text-[10px] uppercase text-sepia/70 tracking-[0.2em]">Bosh Sahifa</span>
        </div>
      </button>

      {currentSection !== 'dashboard' && (
        <div className="flex items-center gap-4 animate-fadeIn">
          <ChevronRight className="text-[#5c4033]" />
          <span className="font-cinzel text-xl text-[#d4af37] border-b border-[#740001] pb-1">
            {titles[currentSection] || currentSection}
          </span>
        </div>
      )}

      <div className="w-10 h-10 opacity-0 sm:opacity-100">
        <Feather className="text-[#5c4033]" />
      </div>
    </nav>
  );
};

export default Navigation;