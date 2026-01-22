
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_EVENTS, MOCK_PROJECTS } from '../constants';
import { Ornament } from '../components/Ornament';
import { Skeleton } from '../components/Skeleton';

const Action: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-20">
         <h2 className="font-display text-5xl md:text-7xl mb-6 text-graphite dark:text-white">Harakat</h2>
         <p className="font-serif italic text-lg text-graphite/50 dark:text-gray-400 max-w-2xl mx-auto">
           Nazariyadan amaliyotga. Bizning loyihalarimiz va kelajak rejalari.
         </p>
      </div>

      <section className="mb-32">
         <div className="flex items-center gap-4 mb-12">
            <h3 className="font-display text-3xl text-teal dark:text-teal-light uppercase tracking-tight">Tadbirlar</h3>
            <div className="h-px flex-grow bg-teal/10"></div>
         </div>

         <div className="space-y-8">
            {MOCK_EVENTS.length > 0 ? (
              MOCK_EVENTS.map(event => (
               <div key={event.id} className="flex flex-col sm:flex-row bg-white dark:bg-white/5 border border-graphite/5 p-8 items-center gap-10 shadow-sm hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate(`/event/${event.id}`)}>
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 border border-sepia/20 text-sepia bg-parchment dark:bg-white/5">
                     <span className="text-3xl font-bold font-display">{event.date.split(' ')[0]}</span>
                     <span className="text-[10px] uppercase tracking-widest">{event.date.split(' ')[1]?.slice(0,3)}</span>
                  </div>
                  <div className="flex-grow">
                     <h4 className="font-display text-2xl mb-2 dark:text-white group-hover:text-teal transition-colors">{event.title}</h4>
                     <p className="font-serif text-graphite/60 dark:text-gray-300 italic mb-4 line-clamp-2">{event.description}</p>
                     <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-graphite/30">
                        {event.location}
                     </div>
                  </div>
                  <button className="px-8 py-3 bg-graphite text-white font-display text-[10px] uppercase tracking-widest hover:bg-teal transition-all">
                     Ishtirok etish
                  </button>
               </div>
              ))
            ) : [1, 2, 3].map(i => <Skeleton key={i} type="event-item" className="p-8" />)}
         </div>
      </section>

      <section>
         <div className="flex items-center gap-4 mb-12">
            <h3 className="font-display text-3xl text-sepia uppercase tracking-tight">Loyihalar</h3>
            <div className="h-px flex-grow bg-sepia/10"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {MOCK_PROJECTS.length > 0 ? (
              MOCK_PROJECTS.map(project => (
               <div 
                key={project.id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/project/${project.id}`)}
               >
                  <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-graphite/5 border border-graphite/5 p-2">
                     <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                     <div className="absolute top-4 left-4 px-3 py-1 bg-teal text-white text-[9px] font-bold uppercase tracking-widest">
                        {project.status}
                     </div>
                  </div>
                  <h4 className="font-display text-3xl mb-3 dark:text-white group-hover:text-teal transition-colors">{project.title}</h4>
                  <p className="font-serif text-graphite/60 dark:text-gray-300 leading-relaxed mb-6">{project.description}</p>
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-graphite/30">
                     <span className="w-4 h-[1px] bg-sepia"></span>
                     {project.location}
                  </div>
               </div>
              ))
            ) : [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-96" />)}
         </div>
      </section>
    </div>
  );
};

export default Action;
