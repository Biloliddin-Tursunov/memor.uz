
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findCreator } from '../../constants';
import { Ornament } from '../Ornament';
import { Language } from '../../types';

export const CreatorDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = findCreator(id || '');

  if (!creator) return <div className="p-20 text-center">Ijodkor topilmadi.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in duration-700 text-center">
      <button onClick={() => navigate(-1)} className="mb-12 text-[10px] font-bold uppercase tracking-widest text-graphite/40 hover:text-teal transition-all">
        &larr; {language === 'uz' ? 'Ustalar ro\'yxati' : 'Back'}
      </button>

      <div className="mb-10 inline-block relative">
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
          <img src={creator.avatarUrl} className="w-full h-full object-cover" alt={creator.name} />
        </div>
        <Ornament type="corner" className="absolute -top-4 -right-4 w-10 h-10 text-sepia rotate-90" />
      </div>

      <h1 className="font-display text-4xl md:text-5xl dark:text-white mb-2">{creator.name}</h1>
      <p className="text-teal font-display text-xl uppercase tracking-widest mb-8">{creator.role}</p>
      
      <div className="prose dark:prose-invert font-serif text-xl italic text-graphite/60 max-w-2xl mx-auto leading-relaxed mb-12">
        <p>"{creator.bio}"</p>
      </div>

      <div className="grid grid-cols-3 gap-8 border-t border-graphite/10 pt-10">
        <div><span className="block font-display text-2xl dark:text-white">12</span><span className="text-[10px] uppercase text-graphite/30">Loyiha</span></div>
        <div><span className="block font-display text-2xl dark:text-white">40+</span><span className="text-[10px] uppercase text-graphite/30">Shogird</span></div>
        <div><span className="block font-display text-2xl dark:text-white">25y</span><span className="text-[10px] uppercase text-graphite/30">Tajriba</span></div>
      </div>
    </div>
  );
};
