import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';
import { Skeleton } from '../components/Skeleton';
import SEO from '../components/SEO';
import { getLocalizedContent } from '../lib/content';

const Creation: React.FC = () => {
   const { lang } = useParams<{ lang: string }>();
   const navigate = useNavigate();
   const language = (lang || 'uz') as keyof typeof TRANSLATIONS;
   const t = TRANSLATIONS[language];
   const { creations, fetchCreations, isLoading } = useStore();

   React.useEffect(() => {
      if (creations.length === 0) fetchCreations();
   }, [fetchCreations, creations.length]);

   return (
      <div className="max-w-7xl mx-auto px-4 py-12">
         <SEO
            title={t.seoIjodTitle}
            description={t.seoIjodDesc}
            lang={language}
         />
         <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-7xl mb-6 text-graphite dark:text-white uppercase tracking-tighter">
               {t.creationTitle}
            </h2>
            <p className="font-serif italic text-lg text-graphite/50 dark:text-gray-400 max-w-2xl mx-auto">
               {t.creationDesc}
            </p>
         </div>

         <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {creations.length > 0 ? (
               creations.map((item) => {
                  const { title, type } = getLocalizedContent(item, language);
                  return (
                     <div
                        key={item.id}
                        className="break-inside-avoid group cursor-pointer relative"
                        onClick={() => navigate(`/${language}/creation/${item.slug || item.id}`)}
                     >
                        <div className="bg-white dark:bg-white/5 p-4 shadow-sm group-hover:shadow-2xl transition-all duration-700 border border-graphite/5 dark:border-white/5 relative overflow-hidden">
                           {/* Decorative Corners */}
                           <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                           <div className="relative overflow-hidden mb-5 rounded-sm aspect-[4/5]">
                              <img
                                 src={item.imageUrl}
                                 alt={title}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                              />
                              <div className="absolute inset-0 bg-graphite/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                 <div className="flex flex-col items-center gap-4">
                                    <span className="text-white font-display uppercase tracking-[0.4em] text-[10px] border border-white/20 px-8 py-3 bg-white/5">
                                       {t.view}
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <div className="px-1">
                              <div className="flex items-center gap-3 mb-3">
                                 <span className="text-teal text-[8px] font-bold uppercase tracking-[0.4em]">{type}</span>
                                 <div className="h-px flex-1 bg-graphite/5 dark:bg-white/5" />
                              </div>

                              <h3 className="font-display text-xl mb-4 dark:text-white group-hover:text-teal transition-colors leading-tight">
                                 {title}
                              </h3>

                              <div className="flex justify-between items-center text-[10px] font-mono text-graphite/40 dark:text-white/30 uppercase tracking-[0.2em] pt-4 border-t border-graphite/5 dark:border-white/5">
                                 <span className="font-bold">{item.author}</span>
                                 <Ornament type="corner" className="w-3 h-3 opacity-20 group-hover:rotate-90 transition-transform duration-700" />
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })
            ) : !isLoading ? (
               <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
                  {[1, 2, 3].map(i => <Skeleton key={i} type="creation" />)}
               </div>
            )}
         </div>

         <div className="mt-32 text-center">
            <p className="font-serif italic text-xl text-graphite/40 mb-8">{t.quote}</p>
            <Ornament type="flourish" className="opacity-10" />
         </div>
      </div>
   );
};

export default Creation;
