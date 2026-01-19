
import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES, MOCK_VIDEOS, MOCK_BOOKS, MOCK_CREATORS } from '../constants';
import { Ornament } from '../components/Ornament';
import { Skeleton } from '../components/Skeleton';
import HadithBlock from '../components/HadithBlock';

type Tab = 'articles' | 'videos' | 'books' | 'creators';

const Knowledge: React.FC = () => {
   const { tab } = useParams<{ tab: string }>();
   const navigate = useNavigate();
   const activeTab = (tab || 'articles') as Tab;

   // Agar noto'g'ri tab kelsa, defaultga qaytarish
   useEffect(() => {
      const validTabs = ['articles', 'videos', 'books', 'creators'];
      if (tab && !validTabs.includes(tab)) {
         navigate('/knowledge/articles', { replace: true });
      }
   }, [tab, navigate]);

   const renderContent = () => {
      switch (activeTab) {
         case 'articles':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-500">
                  {MOCK_ARTICLES.map(article => (
                     <div key={article.id} className="bg-white dark:bg-white/5 p-8 border border-graphite/10 shadow-sm hover:shadow-md transition-all cursor-pointer group" onClick={() => navigate(`/article/${article.id}`)}>
                        <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{article.category}</span>
                        <h3 className="font-display text-3xl mb-4 dark:text-white group-hover:text-teal transition-colors">{article.title}</h3>
                        <p className="font-serif text-graphite/70 dark:text-gray-300 mb-6 italic">{article.excerpt}</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-sepia">Batafsil &rarr;</span>
                     </div>
                  ))}
               </div>
            );
         case 'videos':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
                  {MOCK_VIDEOS.map(video => (
                     <div key={video.id} className="group cursor-pointer" onClick={() => navigate(`/video/${video.id}`)}>
                        <div className="relative aspect-video mb-4 overflow-hidden rounded-sm bg-graphite/5">
                            <img src={video.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={video.title} />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                        </div>
                        <h3 className="font-display text-xl dark:text-white group-hover:text-teal transition-colors">{video.title}</h3>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-graphite/40 mt-1">{video.author}</p>
                     </div>
                  ))}
               </div>
            );
         case 'books':
            return (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in duration-500">
                  {MOCK_BOOKS.map(book => (
                     <div key={book.id} className="group cursor-pointer" onClick={() => navigate(`/book/${book.id}`)}>
                        <div className="aspect-[2/3] mb-4 bg-white dark:bg-white/5 border border-graphite/10 shadow-sm overflow-hidden p-1 group-hover:-translate-y-2 transition-transform duration-500">
                           <img src={book.coverUrl} className="w-full h-full object-cover" alt={book.title} />
                        </div>
                        <h4 className="font-display text-lg dark:text-white mb-1 group-hover:text-teal">{book.title}</h4>
                        <p className="text-[10px] font-mono text-graphite/40 uppercase">{book.author}</p>
                     </div>
                  ))}
               </div>
            );
         case 'creators':
            return (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-12 animate-in fade-in duration-500">
                  {MOCK_CREATORS.map(u => (
                     <div key={u.id} className="text-center group cursor-pointer" onClick={() => navigate(`/creator/${u.id}`)}>
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-graphite/10 mb-4 group-hover:border-teal transition-all p-1">
                           <img src={u.avatarUrl} className="w-full h-full object-cover rounded-full" alt={u.name} />
                        </div>
                        <h4 className="font-display text-xl dark:text-white mb-1">{u.name}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-sepia">{u.role}</p>
                     </div>
                  ))}
               </div>
            );
         default: return null;
      }
   }

   const tabs: { id: Tab; label: string }[] = [
      { id: 'articles', label: 'Maqolalar' },
      { id: 'videos', label: 'Videolar' },
      { id: 'books', label: 'Kutubxona' },
      { id: 'creators', label: 'Ustalar' }
   ];

   return (
      <div className="max-w-6xl mx-auto px-4 py-12">
         <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl mb-12 dark:text-white">Ilm Maskani</h2>
            
            {/* Hadith as the spiritual subtitle/foundation */}
            <HadithBlock className="max-w-4xl mx-auto" />
         </div>

         <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20 border-b border-graphite/5 pb-4">
            {tabs.map((t) => (
               <Link 
                  key={t.id} 
                  to={`/knowledge/${t.id}`}
                  className={`text-[10px] font-bold uppercase tracking-[0.4em] pb-3 transition-all relative ${activeTab === t.id ? 'text-teal' : 'text-graphite/30 dark:text-gray-500 hover:text-graphite'}`}
               >
                  {t.label}
                  {activeTab === t.id && (
                     <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-teal animate-in slide-in-from-left duration-300"></span>
                  )}
               </Link>
            ))}
         </div>

         <div className="min-h-[400px]">
            {renderContent()}
         </div>
      </div>
   );
};

export default Knowledge;
