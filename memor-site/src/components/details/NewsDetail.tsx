
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { Ornament } from '../Ornament';
import { Language } from '../../types';

export const NewsDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles: newsData, fetchArticles: fetchNews, isLoading } = useStore();
  const news = newsData.find(n => n.id === id);
  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (newsData.length === 0) {
      fetchNews();
    }
  }, [newsData.length, fetchNews]);

  if (isLoading && !news) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!news) return <div className="p-20 text-center">{t.notFound}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-graphite/40 hover:text-teal transition-all"
      >
        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> {t.back}
      </button>

      <div className="border-b border-graphite/10 pb-10 mb-10">
        <span className="text-sepia text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
          {news.category} • {news.date}
        </span>
        <h1 className="font-display text-4xl md:text-6xl dark:text-white leading-tight mb-6">
          {news.title}
        </h1>
        <p className="font-serif text-xl italic text-graphite/60 dark:text-slate-400 leading-relaxed">
          {news.excerpt}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="aspect-video bg-graphite/5 mb-10 rounded-sm overflow-hidden border border-graphite/5 shadow-sm">
            <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
          </div>
          <div className="prose dark:prose-invert font-serif text-lg leading-relaxed text-graphite/80 dark:text-slate-300">
            <p>
              {news.content || "Bugun biz uchun muhim kun. Me'mor jamoasi yangi loyihalarni amalga oshirishda davom etmoqda. Ushbu xabar sohamiz rivojidagi yana bir qadamdir."}
            </p>
            <p className="mt-6">
              Batafsil ma'lumot olish uchun bizning ijtimoiy tarmoqlarimizni kuzatib boring. Biz bilan bo'lganingiz uchun rahmat.
            </p>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-32 bg-white dark:bg-white/5 p-8 border border-graphite/5 shadow-sm rounded-sm">
            <h3 className="font-display text-lg mb-6 dark:text-white uppercase tracking-widest">{t.share}</h3>
            <div className="flex gap-4 mb-10">
              <div className="w-10 h-10 bg-teal/5 border border-teal/10 flex items-center justify-center hover:bg-teal hover:text-white cursor-pointer transition-all">FB</div>
              <div className="w-10 h-10 bg-teal/5 border border-teal/10 flex items-center justify-center hover:bg-teal hover:text-white cursor-pointer transition-all">TG</div>
              <div className="w-10 h-10 bg-teal/5 border border-teal/10 flex items-center justify-center hover:bg-teal hover:text-white cursor-pointer transition-all">IN</div>
            </div>
            <Ornament type="divider" className="opacity-10 mb-6" />
            <p className="text-[10px] font-mono text-graphite/40 uppercase tracking-widest">
              {t.author}: {news.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
