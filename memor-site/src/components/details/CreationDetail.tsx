
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findCreation } from '../../constants';
import { Language } from '../../types';

export const CreationDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const creation = findCreation(id || '');

  if (!creation) return <div className="p-20 text-center">Ijod namunasi topilmadi.</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in zoom-in duration-700">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-3/5 bg-white dark:bg-white/5 p-4 border border-graphite/10 shadow-sm">
           <img src={creation.imageUrl} alt={creation.title} className="w-full h-auto" />
        </div>

        <div className="w-full lg:w-2/5 sticky top-32">
          <button 
            onClick={() => navigate(-1)} 
            className="mb-12 text-[10px] font-bold uppercase tracking-widest text-graphite/30 hover:text-teal transition-all"
          >
            &larr; {language === 'uz' ? 'Galereyaga Qaytish' : 'Back'}
          </button>

          <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{creation.type}</span>
          <h1 className="font-display text-4xl md:text-5xl dark:text-white mb-8 leading-tight">{creation.title}</h1>
          
          <div className="prose prose-lg dark:prose-invert font-serif text-graphite/70 mb-10">
            <p>{creation.description}</p>
          </div>

          <div className="space-y-6 border-t border-graphite/10 pt-8">
             <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-graphite/40">
                <span>Muallif:</span>
                <span className="text-graphite dark:text-white font-bold">{creation.author}</span>
             </div>
             
             <button className="w-full py-4 bg-teal text-white font-display text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-teal-dark transition-all">
                {creation.type === 'Vector' ? 'Faylni Yuklash' : 'To\'liq Ko\'rish'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
