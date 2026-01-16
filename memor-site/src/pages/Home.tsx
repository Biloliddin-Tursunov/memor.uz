
import React, { useState, useEffect } from 'react';
import { MOCK_ARTICLES, MOCK_EVENTS, MOCK_CREATIONS, MOCK_PROJECTS, MOCK_VIDEOS } from '../constants';
import { Ornament } from '../components/Ornament';
import { PageRoute } from '../types';

const Home: React.FC<{ onNavigate: (route: PageRoute) => void }> = ({ onNavigate }) => {
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      id: 'slide1',
      label: 'MAQOLA',
      title: MOCK_ARTICLES[0].title,
      desc: MOCK_ARTICLES[0].excerpt,
      image: MOCK_ARTICLES[0].imageUrl,
      route: PageRoute.KNOWLEDGE
    },
    {
      id: 'slide2',
      label: 'LOYIHA',
      title: MOCK_PROJECTS[0].title,
      desc: MOCK_PROJECTS[0].description,
      image: MOCK_PROJECTS[0].imageUrl,
      route: PageRoute.ACTION
    },
    {
      id: 'slide3',
      label: 'SAN\'AT',
      title: MOCK_CREATIONS[2].title,
      desc: MOCK_CREATIONS[2].description,
      image: MOCK_CREATIONS[2].imageUrl,
      route: PageRoute.CREATION
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      
      {/* Meta Info Line */}
      <div className="flex justify-between border-b border-graphite/20 pb-2 mb-6 md:mb-8 text-[10px] md:text-xs font-mono text-graphite/60 uppercase">
        <span>Vol. I, No. 1</span>
        <span className="hidden md:inline">Markaziy Osiyo arxitekturasi</span>
        <span>2025</span>
      </div>

      {/* Hero Carousel Section */}
      <section className="mb-12 md:mb-20 relative group">
        <div className="relative overflow-hidden border border-graphite/10 bg-white p-2 shadow-sm min-h-[60vh] md:min-h-[500px]">
           {/* Slide Content */}
           <div className="relative w-full h-[60vh] md:h-[500px]">
              <img 
                src={carouselItems[currentSlide].image} 
                alt={carouselItems[currentSlide].title} 
                className="w-full h-full object-cover sepia-[0.2] contrast-[1.1] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-transparent opacity-90 md:opacity-80"></div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/4 text-white">
                 <span className="inline-block px-3 py-1 mb-2 md:mb-4 border border-teal/50 text-teal-light text-[10px] md:text-xs font-bold uppercase tracking-widest bg-graphite/50 backdrop-blur-sm">
                    {carouselItems[currentSlide].label}
                 </span>
                 <h2 
                    className="font-display text-3xl md:text-6xl mb-2 md:mb-4 leading-tight cursor-pointer hover:text-teal transition-colors"
                    onClick={() => onNavigate(carouselItems[currentSlide].route)}
                 >
                    {carouselItems[currentSlide].title}
                 </h2>
                 <p className="font-serif text-sm md:text-xl text-white/90 md:text-white/80 border-l-2 md:border-l-4 border-teal pl-4 md:pl-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                    {carouselItems[currentSlide].desc}
                 </p>
              </div>
           </div>

           {/* Carousel Controls */}
           <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2">
              {carouselItems.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all border border-white/50 ${currentSlide === idx ? 'bg-teal scale-125' : 'bg-transparent hover:bg-white/30'}`}
                />
              ))}
           </div>
        </div>
      </section>

      <Ornament type="divider" className="mb-12 md:mb-16" />

      {/* ILM (Knowledge) Section */}
      <section className="mb-16 md:mb-20">
         <div className="flex flex-col md:flex-row items-center gap-4 mb-8 md:mb-10 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl uppercase tracking-widest text-graphite">Ilm Maskani</h3>
            <div className="hidden md:block h-px bg-graphite/20 flex-grow"></div>
            <button 
              onClick={() => onNavigate(PageRoute.KNOWLEDGE)}
              className="text-xs font-bold uppercase tracking-widest text-teal hover:text-teal-dark mt-2 md:mt-0"
            >
              Barchasini ko'rish &rarr;
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_ARTICLES.slice(0, 2).map((article) => (
              <div key={article.id} className="group cursor-pointer" onClick={() => onNavigate(PageRoute.KNOWLEDGE)}>
                 <div className="overflow-hidden border border-graphite/10 mb-4 h-48">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover sepia-[0.3] group-hover:scale-105 transition-transform duration-700" />
                 </div>
                 <h4 className="font-display text-xl mb-2 group-hover:text-teal transition-colors">{article.title}</h4>
                 <p className="font-serif text-sm text-graphite/70 line-clamp-3">{article.excerpt}</p>
              </div>
            ))}
             <div className="group cursor-pointer" onClick={() => onNavigate(PageRoute.KNOWLEDGE)}>
                 <div className="overflow-hidden border border-graphite/10 mb-4 h-48 relative">
                    <img src={MOCK_VIDEOS[0].thumbnailUrl} alt={MOCK_VIDEOS[0].title} className="w-full h-full object-cover sepia-[0.3] group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                       <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center pl-1">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-graphite border-b-[6px] border-b-transparent"></div>
                       </div>
                    </div>
                 </div>
                 <h4 className="font-display text-xl mb-2 group-hover:text-teal transition-colors">{MOCK_VIDEOS[0].title}</h4>
                 <p className="font-serif text-sm text-graphite/70">Video darslik • {MOCK_VIDEOS[0].duration}</p>
              </div>
         </div>
      </section>

      {/* HARAKAT (Action) Section */}
      <section className="mb-16 md:mb-20">
         <div className="flex flex-col md:flex-row items-center gap-4 mb-8 md:mb-10 text-center">
            <div className="hidden md:block h-px bg-graphite/20 flex-grow"></div>
            <h3 className="font-display text-2xl md:text-3xl uppercase tracking-widest text-teal">Harakat</h3>
            <div className="hidden md:block h-px bg-graphite/20 flex-grow"></div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Event Highlight */}
            <div className="bg-white border border-graphite/10 p-6 md:p-8 shadow-sm relative mt-4 md:mt-0">
                <div className="absolute -top-3 left-6 md:left-8 bg-teal text-white text-[10px] md:text-xs px-3 py-1 uppercase tracking-widest">
                  Yaqin Tadbir
                </div>
                <h4 className="font-display text-2xl md:text-3xl mb-4 mt-2">{MOCK_EVENTS[0].title}</h4>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-xs md:text-sm font-mono text-graphite/60 mb-6">
                   <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {MOCK_EVENTS[0].date}
                   </span>
                   <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {MOCK_EVENTS[0].location}
                   </span>
                </div>
                <p className="font-serif text-base md:text-lg text-graphite/80 mb-6">{MOCK_EVENTS[0].description}</p>
                <button 
                  onClick={() => onNavigate(PageRoute.ACTION)}
                  className="w-full py-3 border border-graphite/20 hover:bg-graphite hover:text-white transition-colors uppercase text-xs tracking-widest"
                >
                   Batafsil ma'lumot
                </button>
            </div>

            {/* Project Highlight */}
            <div className="relative group cursor-pointer" onClick={() => onNavigate(PageRoute.ACTION)}>
               <div className="absolute inset-0 bg-graphite/10 transform rotate-2 transition-transform group-hover:rotate-1"></div>
               <div className="relative bg-white border border-graphite/10 h-full p-1">
                  <div className="relative h-64 md:h-full overflow-hidden">
                     <img src={MOCK_PROJECTS[0].imageUrl} alt={MOCK_PROJECTS[0].title} className="w-full h-full object-cover sepia-[0.1]" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                        <span className="text-xs font-bold uppercase tracking-widest text-sepia mb-2">Loyiha</span>
                        <h4 className="font-display text-xl md:text-2xl">{MOCK_PROJECTS[0].title}</h4>
                        <p className="font-serif text-sm opacity-80 mt-2">{MOCK_PROJECTS[0].status} • {MOCK_PROJECTS[0].location}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* IJOD (Creation) Section */}
      <section>
         <div className="flex flex-col md:flex-row items-center gap-4 mb-8 md:mb-10 text-center md:text-left">
            <button 
              onClick={() => onNavigate(PageRoute.CREATION)}
              className="order-2 md:order-1 text-xs font-bold uppercase tracking-widest text-sepia-dark hover:text-sepia"
            >
              &larr; Barchasini ko'rish
            </button>
            <div className="hidden md:block h-px bg-graphite/20 flex-grow order-2"></div>
            <h3 className="font-display text-2xl md:text-3xl uppercase tracking-widest text-sepia-dark order-1 md:order-3">Ijod</h3>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {MOCK_CREATIONS.map((item, idx) => (
               <div 
                  key={item.id} 
                  className={`relative group cursor-pointer overflow-hidden ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
                  onClick={() => onNavigate(PageRoute.CREATION)}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover sepia-[0.2] group-hover:sepia-0 transition-all duration-700 transform group-hover:scale-105 min-h-[150px]" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                     <div>
                        <h4 className="font-display text-white text-lg md:text-xl mb-1">{item.title}</h4>
                        <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest">{item.type}</span>
                     </div>
                  </div>
               </div>
             ))}
              <div 
                  className="relative group cursor-pointer overflow-hidden bg-graphite/5 flex items-center justify-center min-h-[150px]"
                  onClick={() => onNavigate(PageRoute.CREATION)}
              >
                  <span className="text-sepia text-2xl md:text-4xl">&rarr;</span>
              </div>
         </div>
      </section>

      <div className="mt-16 md:mt-20 text-center">
        <Ornament />
      </div>

    </div>
  );
};

export default Home;
