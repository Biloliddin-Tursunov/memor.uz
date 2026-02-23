
import React from 'react';
import { useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';
import { getLocalizedContent, stripHtml } from '../lib/content';
import SEO from '../components/SEO';

interface NewsProps {
  onItemClick: (item: any) => void;
}

const News: React.FC<NewsProps> = ({ onItemClick }) => {
  const { lang } = useParams<{ lang: string }>();
  // ... (rest of code)
  const language = (lang || 'uz') as keyof typeof TRANSLATIONS;
  const t = TRANSLATIONS[language];
  const {
    articles,
    videos,
    books,
    events,
    projects,
    creations,
    fetchAllData,
    isLoading
  } = useStore();

  React.useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const [mixedData, setMixedData] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (isLoading) return;

    // Normalize and combine data
    const combined = [
      ...articles.map(i => ({ ...i, type: 'maqola', sortDate: i.date })),
      ...videos.map(i => ({ ...i, type: 'video', imageUrl: i.thumbnailUrl, sortDate: '2024-01-01' })),
      ...books.map(i => ({ ...i, type: 'kitob', imageUrl: i.coverUrl, sortDate: i.year })),
      ...projects.map(i => ({ ...i, type: 'loyiha', sortDate: '2025-01-01' })),
      ...events.map(i => ({ ...i, type: 'tadbir', imageUrl: i.id === 'tadbir-1' ? 'https://images.unsplash.com/photo-1540575467063-178a50937178?q=80&w=2835&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2940&auto=format&fit=crop', sortDate: i.date })),
      ...creations.map(i => ({ ...i, type: 'ijod', sortDate: '2024-06-15' })),
    ];

    // Shuffle slightly to give a "feed" feel since real dates are scarce
    setMixedData(combined.sort(() => Math.random() - 0.5));
  }, [articles, videos, books, events, projects, creations, isLoading]);

  const Skeleton = () => (
    <div className="animate-pulse bg-white dark:bg-white/5 border border-graphite/5 overflow-hidden flex flex-col h-full">
      <div className="aspect-[16/10] bg-graphite/5"></div>
      <div className="p-8">
        <div className="h-2 w-20 bg-graphite/10 mb-4"></div>
        <div className="h-6 w-full bg-graphite/10 mb-4"></div>
        <div className="h-16 w-full bg-graphite/10 mb-8"></div>
        <div className="h-4 w-24 bg-graphite/10"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO
        title={t.seoNewsTitle}
        description={t.seoNewsDesc}
        lang={language}
      />
      <div className="flex items-center justify-between mb-16 px-4">
        <div>
          <span className="text-teal text-xs font-bold uppercase tracking-[0.4em] mb-3 block">{t.news}</span>
          <h2 className="font-display text-4xl md:text-6xl dark:text-white uppercase tracking-tighter">{t.latestNews}</h2>
        </div>
        <div className="flex flex-col items-end gap-4">

          <div className="hidden md:flex flex-col items-end opacity-20">
            <Ornament type="flourish" className="w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {mixedData.length > 0 ? mixedData.map((item, idx) => {
          const { title, description } = getLocalizedContent(item, language);
          return (
            <div
              key={`${item.type}-${item.id}-${idx}`}
              onClick={() => onItemClick(item)}
              className="group cursor-pointer bg-white dark:bg-white/5 border border-graphite/5 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-700"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                ) : (
                  <div className="w-full h-full bg-sepia/10 flex items-center justify-center">
                    <Ornament type="knot" className="opacity-20 w-32" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-teal text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                  {item.type}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <span className="font-mono text-[9px] text-graphite/30 dark:text-white/20 uppercase tracking-[0.3em] mb-4">
                  {item.date || item.year || '2025'} — {item.author || item.subtitle || 'Memor'}
                </span>
                <h3 className="font-display text-2xl mb-4 dark:text-white group-hover:text-teal transition-colors leading-tight">
                  {title}
                </h3>
                <p className="font-serif text-sm text-graphite/60 dark:text-gray-400 line-clamp-3 mb-8 italic">
                  {stripHtml(description)}
                </p>

                <div className="mt-auto pt-6 border-t border-dashed border-graphite/10 flex justify-between items-center group-hover:border-teal/30">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-graphite dark:text-white group-hover:text-teal transition-colors">
                    {t.readMore} &rarr;
                  </span>
                  <Ornament type="corner" className="w-4 h-4 opacity-10" />
                </div>
              </div>
            </div>
          );
        }) : isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} />)
        ) : (
          <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
        )}
      </div>

      <div className="mt-24 text-center">
        <Ornament type="divider" className="w-64 mx-auto mb-8 opacity-20" />
        <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-graphite/20">ME'MOR FEED • 2025</p>
      </div>
    </div>
  );
};

export default News;
