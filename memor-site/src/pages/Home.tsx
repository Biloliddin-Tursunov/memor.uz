
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';
import { PageRoute, Language } from '../types';
import TeamSection from '../components/TeamSection';
import { Skeleton } from '../components/Skeleton';
import Hero from '../components/Hero';
import { HadithBlock } from '../components/HadithBlock';
import { getLocalizedContent, stripHtml } from '../lib/content';
import SEO from '../components/SEO';

interface HomeProps {
  onNavigate: (route: PageRoute) => void;
  onItemClick: (item: any) => void;
  language: Language;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onItemClick, language }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];
  const { articles, projects, events, creations, fetchAllData, isLoading } = useStore();

  React.useEffect(() => {
    // Always fetch data on mount to ensure Hero has content
    fetchAllData();
  }, [fetchAllData]);

  // Use the first article for the Hero section if available
  const latestArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="w-full overflow-hidden">
      <SEO
        title={t.seoHomeTitle}
        description={t.seoHomeDesc}
        lang={language}
      />
      <Hero
        onNavigate={onNavigate}
        onItemClick={onItemClick}
        language={language}
        featuredItem={latestArticle}
      />

      {/* --- SECTION 1: PHILOSOPHY --- */}
      <section className="py-24 bg-white dark:bg-[#01030a] border-b border-graphite/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <Ornament type="flourish" className="mb-12 opacity-60" />
          <h2 className="font-display text-4xl md:text-5xl mb-20 tracking-tight dark:text-white uppercase">{t.pillarsTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            <div className="group cursor-pointer" onClick={() => onNavigate(PageRoute.KNOWLEDGE)}>
              <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-sm border border-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-all duration-700 relative overflow-hidden">
                <Ornament type="dome" className="w-16 h-16 relative z-10" />
                <div className="absolute inset-0 bg-teal/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="font-display text-2xl mb-4 dark:text-white tracking-widest">{t.ilm}</h3>
              <p className="font-serif text-sm text-graphite/60 dark:text-slate-400 leading-relaxed italic max-w-xs mx-auto">{t.ilmDesc}</p>
            </div>

            <div className="group cursor-pointer" onClick={() => onNavigate(PageRoute.ACTION)}>
              <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-sm border border-sepia/10 text-sepia group-hover:bg-sepia group-hover:text-white transition-all duration-700 relative overflow-hidden">
                <Ornament type="arch" className="w-16 h-16 relative z-10" />
                <div className="absolute inset-0 bg-sepia/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="font-display text-2xl mb-4 dark:text-white tracking-widest">{t.harakat}</h3>
              <p className="font-serif text-sm text-graphite/60 dark:text-slate-400 leading-relaxed italic max-w-xs mx-auto">{t.harakatDesc}</p>
            </div>

            <div className="group cursor-pointer" onClick={() => onNavigate(PageRoute.CREATION)}>
              <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-sm border border-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-all duration-700 relative overflow-hidden">
                <Ornament type="tile-header" className="w-14 h-14 relative z-10" />
                <div className="absolute inset-0 bg-teal/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="font-display text-2xl mb-4 dark:text-white tracking-widest">{t.ijod}</h3>
              <p className="font-serif text-sm text-graphite/60 dark:text-slate-400 leading-relaxed italic max-w-xs mx-auto">{t.ijodDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: KNOWLEDGE (ILM) INTEGRATED --- */}
      <section className="py-24 md:py-32 bg-parchment dark:bg-[#020617] relative transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-teal text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">{t.ilm} Maskani</span>
              <h2 className="font-display text-4xl md:text-6xl dark:text-white">{t.knowledgeTreasury}</h2>
            </div>
            <button onClick={() => onNavigate(PageRoute.KNOWLEDGE)} className="text-[10px] font-bold uppercase tracking-widest text-sepia border-b border-sepia/30 pb-1 hover:text-teal hover:border-teal transition-all">
              {t.allArticles} &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-7">
              {articles.length > 0 ? (
                (() => {
                  const { title, description } = getLocalizedContent(articles[0], language);
                  return (
                    <div
                      className="relative bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 md:p-12 shadow-sm border border-graphite/5 transform -rotate-1 hover:rotate-0 transition-transform duration-700 cursor-pointer group"
                      onClick={() => navigate(`/${language}/article/${articles[0].slug}`)}
                    >
                      <img src={articles[0].imageUrl} className="w-full h-[250px] md:h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 mb-8" />
                      <h4 className="font-display text-2xl md:text-4xl mb-4 dark:text-white leading-tight">{title}</h4>
                      <p className="font-serif text-base md:text-lg text-graphite/60 dark:text-slate-300 mb-6 italic border-l-2 border-sepia pl-4 md:pl-6 line-clamp-3">{stripHtml(description)}</p>
                      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-graphite/30">
                        <span>{articles[0].author}</span>
                        <span>•</span>
                        <span>{articles[0].date}</span>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <Skeleton className="h-[600px] w-full" />
              )}
            </div>

            <div className="lg:col-span-5 space-y-12 lg:pt-10">
              <div className="space-y-10">
                <HadithBlock language={language} variant="compact" />
                {articles.length > 1 ? articles.slice(1, 4).map((art, idx) => {
                  const { title } = getLocalizedContent(art, language);
                  return (
                    <div key={art.id} className="flex gap-6 group cursor-pointer transition-all hover:pl-4 border-l border-transparent hover:border-teal" onClick={() => navigate(`/${language}/article/${art.slug}`)}>
                      <div className="w-24 h-24 flex-shrink-0 bg-graphite/5 overflow-hidden shadow-sm">
                        <img src={art.imageUrl} className="w-full h-full object-cover filter sepia-[0.2] group-hover:sepia-0 transition-all" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[9px] font-bold text-teal tracking-widest uppercase mb-1">{art.category}</span>
                        <h5 className="font-display text-lg dark:text-white leading-tight mb-2">{title}</h5>
                        <p className="text-[10px] font-serif text-graphite/40 italic dark:text-slate-400">{art.date}</p>
                      </div>
                    </div>
                  );
                }) : !isLoading ? <div className="text-center opacity-50 py-10">Yangiliklar yo'q</div> : [1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" type="news-item" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: ACTION (HARAKAT) --- */}
      <section className="py-24 bg-graphite/[0.02] dark:bg-[#01030a] border-y border-graphite/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="font-display text-3xl dark:text-white uppercase tracking-tight">{t.project}lar</h2>
                <div className="h-px flex-grow bg-graphite/10 dark:bg-white/10"></div>
              </div>
              <div className="space-y-12">
                {projects.length > 0 ? projects.slice(0, 2).map((proj) => {
                  const { title, description } = getLocalizedContent(proj, language);
                  return (
                    <div key={proj.id} className="group cursor-pointer" onClick={() => onItemClick({ ...proj, type: 'project' })}>
                      <div className="relative aspect-video overflow-hidden mb-6 rounded-sm">
                        <img src={proj.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={title} />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-sepia text-white text-[9px] font-bold uppercase tracking-widest">{proj.status}</div>
                      </div>
                      <h3 className="font-display text-2xl dark:text-white mb-2 group-hover:text-sepia transition-colors">{title}</h3>
                      <p className="font-serif text-graphite/60 dark:text-slate-400 italic text-sm line-clamp-2">{stripHtml(description)}</p>
                    </div>
                  );
                }) : [1, 2].map(i => <Skeleton key={i} className="h-64 w-full" />)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="font-display text-3xl dark:text-white uppercase tracking-tight">{t.events}</h2>
                <div className="h-px flex-grow bg-graphite/10 dark:bg-white/10"></div>
              </div>
              <div className="space-y-6">
                {events.length > 0 ? events.map((event) => {
                  const { title, location } = getLocalizedContent(event, language);
                  return (
                    <div key={event.id} className="flex bg-white dark:bg-white/5 border border-graphite/5 p-6 items-center gap-8 shadow-sm hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate(`/${language}/event/${event.id}`)}>
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 border border-sepia/20 text-sepia bg-parchment dark:bg-white/5">
                        <span className="text-2xl font-bold font-display">{event.date.split(' ')[0]}</span>
                        <span className="text-[9px] uppercase tracking-widest">{event.date.split(' ')[1]?.slice(0, 3)}</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-display text-xl mb-1 dark:text-white group-hover:text-teal transition-colors">{title}</h4>
                        <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-graphite/30 dark:text-white/20">
                          {location}
                        </div>
                      </div>
                    </div>
                  );
                }) : [1, 2, 3].map(i => <Skeleton key={i} type="event-item" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CREATION (IJOD) --- */}
      <section className="py-24 bg-white dark:bg-[#020617] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
          <div>
            <span className="text-sepia text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">{t.ijod} Namunalari</span>
            <h2 className="font-display text-4xl md:text-6xl dark:text-white">{t.artGallery}</h2>
          </div>
          <button onClick={() => onNavigate(PageRoute.CREATION)} className="text-[10px] font-bold uppercase tracking-widest text-teal border-b border-teal/30 pb-1">{t.viewAll} &rarr;</button>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar px-6 md:px-12 pb-12">
          {creations.length > 0 ? creations.map((item) => {
            const { title } = getLocalizedContent(item, language);
            return (
              <div
                key={item.id}
                className="flex-shrink-0 w-72 md:w-96 bg-parchment dark:bg-white/5 p-4 shadow-sm hover:shadow-xl transition-all duration-500 group border border-graphite/5 cursor-pointer"
                onClick={() => navigate(`/${language}/creation/${item.id}`)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6 rounded-sm">
                  <img src={item.imageUrl} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                </div>
                <h3 className="font-display text-xl dark:text-white group-hover:text-teal transition-colors">{title}</h3>
              </div>
            );
          }) : [1, 2, 3, 4].map(i => <Skeleton key={i} type="creation" className="w-72 md:w-96 flex-shrink-0" />)}
        </div>
      </section>

      <TeamSection className="bg-parchment dark:bg-[#020617] border-t dark:border-white/5" />

      {/* Final Quote Section */}
      <div className="py-24 md:py-40 text-center bg-[#01030a] text-white relative flex items-center justify-center">
        <div className="nebula opacity-30"></div>
        <div className="relative p-8 md:p-24 border-[1px] border-white/5 max-w-5xl mx-auto backdrop-blur-sm z-10 overflow-hidden">
          <Ornament type="flourish" className="mb-12 opacity-40 w-16 h-16" />
          <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-[1.2] mb-12">
            {t.beautifyWorld}
          </blockquote>
          <p className="font-mono text-[10px] uppercase tracking-[0.8em] text-white/40 animate-pulse">{t.projectYear}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
