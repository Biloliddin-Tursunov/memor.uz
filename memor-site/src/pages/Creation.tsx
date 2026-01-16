
import React from 'react';
import { MOCK_CREATIONS } from '../constants';
import { Ornament } from '../components/Ornament';

const Creation: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      <div className="text-center mb-16">
         <h2 className="font-display text-5xl mb-4 text-graphite">Ijod Namunalari</h2>
         <p className="font-serif italic text-graphite/60 max-w-2xl mx-auto">
           Vektor naqshlar, konseptual dizaynlar va raqamli san'at.
         </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
         {MOCK_CREATIONS.map((item) => (
            <div key={item.id} className="break-inside-avoid bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-500 group border border-graphite/5">
               <div className="relative overflow-hidden mb-4">
                  <img src={item.imageUrl} alt={item.title} className="w-full object-cover sepia-[0.1] hover:sepia-0 transition-all duration-500" />
                  
                  {/* Overlay for download/view */}
                  <div className="absolute inset-0 bg-graphite/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button className="border border-white text-white px-6 py-2 font-display uppercase tracking-widest text-sm hover:bg-white hover:text-graphite transition-colors">
                        {item.type === 'Vector' ? 'Yuklab Olish' : 'Ko\'rish'}
                     </button>
                  </div>
               </div>
               
               <div className="flex justify-between items-start">
                  <div>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-teal block mb-1">{item.type}</span>
                     <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  </div>
                  <Ornament type="corner" className="w-4 h-4 opacity-30" />
               </div>
               <p className="font-serif text-sm text-graphite/60 leading-relaxed">
                  {item.description}
               </p>
               <div className="mt-4 pt-4 border-t border-dashed border-graphite/20 text-right text-xs font-mono text-graphite/40">
                  Muallif: {item.author}
               </div>
            </div>
         ))}
      </div>

      <div className="mt-20 text-center">
         <p className="font-serif italic text-lg text-graphite/60 mb-6">"Go'zallik tafsilotlarda yashirin"</p>
         <Ornament type="flourish" />
      </div>

    </div>
  );
};

export default Creation;
