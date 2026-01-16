
import React from 'react';
import { MOCK_EVENTS, MOCK_PROJECTS } from '../constants';
import { Ornament } from '../components/Ornament';
import { DisplayItem } from '../types';

interface ActionProps {
   onItemClick: (item: DisplayItem) => void;
}

const Action: React.FC<ActionProps> = ({ onItemClick }) => {
   return (
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">

         <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-graphite">Harakat</h2>
            <p className="font-serif italic text-graphite/60 dark:text-gray-400 max-w-2xl mx-auto">
               Nazariyadan amaliyotga. Bizning loyihalarimiz va kelajak rejalari.
            </p>
         </div>

         {/* Events Section */}
         <section className="mb-20 md:mb-24">
            <div className="flex items-center gap-4 mb-8">
               <Ornament type="corner" className="w-6 h-6 rotate-90" />
               <h3 className="font-display text-3xl text-teal">Tadbirlar</h3>
            </div>

            <div className="space-y-6">
               {MOCK_EVENTS.map(event => (
                  <div
                     key={event.id}
                     className="flex flex-col sm:flex-row bg-white dark:bg-white/5 border border-graphite/10 dark:border-white/10 p-6 md:p-8 items-start sm:items-center gap-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-teal/30"
                     onClick={() => onItemClick({
                        id: event.id,
                        title: event.title,
                        subtitle: `${event.date} | ${event.location}`,
                        description: event.description,
                        type: 'Tadbir'
                     })}
                  >
                     <div className="flex-shrink-0 flex flex-col items-center justify-center w-full sm:w-20 h-20 border border-sepia text-sepia bg-parchment dark:bg-white/10">
                        <span className="text-2xl font-bold font-display">{event.date.split(' ')[0]}</span>
                        <span className="text-xs uppercase">{event.date.split(' ')[1].slice(0, 3)}</span>
                     </div>
                     <div className="flex-grow">
                        <h4 className="font-display text-xl md:text-2xl mb-2 group-hover:text-teal">{event.title}</h4>
                        <p className="font-serif text-sm md:text-base text-graphite/70 dark:text-gray-300 mb-2">{event.description}</p>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-graphite/40 dark:text-gray-500">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                           {event.location}
                        </div>
                     </div>
                     <div className="flex-shrink-0 w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-6 py-2 bg-graphite text-white font-display text-sm hover:bg-teal transition-colors dark:bg-white/10 dark:hover:bg-teal">
                           Ro'yxatdan O'tish
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <Ornament type="divider" className="mb-20 md:mb-24" />

         {/* Projects Section */}
         <section>
            <div className="flex items-center gap-4 mb-8 justify-end">
               <h3 className="font-display text-3xl text-sepia-dark">Loyihalar</h3>
               <Ornament type="corner" className="w-6 h-6 -rotate-90" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               {MOCK_PROJECTS.map(project => (
                  <div
                     key={project.id}
                     className="group cursor-pointer"
                     onClick={() => onItemClick({
                        id: project.id,
                        title: project.title,
                        subtitle: `${project.status} | ${project.location}`,
                        description: project.description,
                        imageUrl: project.imageUrl,
                        type: 'Loyiha'
                     })}
                  >
                     <div className="relative h-56 md:h-64 overflow-hidden mb-4 border border-graphite/10 dark:border-white/10 p-2 bg-white dark:bg-white/5">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${project.status === 'Jarayonda' ? 'bg-teal' : 'bg-sepia'}`}>
                           {project.status}
                        </span>
                     </div>
                     <h4 className="font-display text-xl md:text-2xl mb-2 group-hover:text-teal transition-colors">{project.title}</h4>
                     <p className="font-serif text-sm md:text-base text-graphite/70 dark:text-gray-300 mb-4">{project.description}</p>
                     <div className="text-xs font-mono uppercase text-graphite/40 dark:text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-graphite/40 dark:bg-gray-500"></span>
                        {project.location}
                     </div>
                  </div>
               ))}
            </div>
         </section>

      </div>
   );
};

export default Action;
