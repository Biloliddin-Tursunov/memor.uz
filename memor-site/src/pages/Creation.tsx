
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CREATIONS } from '../constants';
import { Ornament } from '../components/Ornament';
import { Skeleton } from '../components/Skeleton';

const Creation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-20">
         <h2 className="font-display text-5xl md:text-7xl mb-6 text-graphite dark:text-white">Ijod Namunalari</h2>
         <p className="font-serif italic text-lg text-graphite/50 dark:text-gray-400 max-w-2xl mx-auto">
           Vektor naqshlar, konseptual dizaynlar va raqamli san'at.
         </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
         {MOCK_CREATIONS.length > 0 ? (
           MOCK_CREATIONS.map((item) => (
              <div 
                  key={item.id} 
                  className="break-inside-avoid bg-white dark:bg-white/5 p-5 shadow-sm hover:shadow-2xl transition-all duration-700 group border border-graphite/5 cursor-pointer"
                  onClick={() => navigate(`/creation/${item.id}`)}
              >
                 <div className="relative overflow-hidden mb-6 rounded-sm">
                    <img src={item.imageUrl} alt={item.title} className="w-full object-cover group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-graphite/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                       <span className="text-white font-display uppercase tracking-[0.4em] text-[10px] border border-white/40 px-6 py-3">Ko'rish</span>
                    </div>
                 </div>
                 
                 <span className="text-teal text-[9px] font-bold uppercase tracking-[0.3em] mb-2 block">{item.type}</span>
                 <h3 className="font-display text-2xl mb-3 dark:text-white group-hover:text-teal transition-colors">{item.title}</h3>
                 <p className="font-serif text-sm text-graphite/60 dark:text-gray-400 leading-relaxed mb-6">
                    {item.description}
                 </p>
                 <div className="flex justify-between items-center text-[10px] font-mono text-graphite/30 uppercase tracking-widest pt-4 border-t border-dashed border-graphite/10">
                    <span>{item.author}</span>
                    <Ornament type="corner" className="w-3 h-3 opacity-20" />
                 </div>
              </div>
           ))
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {[1, 2, 3].map(i => <Skeleton key={i} type="creation" />)}
           </div>
         )}
      </div>

      <div className="mt-32 text-center">
         <p className="font-serif italic text-xl text-graphite/40 mb-8">"Go'zallik tafsilotlarda yashirin"</p>
         <Ornament type="flourish" className="opacity-10" />
      </div>
    </div>
  );
};

export default Creation;
