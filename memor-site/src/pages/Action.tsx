import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';
import { Skeleton } from '../components/Skeleton';
import { getLocalizedContent, stripHtml } from '../lib/content';
import { Language } from '../types';
import SEO from '../components/SEO';

type Tab = 'projects' | 'events' | 'articles' | 'videos';

interface ActionProps {
   onItemClick: (item: any) => void;
}

const Action: React.FC<ActionProps> = ({ onItemClick }) => {
   const { lang, tab } = useParams<{ lang: string; tab: string }>();
   const navigate = useNavigate();
   const language = (lang || 'uz') as Language;
   const activeTab = (tab || 'articles') as Tab;
   const t = TRANSLATIONS[language] || TRANSLATIONS.uz;

   const {
      projects, events, articles, videos,
      fetchProjects, fetchEvents, fetchArticles, fetchVideos,
      projectsLoading, eventsLoading, articlesLoading, videosLoading
   } = useStore();

   useEffect(() => {
      const validTabs = ['projects', 'events', 'articles', 'videos'];
      if (tab && !validTabs.includes(tab)) {
         navigate(`/${language}/action/projects`, { replace: true });
      }

      switch (activeTab) {
         case 'projects': if (projects.length === 0) fetchProjects(); break;
         case 'events': if (events.length === 0) fetchEvents(); break;
         case 'articles': if (articles.length === 0) fetchArticles(); break;
         case 'videos': if (videos.length === 0) fetchVideos(); break;
      }
   }, [tab, navigate, language, activeTab, fetchProjects, fetchEvents, fetchArticles, fetchVideos, projects.length, events.length, articles.length, videos.length]);

   const tabs: { id: Tab; label: string }[] = [
      { id: 'articles', label: language === 'uz' ? 'Blog' : language === 'ru' ? 'Блог' : language === 'tr' ? 'Blog' : 'Blog' },
      { id: 'videos', label: language === 'uz' ? 'Videolar' : language === 'ru' ? 'Видео' : language === 'tr' ? 'Videolar' : 'Videos' },
      { id: 'projects', label: t.projects },
      { id: 'events', label: t.events }
   ];

   const renderContent = () => {
      switch (activeTab) {
         case 'projects':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.length > 0 ? projects.map((project) => {
                     const { title } = getLocalizedContent(project, language);
                     return (
                        <div
                           key={project.id}
                           onClick={() => onItemClick({ ...project, type: 'project' })}
                           className="group flex flex-col bg-white dark:bg-white/5 border border-graphite/5 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                        >
                           <div className="aspect-[4/3] overflow-hidden">
                              <img src={project.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                           </div>
                           <div className="p-6">
                              <span className="text-teal text-[9px] font-bold uppercase tracking-[0.3em] mb-2 block">{project.status}</span>
                              <h4 className="font-display text-xl mb-4 dark:text-white group-hover:text-teal transition-colors">{title}</h4>
                              <div className="flex justify-between items-center mt-auto">
                                 <span className="text-[10px] font-mono text-graphite/40 uppercase tracking-widest">{project.location_uz}</span>
                                 <Ornament type="corner" className="w-4 h-4 opacity-10" />
                              </div>
                           </div>
                        </div>
                     );
                  }) : !(projectsLoading || eventsLoading || articlesLoading || videosLoading) ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3].map(i => <Skeleton key={i} className="h-[400px]" />)}
               </div>
            );
         case 'events':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {events.length > 0 ? events.map((event) => {
                     const { title, description } = getLocalizedContent(event, language);
                     return (
                        <div
                           key={event.id}
                           onClick={() => onItemClick({ ...event, type: 'event' })}
                           className="group p-8 border border-graphite/5 bg-white dark:bg-white/5 hover:border-sepia/30 transition-all cursor-pointer relative overflow-hidden"
                        >
                           <div className="flex gap-8">
                              <div className="flex flex-col items-center justify-center p-6 bg-graphite/5 dark:bg-white/5 min-w-[100px]">
                                 <span className="font-display text-3xl text-sepia">{event.date.split(' ')[0]}</span>
                                 <span className="text-xs uppercase tracking-widest text-graphite/40">{event.date.split(' ').slice(1).join(' ')}</span>
                              </div>
                              <div>
                                 <h4 className="font-display text-2xl mb-3 dark:text-white group-hover:text-teal transition-colors">{title}</h4>
                                 <p className="text-sm text-graphite/50 dark:text-white/40 font-serif line-clamp-2 italic mb-4">{description}</p>
                                 <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-teal font-bold transition-all group-hover:gap-4">
                                    {t.participate} <span>&rarr;</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  }) : !(projectsLoading || eventsLoading || articlesLoading || videosLoading) ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-40" />)}
               </div>
            );
         case 'articles':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {articles.length > 0 ? articles.map(article => {
                     const { title, description } = getLocalizedContent(article, language);
                     return (
                        <div key={article.id} className="bg-white dark:bg-white/5 p-0 border border-graphite/10 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full" onClick={() => navigate(`/${language}/article/${article.slug}`)}>
                           {article.imageUrl && (
                              <div className="w-full aspect-video overflow-hidden border-b border-graphite/5">
                                 <img src={article.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              </div>
                           )}
                           <div className="p-8 flex-1 flex flex-col">
                              <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{article.category}</span>
                              <h3 className="font-display text-3xl mb-4 dark:text-white group-hover:text-teal transition-colors leading-tight">{title}</h3>
                              <p className="font-serif text-graphite/70 dark:text-gray-300 mb-6 italic line-clamp-3">{stripHtml(description)}</p>
                              <div className="mt-auto pt-4 flex justify-between items-center border-t border-graphite/5">
                                 <span className="text-[10px] font-mono text-graphite/40 uppercase tracking-wider">{article.date}</span>
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-sepia group-hover:translate-x-1 transition-transform">{t.readMore} &rarr;</span>
                              </div>
                           </div>
                        </div>
                     );
                  }) : !(projectsLoading || eventsLoading || articlesLoading || videosLoading) ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-64" />)}
               </div>
            );
         case 'videos':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {videos.length > 0 ? videos.map(video => {
                     const { title } = getLocalizedContent(video, language);
                     return (
                        <div key={video.id} className="group cursor-pointer" onClick={() => navigate(`/${language}/video/${video.slug || video.id}`)}>
                           <div className="relative aspect-video mb-4 overflow-hidden rounded-sm bg-graphite/5">
                              <img src={video.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={title} />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                           </div>
                           <h3 className="font-display text-xl dark:text-white group-hover:text-teal transition-colors">{title}</h3>
                           <p className="text-[10px] font-mono uppercase tracking-widest text-graphite/40 mt-1">{video.author}</p>
                        </div>
                     );
                  }) : !(projectsLoading || eventsLoading || articlesLoading || videosLoading) ? (
                     <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
                  ) : [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="aspect-video" />)}
               </div>
            );
         default: return null;
      }
   };

   return (
      <div className="max-w-7xl mx-auto px-4 py-12">
         <SEO
            title={t.seoHarakatTitle}
            description={t.seoHarakatDesc}
            lang={language}
         />
         <div className="text-center mb-16 px-4 pt-12 md:pt-16">
            <h2 className="font-display text-5xl md:text-7xl mb-8 dark:text-white uppercase tracking-tighter">
               {t.actionTitle}
            </h2>
            <p className="font-serif italic text-lg text-graphite/50 dark:text-gray-400 max-w-2xl mx-auto">
               {t.actionDesc}
            </p>
         </div>

         <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20 border-b border-graphite/5 pb-4">
            {tabs.map((tabItem) => (
               <Link
                  key={tabItem.id}
                  to={`/${language}/action/${tabItem.id}`}
                  className={`text-[10px] font-bold uppercase tracking-[0.4em] pb-3 transition-all relative ${activeTab === tabItem.id ? 'text-teal' : 'text-graphite/30 dark:text-gray-500 hover:text-graphite'}`}
               >
                  {tabItem.label}
                  {activeTab === tabItem.id && (
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

export default Action;
