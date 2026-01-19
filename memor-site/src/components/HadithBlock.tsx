
import React, { useState } from 'react';
import { HADITH_DATA } from '../constants';
import { Ornament } from './Ornament';

interface HadithBlockProps {
  className?: string;
  isSidebar?: boolean;
}

const HadithBlock: React.FC<HadithBlockProps> = ({ className = '', isSidebar = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar rejimida (Home sahifasidagi Ilm xazinasi sidebarida)
  if (isSidebar) {
    return (
      <>
        <div 
          onClick={() => setIsOpen(true)}
          className={`p-8 border border-dashed border-sepia/20 bg-sepia/5 relative cursor-pointer group hover:bg-sepia/10 transition-colors ${className}`}
        >
          <Ornament type="corner" className="absolute top-2 right-2 w-4 h-4 opacity-20 rotate-90" />
          <p className="font-serif italic text-lg text-graphite/60 dark:text-slate-300 leading-relaxed mb-4">
            {HADITH_DATA.uzbekShort}
          </p>
          <div className="flex items-center gap-2">
             <div className="h-px w-6 bg-sepia/30"></div>
             <span className="text-[9px] font-bold uppercase tracking-widest text-sepia">Rasululloh ﷺ</span>
          </div>
        </div>
        {isOpen && <HadithModal onClose={() => setIsOpen(false)} />}
      </>
    );
  }

  // Standart rejimda (Knowledge sahifasi sarlavhasi ostida)
  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={`group cursor-pointer transition-all duration-700 relative overflow-hidden ${className}`}
      >
        <div className="p-8 md:p-10 border border-sepia/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm relative text-center hover:border-sepia/40 hover:shadow-2xl hover:shadow-sepia/5 transition-all">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-parchment dark:bg-[#020617] px-4 transition-colors">
            <Ornament type="flourish" className="w-8 h-8 opacity-40 group-hover:opacity-80 transition-opacity" />
          </div>
          
          <div className="space-y-4">
            <p className="font-serif text-lg md:text-2xl leading-[1.6] text-graphite/80 dark:text-slate-300 italic">
              {HADITH_DATA.uzbekShort}
            </p>
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-sepia font-display text-xs tracking-[0.2em] font-bold uppercase">Rasululloh (Sollallohu Alayhi Vasallam)</span>
              <span className="text-[9px] font-mono text-graphite/30 dark:text-white/20 uppercase tracking-widest group-hover:text-sepia transition-colors">To'liq matn uchun bosing</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-parchment dark:bg-[#020617] px-4">
            <div className="h-px w-12 bg-sepia/30 group-hover:w-24 transition-all duration-700"></div>
          </div>
        </div>
      </div>
      {isOpen && <HadithModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

// Modal Oynasi (Faqat O'zbekcha to'liq matn va Manbalar)
const HadithModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
    <div 
      className="absolute inset-0 bg-graphite/80 backdrop-blur-lg animate-in fade-in duration-500"
      onClick={onClose}
    />
    <div className="relative w-full max-w-2xl bg-parchment dark:bg-slate-900 shadow-[0_35px_60px_-15px_rgba(176,137,104,0.3)] overflow-hidden animate-in zoom-in duration-300 rounded-sm border border-sepia/20">
      <div className="p-8 md:p-12 max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <h4 className="font-display text-2xl md:text-3xl dark:text-white uppercase tracking-tight">Ilm Fazilati</h4>
            <div className="h-0.5 w-12 bg-sepia"></div>
          </div>
          <button onClick={onClose} className="text-sepia hover:rotate-90 transition-transform p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="space-y-10">
          {/* Full Uzbek Translation */}
          <div className="relative">
            <div className="absolute -top-6 -left-4 text-6xl text-sepia/10 font-serif opacity-50">“</div>
            <p className="font-serif text-lg md:text-xl leading-relaxed text-graphite/80 dark:text-slate-300 italic border-l-2 border-sepia pl-6 py-2">
              {HADITH_DATA.uzbekFull}
            </p>
          </div>

          <div className="space-y-6">
            <h5 className="font-display text-lg text-sepia uppercase tracking-widest font-bold">Manbalar</h5>
            <div className="grid gap-6">
              {HADITH_DATA.sources.map((source, idx) => (
                <div key={idx} className="group/item">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-2 h-2 rounded-full bg-sepia/40"></div>
                     <span className="font-bold text-xs uppercase tracking-widest text-graphite dark:text-white group-hover/item:text-sepia transition-colors">{source.name}</span>
                  </div>
                  <p className="font-serif text-sm text-graphite/60 dark:text-slate-400 pl-5 italic">
                    {source.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-sepia/10 text-center">
            <p className="font-serif text-sm opacity-60 dark:text-slate-500 mb-8">
              {HADITH_DATA.info}
            </p>
            <button 
              onClick={onClose}
              className="px-10 py-3 bg-sepia text-white font-display text-[10px] uppercase tracking-[0.3em] hover:bg-sepia-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-sepia/20"
            >
              Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HadithBlock;
