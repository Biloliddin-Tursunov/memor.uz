
import React, { useState, useEffect } from 'react';
import { MOCK_ARTICLES, MOCK_EVENTS, MOCK_CREATIONS, MOCK_PROJECTS, MOCK_BOOKS, MOCK_VIDEOS } from '../constants';
import { Ornament } from '../components/Ornament';
import { PageRoute, DisplayItem } from '../types';
import TeamSection from '../components/TeamSection';

interface HomeProps {
  onNavigate: (route: PageRoute) => void;
  onItemClick: (item: DisplayItem) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onItemClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      type: 'LOYIHA',
      id: 'MEM-PRJ-01',
      title: MOCK_PROJECTS[0].title,
      desc: MOCK_PROJECTS[0].description,
      image: MOCK_PROJECTS[0].imageUrl,
      tag: 'YANGI',
      status: 'JARAYONDA',
      route: PageRoute.ACTION,
      data: MOCK_PROJECTS[0]
    },
    {
      type: 'MAQOLA',
      id: 'MEM-KNL-42',
      title: MOCK_ARTICLES[0].title,
      desc: MOCK_ARTICLES[0].excerpt,
      image: MOCK_ARTICLES[0].imageUrl,
      tag: 'ILM',
      status: 'O\'QISH',
      route: PageRoute.KNOWLEDGE,
      data: MOCK_ARTICLES[0]
    },
    {
      type: 'VIDEO',
      id: 'MEM-VID-09',
      title: MOCK_VIDEOS[0].title,
      desc: "Muqarnaslar geometriyasi va ularning tarixiy qurilish sirlari bo'yicha darslik.",
      image: MOCK_VIDEOS[0].thumbnailUrl,
      tag: 'DARSLIK',
      status: 'VIDEO',
      route: PageRoute.KNOWLEDGE,
      data: MOCK_VIDEOS[0]
    },
    {
      type: 'TADBIR',
      id: 'MEM-EVT-77',
      title: MOCK_EVENTS[0].title,
      desc: "Xalqaro me'morlar va tarixchilarning eng yirik yig'ilishi Samarqandda.",
      image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&q=80&w=1200',
      tag: 'JONLI',
      status: 'TADBIR',
      route: PageRoute.ACTION,
      data: MOCK_EVENTS[0]
    },
    {
      type: 'IJOD',
      id: 'MEM-CRT-15',
      title: MOCK_CREATIONS[2].title,
      desc: MOCK_CREATIONS[2].description,
      image: MOCK_CREATIONS[2].imageUrl,
      tag: 'SAN\'AT',
      status: 'GALEREYA',
      route: PageRoute.CREATION,
      data: MOCK_CREATIONS[2]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <div className="w-full overflow-hidden">
      
      {/* RICH SPACE THEME HERO SECTION - Starts at Y=0 now */}
      <section className="relative min-h-screen cosmic-bg text-white flex items-center pt-[140px] md:pt-[100px] pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
            <div className="nebula opacity-70"></div>
            <div className="absolute inset-0 stars-overlay opacity-40"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-blue-900/10 blur-[180px]"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-teal-900/5 blur-[150px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-6 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 text-[9px] md:text-[10px] font-bold tracking-[0.3em] rounded-full text-white backdrop-blur-md border border-white/20 ${activeSlide === 3 ? 'bg-red-600/40 border-red-500/50' : 'bg-white/5 shadow-xl'}`}>
                            {current.tag}
                        </span>
                        <div className="h-px w-8 md:w-12 bg-white/20"></div>
                        <span className="text-[9px] md:text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase">{current.id}</span>
                    </div>

                    <div className="relative">
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-4 transition-all duration-700">
                            {current.title}
                        </h1>
                        <div className="absolute -left-6 top-2 bottom-2 w-[1px] bg-gradient-to-b from-sepia via-sepia/20 to-transparent"></div>
                    </div>

                    <p className="font-serif text-base md:text-xl text-white/60 max-w-lg leading-relaxed italic border-l border-white/10 pl-6">
                        {current.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 pt-4">
                        <button 
                            onClick={() => onItemClick({ ...current.data, type: current.type } as any)}
                            className="group relative flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white border border-white/20 px-8 py-5 overflow-hidden transition-all duration-500 hover:border-sepia hover:shadow-[0_0_50px_rgba(176,137,104,0.3)] bg-white/5 backdrop-blur-sm"
                        >
                            <span className="relative z-10 uppercase">{current.status === 'VIDEO' ? 'TOMOSHA QILISH' : 'BATAFSIL'}</span>
                            <span className="relative z-10 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-sepia group-hover:text-white transition-all transform group-hover:translate-x-2">
                                &rarr;
                            </span>
                            <div className="absolute inset-0 bg-sepia/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </button>
                        
                        <div className="flex gap-4">
                            {slides.map((_, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveSlide(idx)}
                                    className={`h-[4px] rounded-full transition-all duration-1000 ${activeSlide === idx ? 'bg-sepia w-12 shadow-[0_0_15px_#B08968]' : 'bg-white/20 w-4 hover:bg-white/60'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6 relative group animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                    <div className="absolute -top-6 -left-6 w-16 h-16 border-t border-l border-sepia/40 pointer-events-none"></div>
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b border-r border-sepia/40 pointer-events-none"></div>
                    <div className="relative p-1.5 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
                        <div className="aspect-[16/10] relative overflow-hidden bg-black rounded-xl">
                            <img 
                                key={activeSlide}
                                src={current.image} 
                                alt={current.title} 
                                className="w-full h-full object-cover transition-all duration-[10s] filter brightness-[0.7] group-hover:scale-105 group-hover:brightness-[0.9] animate-in fade-in duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION I: ILM (Deep Obsidian / Deep Night) */}
      <section className="py-24 md:py-32 bg-graphite/[0.02] dark:bg-[#020617] relative border-t border-graphite/5 dark:border-white/5 transition-colors overflow-hidden">
        {/* Subtle dark mode glow */}
        <div className="absolute inset-0 hidden dark:block pointer-events-none opacity-20">
            <div className="absolute top-1/4 right-1/4 w-[50%] h-[50%] bg-blue-900/30 blur-[150px] rounded-full"></div>
            <div className="absolute inset-0 stars-overlay opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                <div className="lg:col-span-7 relative">
                    <div className="absolute -top-10 -left-10 font-display text-[10rem] md:text-[15rem] text-graphite/[0.03] dark:text-white/[0.01] select-none leading-none">I</div>
                    
                    <div 
                        className="relative bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 md:p-12 shadow-sm border border-graphite/5 dark:border-white/10 transform -rotate-1 hover:rotate-0 transition-transform duration-700 cursor-pointer group"
                        onClick={() => onItemClick({ ...MOCK_ARTICLES[0], type: 'Maqola' })}
                    >
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <span className="text-sepia text-lg">✦</span>
                            <h3 className="font-display text-2xl md:text-4xl text-graphite dark:text-white uppercase tracking-wider">Ilm Maskani</h3>
                        </div>
                        <div className="relative mb-6 md:mb-8 overflow-hidden bg-graphite/5 dark:bg-black/40">
                            <img src={MOCK_ARTICLES[0].imageUrl} className="w-full h-[250px] md:h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        </div>
                        <h4 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-teal transition-colors dark:text-white">{MOCK_ARTICLES[0].title}</h4>
                        <p className="font-serif text-base md:text-lg text-graphite/60 dark:text-slate-300 mb-6 md:mb-8 leading-relaxed italic border-l-2 border-sepia pl-4 md:pl-6">
                            {MOCK_ARTICLES[0].excerpt}
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-8 md:space-y-12 lg:pt-20">
                    <div className="mb-8 md:mb-12">
                        <p className="font-serif italic text-lg md:text-xl text-graphite/60 dark:text-slate-300 leading-relaxed">
                            "Ilm — qorong'u zulmatda chiroq, yo'lda esa rahbaridir. O'tmish me'morlarining donoligi bugun bizning qo'limizda."
                        </p>
                    </div>
                    <div className="space-y-8 md:space-y-10">
                        {MOCK_BOOKS.slice(0, 2).map((book, idx) => (
                            <div 
                                key={book.id} 
                                className={`flex gap-4 md:gap-6 group cursor-pointer transition-all hover:pl-4 border-l border-transparent hover:border-sepia ${idx === 1 ? 'lg:ml-8' : ''}`}
                                onClick={() => onItemClick({ ...book, type: 'Kitob' })}
                            >
                                <div className="w-20 h-28 md:w-24 md:h-32 flex-shrink-0 bg-graphite/5 dark:bg-slate-800 overflow-hidden shadow-sm rounded-sm">
                                    <img src={book.coverUrl} className="w-full h-full object-cover filter sepia-[0.3]" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-sepia mb-1">Kutubxona</span>
                                    <h5 className="font-display text-lg md:text-xl mb-1 group-hover:text-teal transition-colors dark:text-white">{book.title}</h5>
                                    <p className="text-[11px] md:text-xs font-serif text-graphite/50 italic dark:text-slate-400">{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => onNavigate(PageRoute.KNOWLEDGE)}
                        className="w-full py-4 md:py-5 border-y border-graphite/10 dark:border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-graphite hover:text-white dark:hover:bg-slate-700/50 dark:hover:text-white transition-all dark:text-white"
                    >
                        Arxivni To'liq Ko'rish
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION II: HARAKAT (Midnight Slate / Slightly Lighter Navy) */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#0F172A] relative overflow-hidden transition-colors border-t dark:border-white/5">
        <div className="absolute inset-0 hidden dark:block pointer-events-none opacity-10">
            <div className="absolute bottom-0 left-0 w-full h-full bg-teal-900/20 blur-[150px] rounded-full"></div>
            <div className="absolute inset-0 stars-overlay opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2">
                    <div className="inline-block px-3 py-1 bg-teal/10 text-teal text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-6">II. Harakat Rejasi</div>
                    <h3 className="font-display text-3xl md:text-5xl text-graphite dark:text-white mb-8 md:mb-10 leading-tight">Amaliyot — <br/><span className="italic text-teal">hayotning o'zi.</span></h3>
                    
                    <div className="space-y-0 relative">
                        <div className="absolute left-[34px] md:left-[39px] top-0 bottom-0 w-px bg-graphite/10 dark:bg-white/10"></div>
                        {MOCK_EVENTS.map((event) => (
                            <div 
                                key={event.id} 
                                className="relative pl-20 md:pl-24 pb-12 md:pb-16 group cursor-pointer"
                                onClick={() => onItemClick({ ...event, type: 'Tadbir' } as any)}
                            >
                                <div className="absolute left-0 top-1 w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-800 border border-graphite/10 dark:border-white/10 flex flex-col items-center justify-center transition-all group-hover:border-teal group-hover:bg-teal group-hover:text-white z-10 dark:text-white">
                                    <span className="text-xl md:text-2xl font-display font-bold leading-none">{event.date.split(' ')[0]}</span>
                                    <span className="text-[9px] md:text-[10px] uppercase font-mono">{event.date.split(' ')[1].slice(0,3)}</span>
                                </div>
                                <h4 className="font-display text-xl md:text-2xl mb-1 group-hover:text-teal transition-colors dark:text-white">{event.title}</h4>
                                <p className="font-serif text-[13px] md:text-sm text-graphite/50 dark:text-slate-400">{event.location}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <div className="relative p-1 border border-graphite/10 dark:border-white/10 bg-parchment/50 dark:bg-slate-800/40 backdrop-blur-sm">
                        <div className="relative aspect-square overflow-hidden bg-graphite group cursor-pointer" onClick={() => onNavigate(PageRoute.ACTION)}>
                            <img src={MOCK_PROJECTS[0].imageUrl} className="w-full h-full object-cover opacity-60 mix-blend-multiply group-hover:opacity-100 transition-all duration-700" />
                            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 md:w-16 md:h-16 border-t border-l border-white/40"></div>
                                    <div className="w-12 h-12 md:w-16 md:h-16 border-t border-r border-white/40 text-right text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">REF: {MOCK_PROJECTS[0].id}</div>
                                </div>
                                <div className="text-white">
                                    <div className="h-px w-full bg-white/20 mb-4 md:mb-6"></div>
                                    <h4 className="font-display text-3xl md:text-4xl mb-2 md:mb-4 uppercase tracking-tighter">{MOCK_PROJECTS[0].title}</h4>
                                    <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-teal-light">{MOCK_PROJECTS[0].status} • {MOCK_PROJECTS[0].location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION III: IJOD (Deep Night with Warm Sepia Glow) */}
      <section className="py-24 md:py-32 bg-parchment dark:bg-[#020617] relative transition-colors border-t dark:border-white/5 overflow-hidden">
        <div className="absolute inset-0 hidden dark:block pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-amber-900/10 blur-[180px] rounded-full"></div>
            <div className="absolute inset-0 stars-overlay opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-16 md:mb-24">
                <Ornament type="flourish" className="mb-4 md:mb-6 opacity-40" />
                <h3 className="font-display text-4xl md:text-6xl text-graphite dark:text-white tracking-tight">Ijod Bo'stoni</h3>
                <p className="font-serif italic text-sepia mt-2 md:mt-4">Chiziqlardagi falsafa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                <div className="md:col-span-8">
                    <div 
                        className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm p-3 md:p-4 border border-graphite/10 dark:border-white/10 shadow-sm cursor-pointer overflow-hidden"
                        onClick={() => onItemClick({ ...MOCK_CREATIONS[2], type: 'San\'at' } as any)}
                    >
                        <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                            <img src={MOCK_CREATIONS[2].imageUrl} className="w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110" />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-4 space-y-8 md:space-y-10">
                    <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm p-3 md:p-4 border border-graphite/10 dark:border-white/10 shadow-sm cursor-pointer" onClick={() => onItemClick({ ...MOCK_CREATIONS[0], type: 'Vektor' } as any)}>
                        <div className="relative aspect-square overflow-hidden mb-3 md:mb-4">
                            <img src={MOCK_CREATIONS[0].imageUrl} className="w-full h-full object-cover sepia-[0.2] group-hover:sepia-0 transition-all duration-700" />
                        </div>
                        <h5 className="font-display text-lg md:text-xl mb-1 group-hover:text-sepia transition-colors dark:text-white">{MOCK_CREATIONS[0].title}</h5>
                        <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-graphite/40 dark:text-slate-400">{MOCK_CREATIONS[0].type}</p>
                    </div>

                    <div className="bg-sepia p-8 md:p-12 text-white text-center flex flex-col items-center justify-center h-48 md:h-64 shadow-xl">
                        <Ornament type="arch" className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 opacity-60" />
                        <h5 className="font-display text-xl md:text-2xl mb-3 md:mb-4 uppercase tracking-widest">To'liq Galereya</h5>
                        <button onClick={() => onNavigate(PageRoute.CREATION)} className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-white/50 pb-1 hover:border-white transition-all">Namunalarni Ko'rish</button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Team Section (Deepest Charcoal) */}
      <TeamSection className="bg-parchment dark:bg-[#020617] border-t dark:border-white/5" />

      {/* Final Quote (Universal Void) */}
      <div className="py-24 md:py-40 text-center bg-[#01030a] text-white relative border-t border-white/5 flex items-center justify-center overflow-hidden">
        <div className="nebula opacity-30"></div>
        <div className="absolute inset-0 stars-overlay opacity-20 pointer-events-none"></div>
        <div className="relative p-8 md:p-24 border-[1px] border-white/5 max-w-5xl mx-auto backdrop-blur-sm z-10 rounded-2xl">
            <blockquote className="font-display text-2xl md:text-5xl italic leading-[1.2] mb-8 md:mb-12 animate-in fade-in duration-1000">
                "Dunyoni go'zallashtirish uchun"
            </blockquote>
            <p className="font-mono text-[9px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/40">
              Me'mor Loyihasi • 2025
            </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
