
import React, { useState } from 'react';
import { Plus, Search, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { ExhibitionItem, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ExhibitionViewProps {
   items: ExhibitionItem[];
   onNavigate: (state: NavigationState) => void;
}

const ExhibitionView: React.FC<ExhibitionViewProps> = ({ items, onNavigate }) => {
  const { t } = useTheme();
  const [search, setSearch] = useState('');
  const [filterStudent, setFilterStudent] = useState<string | null>(null);

  const filtered = items.filter(i => {
    const matchesSearch = i.projectTitle.toLowerCase().includes(search.toLowerCase()) || 
                          i.studentName.toLowerCase().includes(search.toLowerCase());
    const matchesStudent = filterStudent ? i.studentName === filterStudent : true;
    return matchesSearch && matchesStudent;
  });

  return (
    <div className="animate-fadeIn h-full overflow-y-auto custom-scrollbar bg-transparent font-serif pb-32">
      
      {/* PHILOSOPHY HERO SECTION */}
      <div className="bg-bgSidebar border-b border-borderDark pt-16 md:pt-24 pb-16 md:pb-32 px-6 md:px-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none text-accent">
            <Sparkles size={400} />
         </div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
               <div className="w-16 h-px bg-accent mb-6"></div>
               <h4 className="text-accent text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mb-4 font-sans">Platforma maqsadi</h4>
               <h1 className="text-4xl md:text-8xl font-caslon text-textMain tracking-tighter leading-[0.9] mb-8 max-w-4xl uppercase">
                  ME'MOR EXHIBITION
               </h1>
               <p className="text-textMuted text-lg md:text-2xl max-w-3xl leading-relaxed font-serif italic mb-10 px-4">
                  Ijodiy jarayon va yakuniy natijaning umumiy bazasi. Barcha talaba va arxitektorlar uchun ochiq arxiv.
               </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
               {['Sifatli Arxiv', 'Tajriba Almashish', 'Ommaviy Portfolio', 'Ijodiy Tanlov'].map((benefit, idx) => (
                  <div key={idx} className="bg-cardBg border border-borderDark p-4 md:p-8 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2">
                     <CheckCircle2 size={24} className="text-accent mb-4 transition-transform group-hover:scale-125" />
                     <p className="text-[10px] md:text-sm font-black text-textMain leading-tight uppercase tracking-widest font-sans">
                        {benefit}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="p-6 md:p-12 max-w-7xl mx-auto">
        {/* Gallery Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-accent/10 pb-10 mb-16">
           <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-caslon text-textMain mb-4 tracking-tighter uppercase leading-none">
                {filterStudent ? `${filterStudent} Portfoliosi` : 'Barcha Loyihalar'}
              </h2>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="text-textMuted font-serif italic border-l-4 border-accent pl-5 py-1 text-base md:text-xl">Loyiha turi va muallifi bo'yicha qidiruv.</p>
                {filterStudent && (
                   <button 
                     onClick={() => setFilterStudent(null)}
                     className="w-fit mx-auto md:mx-0 text-[10px] font-black uppercase tracking-[0.2em] text-accent border-2 border-accent px-4 py-1.5 hover:bg-accent hover:text-white transition-all rounded-full"
                   >
                     Filter Tozalash ×
                   </button>
                )}
              </div>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-80">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
                 <input 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Qidiruv..."
                    className="w-full bg-cardBg border border-borderDark px-12 py-3.5 text-sm text-textMain outline-none focus:border-accent rounded-xl shadow-inner font-sans"
                 />
              </div>
              <button 
                onClick={() => onNavigate({ type: 'exhibition-editor', title: 'Add to Exhibition' })}
                className="bg-accent hover:bg-accentHover text-bgMain px-8 py-3.5 shadow-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all active:scale-95 rounded-xl shrink-0"
              >
                 <Plus size={18} /> LOYIHA QO'SHISH
              </button>
           </div>
        </div>

        {/* Improved Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
           {filtered.length > 0 ? (
             filtered.map(item => (
                <div 
                   key={item.id}
                   onClick={() => onNavigate({ type: 'exhibition-detail', title: item.projectTitle, payload: item })}
                   className="bg-cardBg border border-borderDark group cursor-pointer hover:border-accent transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] relative overflow-hidden flex flex-col h-full rounded-xl"
                >
                   <div className="relative overflow-hidden aspect-[4/3] shrink-0 border-b border-borderDark">
                      <img 
                         src={item.image} 
                         alt={item.projectTitle} 
                         className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter sepia-[.1]" 
                      />
                      <div className="absolute inset-0 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                         <div className="bg-bgMain text-accent p-4 rounded-full shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                            <ExternalLink size={28} />
                         </div>
                      </div>
                      <div className="absolute top-5 left-5 flex gap-2">
                        <span className="bg-black/70 text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest backdrop-blur-md border border-white/10 rounded-sm">
                           {item.category}
                        </span>
                      </div>
                   </div>
                   
                   <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                         <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-mono font-bold text-textMuted uppercase tracking-widest">{item.year} EDITION</span>
                         </div>
                         <h3 className="text-2xl md:text-3xl font-caslon font-bold text-textMain mb-6 group-hover:text-accent transition-colors leading-tight tracking-tight uppercase">{item.projectTitle}</h3>
                      </div>
                      
                      <div 
                        className="flex items-center gap-4 mt-4 pt-6 border-t border-borderDark/20 group/author"
                        onClick={(e) => { 
                           e.stopPropagation(); 
                           onNavigate({ type: 'exhibition-portfolio', title: item.studentName, payload: item.studentName });
                        }}
                      >
                         <div className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent font-black text-lg group-hover/author:bg-accent group-hover/author:text-bgMain transition-all shadow-inner">
                            {item.studentName.charAt(0)}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[9px] font-black text-textMuted uppercase tracking-widest">Muallif</span>
                            <span className="text-sm font-bold text-textMain font-sans group-hover/author:text-accent transition-colors underline decoration-transparent hover:decoration-accent underline-offset-4">{item.studentName}</span>
                         </div>
                      </div>
                   </div>
                </div>
             ))
           ) : (
             <div className="col-span-full py-40 text-center border-4 border-dashed border-borderDark/40 bg-cardBg/30 rounded-2xl">
                <Search size={80} className="mx-auto text-textMuted opacity-10 mb-8" />
                <p className="text-textMuted font-serif italic text-3xl tracking-widest uppercase opacity-40">{t('no_data')}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionView;
