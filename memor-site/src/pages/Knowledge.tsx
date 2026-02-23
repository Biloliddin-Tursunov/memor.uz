
import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';
import { Skeleton } from '../components/Skeleton';
import { HadithBlock } from '../components/HadithBlock';
import { Language } from '../types';
import { getLocalizedContent, stripHtml } from '../lib/content';
import SEO from '../components/SEO';

type Tab = 'books' | 'creators';

const Knowledge: React.FC = () => {
   const { lang, tab } = useParams<{ lang: string; tab: string }>();
   const navigate = useNavigate();
   const activeTab = (tab || 'books') as Tab;
   const currentLang = (lang || 'uz') as Language;

   const { books, creators, fetchBooks, fetchCreators, isLoading } = useStore();

   useEffect(() => {
      const validTabs = ['books', 'creators'];
      if (tab && !validTabs.includes(tab)) {
         navigate(`/${currentLang}/knowledge/books`, { replace: true });
      }

      // Fetch data based on active tab
      switch (activeTab) {
         case 'books': if (books.length === 0) fetchBooks(); break;
         case 'creators': if (creators.length === 0) fetchCreators(); break;
      }
   }, [tab, navigate, currentLang, activeTab, fetchBooks, fetchCreators, books.length, creators.length]);

   const renderContent = () => {
      const t = TRANSLATIONS[currentLang as Language] || TRANSLATIONS.uz;
      switch (activeTab) {
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
      { id: 'books', label: currentLang === 'uz' ? 'Kutubxona' : currentLang === 'ru' ? 'Библиотека' : currentLang === 'tr' ? 'Kütüphane' : 'Library' },
      { id: 'creators', label: currentLang === 'uz' ? 'Ustalar' : currentLang === 'ru' ? 'Мастера' : currentLang === 'tr' ? 'Ustalar' : 'Masters' }
   ];

   const getPageTitle = () => {
      switch (activeTab) {
         case 'books': return currentLang === 'uz' ? 'Kutubxona' : 'Library';
         case 'creators': return currentLang === 'uz' ? 'Ustalar' : 'Creators';
         default: return t.ilm;
      }
   };

   return (
      <div className="max-w-6xl mx-auto px-4 py-12">
         <SEO
            title={t.seoIlmTitle}
            description={t.seoIlmDesc}
            lang={currentLang}
         />
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
