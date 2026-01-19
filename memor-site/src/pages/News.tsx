
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ornament } from '../components/Ornament';
import { MOCK_NEWS_DATA } from '../constants';
import { Skeleton } from '../components/Skeleton';

const News: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12 border-b border-graphite/10 dark:border-white/10 pb-4">
        <h2 className="font-display text-4xl text-graphite dark:text-white uppercase tracking-tight">So'nggi Xabarlar</h2>
        <span className="text-xs font-mono uppercase tracking-widest text-graphite/50 dark:text-gray-500">Arxiv: 2024-2025</span>
      </div>

      <div className="space-y-12">
         {MOCK_NEWS_DATA.length > 0 ? (
           MOCK_NEWS_DATA.map((item) => (
            <div 
              key={item.id} 
              className="group flex flex-col md:flex-row gap-8 hover:bg-white dark:hover:bg-white/5 p-6 -mx-6 transition-all rounded-sm border border-transparent hover:border-graphite/5 dark:hover:border-white/10 cursor-pointer shadow-none hover:shadow-sm"
              onClick={() => navigate(`/news-detail/${item.id}`)}
            >
               <div className="md:w-32 flex-shrink-0">
                  <span className="text-sepia font-bold text-xs border-b border-sepia/30 pb-1">{item.date}</span>
               </div>
               <div className="flex-grow">
                  <span className="text-teal text-[9px] font-bold uppercase tracking-widest block mb-2">{item.category}</span>
                  <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-teal transition-colors dark:text-white leading-tight">{item.title}</h3>
                  <p className="font-serif text-graphite/70 dark:text-gray-300 leading-relaxed italic">{item.excerpt}</p>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-sepia mt-6 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                     Batafsil o'qish <span>&rarr;</span>
                  </button>
               </div>
            </div>
           ))
         ) : (
           <div className="space-y-12">
             {[1, 2, 3].map((i) => (
                <Skeleton key={i} type="news-item" />
             ))}
           </div>
         )}
      </div>
      
      <div className="mt-24 text-center">
         <Ornament type="divider" className="w-64 mx-auto mb-8 opacity-20" />
         <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-graphite/20">ME'MOR NEWS • 2025</p>
      </div>
    </div>
  );
};

export default News;
