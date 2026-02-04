
import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';
import { Skeleton } from '../components/Skeleton';
import { HadithBlock } from '../components/HadithBlock';
import { Language } from '../types';
import { getLocalizedContent } from '../lib/content';

type Tab = 'articles' | 'videos' | 'books' | 'creators';

const Knowledge: React.FC = () => {
   const { lang, tab } = useParams<{ lang: string; tab: string }>();
   const navigate = useNavigate();
   const activeTab = (tab || 'articles') as Tab;
   const currentLang = (lang || 'uz') as Language;

   const { articles, videos, books, creators, fetchArticles, fetchVideos, fetchBooks, fetchCreators, isLoading } = useStore();

   useEffect(() => {
      const validTabs = ['articles', 'videos', 'books', 'creators'];
      if (tab && !validTabs.includes(tab)) {
         navigate(`/${currentLang}/knowledge/articles`, { replace: true });
      }

      // Fetch data based on active tab if not already loaded or always fetch if you want fresh data
      switch (activeTab) {
         case 'articles': if (articles.length === 0) fetchArticles(); break;
         case 'videos': if (videos.length === 0) fetchVideos(); break;
         case 'books': if (books.length === 0) fetchBooks(); break;
         case 'creators': if (creators.length === 0) fetchCreators(); break;
      }
   }, [tab, navigate, currentLang, activeTab, fetchArticles, fetchVideos, fetchBooks, fetchCreators, articles.length, videos.length, books.length, creators.length]);

   const renderContent = () => {
      const t = TRANSLATIONS[currentLang as Language] || TRANSLATIONS.uz;
      switch (activeTab) {
         case 'articles':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-500">
                  {articles.length > 0 ? articles.map(article => {
                     const { title, description } = getLocalizedContent(article, currentLang);
                     return (
                        <div key={article.id} className="bg-white dark:bg-white/5 p-0 border border-graphite/10 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full" onClick={() => navigate(`/${currentLang}/article/${article.slug}`)}>
                           {article.imageUrl && (
                              <div className="w-full aspect-video overflow-hidden border-b border-graphite/5">
                                 <img src={article.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              </div>
                           )}
                           <div className="p-8 flex-1 flex flex-col">
                              <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{article.category}</span>
                              <h3 className="font-display text-3xl mb-4 dark:text-white group-hover:text-teal transition-colors leading-tight">{title}</h3>
                              <p className="font-serif text-graphite/70 dark:text-gray-300 mb-6 italic line-clamp-3">{description}</p>
                              <div className="mt-auto pt-4 flex justify-between items-center border-t border-graphite/5">
                                 <span className="text-[10px] font-mono text-graphite/40 uppercase tracking-wider">{article.date}</span>
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-sepia group-hover:translate-x-1 transition-transform">{t.readMore} &rarr;</span>
                              </div>
                           </div>
                        </div>
                     );
                  }) : !isLoading ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-64" />)}
               </div>
            );
         case 'videos':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
                  {videos.length > 0 ? videos.map(video => {
                     const { title } = getLocalizedContent(video, currentLang);
                     return (
                        <div key={video.id} className="group cursor-pointer" onClick={() => navigate(`/${currentLang}/video/${video.id}`)}>
                           <div className="relative aspect-video mb-4 overflow-hidden rounded-sm bg-graphite/5">
                              <img src={video.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={title} />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                           </div>
                           <h3 className="font-display text-xl dark:text-white group-hover:text-teal transition-colors">{title}</h3>
                           <p className="text-[10px] font-mono uppercase tracking-widest text-graphite/40 mt-1">{video.author}</p>
                        </div>
                     );
                  }) : !isLoading ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="aspect-video" />)}
               </div>
            );
         case 'books':
            return (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in duration-500">
                  {books.length > 0 ? books.map(book => {
                     const { title } = getLocalizedContent(book, currentLang);
                     return (
                        <div key={book.id} className="group cursor-pointer" onClick={() => navigate(`/${currentLang}/book/${book.id}`)}>
                           <div className="aspect-[2/3] mb-4 bg-white dark:bg-white/5 border border-graphite/10 shadow-sm overflow-hidden p-1 group-hover:-translate-y-2 transition-transform duration-500">
                              <img src={book.coverUrl} className="w-full h-full object-cover" alt={title} />
                           </div>
                           <h4 className="font-display text-lg dark:text-white mb-1 group-hover:text-teal">{title}</h4>
                           <p className="text-[10px] font-mono text-graphite/40 uppercase">{book.author}</p>
                        </div>
                     );
                  }) : !isLoading ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} className="aspect-[2/3]" />)}
               </div>
            );
         case 'creators':
            return (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-12 animate-in fade-in duration-500">
                  {creators.length > 0 ? creators.map(u => {
                     const { role } = getLocalizedContent(u, currentLang);
                     return (
                        <div key={u.id} className="text-center group cursor-pointer" onClick={() => navigate(`/${currentLang}/creator/${u.id}`)}>
                           <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-graphite/10 mb-4 group-hover:border-teal transition-all p-1">
                              <img src={u.avatarUrl} className="w-full h-full object-cover rounded-full" alt={u.name} />
                           </div>
                           <h4 className="font-display text-xl dark:text-white mb-1">{u.name}</h4>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-sepia">{role}</p>
                        </div>
                     );
                  }) : !isLoading ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3, 4].map(i => (
                     <div key={i} className="flex flex-col items-center">
                        <Skeleton className="w-32 h-32 mb-4" type="circle" />
                        <Skeleton className="h-6 w-3/4 mb-2" type="text" />
                     </div>
                  ))}
               </div>
            );
         default: return null;
      }
   }

   const t = TRANSLATIONS[currentLang as Language] || TRANSLATIONS.uz;
   const tabs: { id: Tab; label: string }[] = [
      { id: 'articles', label: currentLang === 'uz' ? 'Maqolalar' : currentLang === 'ru' ? 'Статьи' : currentLang === 'tr' ? 'Makaleler' : 'Articles' },
      { id: 'videos', label: currentLang === 'uz' ? 'Videolar' : currentLang === 'ru' ? 'Видео' : currentLang === 'tr' ? 'Videolar' : 'Videos' },
      { id: 'books', label: currentLang === 'uz' ? 'Kutubxona' : currentLang === 'ru' ? 'Библиотека' : currentLang === 'tr' ? 'Kütüphane' : 'Library' },
      { id: 'creators', label: currentLang === 'uz' ? 'Ustalar' : currentLang === 'ru' ? 'Мастера' : currentLang === 'tr' ? 'Ustalar' : 'Masters' }
   ];

   return (
      <div className="max-w-6xl mx-auto px-4 py-12">
         <div className="text-center mb-16 px-4">
            <h2 className="font-display text-5xl md:text-7xl mb-8 dark:text-white">{currentLang === 'uz' ? 'Ilm Maskani' : currentLang === 'ru' ? 'Обитель Знаний' : currentLang === 'tr' ? 'İlim Köşkü' : 'House of Knowledge'}</h2>
            <div className="max-w-2xl mx-auto">
               <HadithBlock language={currentLang} variant="compact" />
            </div>
         </div>

         <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20 border-b border-graphite/5 pb-4">
            {tabs.map((t) => (
               <Link
                  key={t.id}
                  to={`/${currentLang}/knowledge/${t.id}`}
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
