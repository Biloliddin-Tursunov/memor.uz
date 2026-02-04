
import React from 'react';
import { useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { Ornament } from '../components/Ornament';

interface NewsProps {
  onItemClick: (item: any) => void;
}

const News: React.FC<NewsProps> = ({ onItemClick }) => {
  const { lang } = useParams<{ lang: string }>();
  const language = (lang || 'uz') as keyof typeof TRANSLATIONS;
  const t = TRANSLATIONS[language];
  const { articles: newsData, fetchArticles: fetchNews, isLoading } = useStore();

  React.useEffect(() => {
    if (newsData.length === 0) {
      fetchNews();
    }
  }, [newsData.length, fetchNews]);

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
      <div className="flex items-center justify-between mb-16 px-4">
        <div>
          <span className="text-teal text-xs font-bold uppercase tracking-[0.4em] mb-3 block">{t.news}</span>
          <h2 className="font-display text-4xl md:text-6xl dark:text-white uppercase tracking-tighter">{t.latestNews}</h2>
        </div>
        <div className="hidden md:flex flex-col items-end opacity-20">
          <Ornament type="flourish" className="w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {newsData.length > 0 ? newsData.map((news) => (
          <div
            key={news.id}
            onClick={() => onItemClick({ ...news, type: 'yangilik' })}
            className="group cursor-pointer bg-white dark:bg-white/5 border border-graphite/5 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-700"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 left-4 bg-teal text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                {news.category}
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <span className="font-mono text-[9px] text-graphite/30 dark:text-white/20 uppercase tracking-[0.3em] mb-4">
                {news.date} — {t.archive}
              </span>
              <h3 className="font-display text-2xl mb-4 dark:text-white group-hover:text-teal transition-colors leading-tight">
                {news.title}
              </h3>
              <p className="font-serif text-sm text-graphite/60 dark:text-gray-400 line-clamp-3 mb-8 italic">
                {news.excerpt}
              </p>

              <div className="mt-auto pt-6 border-t border-dashed border-graphite/10 flex justify-between items-center group-hover:border-teal/30">
                <span className="text-[10px] font-bold uppercase tracking-widest text-graphite dark:text-white group-hover:text-teal transition-colors">
                  {t.readMoreNews} &rarr;
                </span>
                <Ornament type="corner" className="w-4 h-4 opacity-10" />
              </div>
            </div>
          </div>
        )) : isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} />)
        ) : (
          <div className="col-span-full text-center py-20 opacity-40 font-serif italic text-2xl">{t.notFound}</div>
        )}
      </div>

      <div className="mt-24 text-center">
        <Ornament type="divider" className="w-64 mx-auto mb-8 opacity-20" />
        <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-graphite/20">ME'MOR NEWS • 2025</p>
      </div>
    </div>
  );
};

export default News;
