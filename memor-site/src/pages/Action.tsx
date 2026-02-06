import React from 'react';
import { useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';
import { getLocalizedContent } from '../lib/content';
import SEO from '../components/SEO';

interface ActionProps {
   onItemClick: (item: any) => void;
}

const Action: React.FC<ActionProps> = ({ onItemClick }) => {
   const { lang } = useParams<{ lang: string }>();
   const language = (lang || 'uz') as keyof typeof TRANSLATIONS;
   const t = TRANSLATIONS[language];
   const { projects, events, fetchProjects, fetchEvents, isLoading } = useStore();

   React.useEffect(() => {
      if (projects.length === 0) fetchProjects();
      if (events.length === 0) fetchEvents();
   }, [fetchProjects, fetchEvents, projects.length, events.length]);

   return (
      <div className="max-w-7xl mx-auto px-4 py-12">
         <SEO
            title={t.seoHarakatTitle}
            description={t.seoHarakatDesc}
            lang={language}
         />
         <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-7xl mb-6 text-graphite dark:text-white uppercase tracking-tighter">
               {t.actionTitle}
            </h2>
            <p className="font-serif italic text-lg text-graphite/50 dark:text-gray-400 max-w-2xl mx-auto">
               {t.actionDesc}
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            {/* Events Section */}
            <div>
               <div className="flex items-center gap-4 mb-10">
                  <h3 className="font-display text-3xl dark:text-white uppercase tracking-widest">{t.events}</h3>
                  <div className="h-px flex-grow bg-graphite/10 dark:bg-white/10"></div>
               </div>

               <div className="space-y-6">
                  {events.map((event) => {
                     const { title, description } = getLocalizedContent(event, language);
                     return (
                        <div
                           key={event.id}
                           onClick={() => onItemClick({ ...event, type: 'event' })}
                           className="group p-6 border border-graphite/5 bg-white dark:bg-white/5 hover:border-sepia/30 transition-all cursor-pointer relative overflow-hidden"
                        >
                           <div className="flex gap-6">
                              <div className="flex flex-col items-center justify-center p-4 bg-graphite/5 dark:bg-white/5 min-w-[80px]">
                                 <span className="font-display text-2xl text-sepia">{event.date.split(' ')[0]}</span>
                                 <span className="text-[10px] uppercase tracking-widest text-graphite/40">{event.date.split(' ').slice(1).join(' ')}</span>
                              </div>
                              <div>
                                 <h4 className="font-display text-xl mb-2 dark:text-white group-hover:text-teal transition-colors">{title}</h4>
                                 <p className="text-xs text-graphite/50 dark:text-white/40 font-serif line-clamp-2 italic">{description}</p>
                                 <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-teal font-bold transition-all group-hover:gap-4">
                                    {t.participate} <span>&rarr;</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* Projects Section */}
            <div>
               <div className="flex items-center gap-4 mb-10">
                  <h3 className="font-display text-3xl dark:text-white uppercase tracking-widest">{t.projects}</h3>
                  <div className="h-px flex-grow bg-graphite/10 dark:bg-white/10"></div>
               </div>

               <div className="grid grid-cols-1 gap-8">
                  {projects.map((project) => {
                     const { title, description } = getLocalizedContent(project, language);
                     return (
                        <div
                           key={project.id}
                           onClick={() => onItemClick({ ...project, type: 'project' })}
                           className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-white/5 p-4 border border-graphite/5 hover:shadow-xl transition-all cursor-pointer"
                        >
                           <div className="md:w-1/3 aspect-video overflow-hidden">
                              <img src={project.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                           </div>
                           <div className="md:w-2/3 flex flex-col justify-center">
                              <span className="text-teal text-[9px] font-bold uppercase tracking-[0.3em] mb-2">{project.status}</span>
                              <h4 className="font-display text-xl mb-2 dark:text-white group-hover:text-teal transition-colors">{title}</h4>
                              <Ornament type="corner" className="w-4 h-4 opacity-10 self-end" />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Action;
