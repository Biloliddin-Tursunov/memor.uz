import React from 'react';
import { projects } from '../data/localDb';

const Projects: React.FC = () => {
  // Faqat visible: true bo'lgan loyihalarni olamiz
  const visibleProjects = projects.filter(p => p.visible);

  return (
    <section id="projects" className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-sepia/20 pb-4">
          <div>
            <span className="text-sepia font-sans text-sm tracking-widest uppercase block mb-2">Portfolio</span>
            <h2 className="font-serif text-3xl md:text-4xl text-deep-teal">Tanlangan Loyihalar</h2>
          </div>
          <p className="text-graphite/60 font-sans text-sm mt-4 md:mt-0">
            Jami: {visibleProjects.length} ta loyiha
          </p>
        </div>

        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project) => (
              <a href="https://memor.uz" target="_blank" rel="noopener noreferrer" key={project.id} className="group cursor-pointer block">
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 mb-4 shadow-md border border-sepia/10">
                  <div className="absolute inset-0 bg-deep-teal/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  {/* Using p-12 for logo-like images to prevent full bleed, making it look cleaner */}
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="object-contain w-full h-full p-16 transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 bg-parchment px-3 py-1 z-20 shadow-sm border border-sepia/20">
                    <span className="text-xs font-serif text-deep-teal">{project.year}</span>
                  </div>
                </div>
                
                <div className="border-l-2 border-sepia pl-4 transition-all group-hover:border-deep-teal">
                  <span className="text-xs font-sans text-sepia uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-xl font-serif font-bold text-deep-teal mt-1 group-hover:text-sepia transition-colors">{project.title}</h3>
                  <p className="text-sm text-graphite/70 mt-2 line-clamp-2 font-sans">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-sepia/30 bg-white/50">
            <div className="w-16 h-16 mb-4 text-sepia opacity-50">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-deep-teal mb-2">Hozircha loyihalar yuklanmoqda...</h3>
            <p className="text-graphite/60 font-sans text-sm">Tez orada bu yerda yangi ishlar paydo bo'ladi.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;