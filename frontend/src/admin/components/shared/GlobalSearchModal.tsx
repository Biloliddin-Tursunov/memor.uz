import React, { useState, useEffect, useRef } from 'react';
import { Search, Hash, FileText, User, ArrowRight, X } from 'lucide-react';
import { NavigationState } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavigationState) => void;
}

const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 50); } else { setQuery(''); }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleResultClick = (page: NavigationState) => { onNavigate(page); onClose(); };

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center md:pt-[10vh] p-0 md:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn" onClick={onClose}>
      <div className="w-full max-w-2xl bg-bgMain border-y md:border border-borderDark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-slideDown font-serif text-textMain h-full md:h-auto flex flex-col md:rounded-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center px-6 py-5 border-b border-borderDark bg-bgSidebar shrink-0">
          <Search className="text-accent" size={24} />
          <input ref={inputRef} type="text" placeholder={t('search_placeholder') || 'Nima qidiramiz?'} className="flex-1 bg-transparent border-none outline-none text-textMain px-5 py-1 text-xl placeholder:text-textMuted/40 font-sans font-medium" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button onClick={onClose} className="md:hidden p-2 text-textMuted"><X size={24}/></button>
          <div className="hidden md:flex text-[10px] font-black text-textMuted border border-borderDark px-2 py-1 rounded bg-cardBg font-sans uppercase tracking-[0.2em] shadow-sm">ESC</div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          {!query && (<div className="text-[10px] text-textMuted font-black px-5 py-3 uppercase tracking-[0.3em] font-sans opacity-60">Yaqindagi qidiruvlar</div>)}
          <div className="space-y-2">
             <ResultItem icon={<Hash size={18} className="text-blue-500" />} title="Website Redesign" subtitle="IT Department • Board View" onClick={() => handleResultClick({ type: 'project', id: 'it-website', title: 'Website Redesign' })} />
             <ResultItem icon={<FileText size={18} className="text-purple-500" />} title="Modernizm Maqolasi" subtitle="CMS Studio • Knowledge Pillar" onClick={() => handleResultClick({ type: 'cms-content', title: 'CMS Database' })} />
              <ResultItem icon={<User size={18} className="text-emerald-500" />} title="Biloliddin Tursunov" subtitle="Lead Admin • Personal Profile" onClick={() => handleResultClick({ type: 'profile', title: 'Settings' })} />
          </div>
          {query && (
             <div className="py-20 text-center text-textMuted font-serif italic">
                <p className="text-2xl tracking-widest opacity-30 mb-2">"{query}"</p>
                <p className="text-xs uppercase font-black tracking-widest">bo‘yicha natijalar topilmadi</p>
             </div>
          )}
        </div>
        <div className="hidden md:flex items-center justify-between px-6 py-3 bg-bgSidebar/50 border-t border-borderDark text-[9px] font-black uppercase tracking-[0.2em] text-textMuted">
           <div className="flex gap-4">
              <span className="flex items-center gap-1.5"><div className="w-4 h-4 bg-cardBg border border-borderDark flex items-center justify-center rounded">↑</div> Tanlash</span>
              <span className="flex items-center gap-1.5"><div className="w-8 h-4 bg-cardBg border border-borderDark flex items-center justify-center rounded">ENTER</div> Ochish</span>
           </div>
           <span>ME'MOR SEARCH v1.2</span>
        </div>
      </div>
    </div>
  );
};

const ResultItem: React.FC<{ icon: React.ReactNode, title: string, subtitle: string, onClick: () => void }> = ({ icon, title, subtitle, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-4 px-5 py-4 rounded-lg hover:bg-accent/5 group transition-all text-left border border-transparent hover:border-accent/10">
    <div className="w-12 h-12 rounded-xl bg-cardBg border border-borderDark flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
    <div className="flex-1 min-w-0">
       <div className="text-base font-bold text-textMain group-hover:text-accent transition-colors font-serif truncate">{title}</div>
       <div className="text-[10px] text-textMuted font-sans font-bold uppercase tracking-widest truncate">{subtitle}</div>
    </div>
    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 text-accent -translate-x-4 group-hover:translate-x-0 transition-all shrink-0" />
  </button>
);

export default GlobalSearchModal;