
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { Ornament } from '../Ornament';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language } from '../../types';
import { getLocalizedContent } from '../../lib/content';

export const ArticleDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { articles, fetchArticles, isLoading } = useStore();

  // Robust slug matching: try exact match, then decoded match
  const article = articles.find(a => a.slug === slug || a.slug === decodeURIComponent(slug || ''));
  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [articles.length, fetchArticles]);

  if (isLoading && !article) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;

  if (!article) {
    console.log('Article not found for slug:', slug, 'Articles available:', articles.length);
    return <div className="p-20 text-center">{t.notFound}</div>;
  }

  const { title, content, description } = getLocalizedContent(article, language);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-graphite/40 hover:text-teal transition-all"
      >
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> {t.back}
      </button>

      <header className="mb-12">
        <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">{article.category}</span>
        <h1 className="font-display text-4xl md:text-5xl text-graphite dark:text-white leading-tight mb-6">
          {title}
        </h1>
        <div className="flex justify-start mb-6">
          <LanguageSwitcher currentLang={language} />
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-graphite/40 uppercase tracking-widest border-t border-graphite/5 pt-4">
          <span>{article.author}</span>
          <span className="w-1 h-1 bg-sepia rounded-full opacity-30"></span>
          <span>{article.date}</span>
        </div>
      </header>

      {article.imageUrl && (
        <div className="aspect-[21/9] mb-12 overflow-hidden rounded-sm bg-graphite/5 border border-graphite/5 shadow-sm">
          <img src={article.imageUrl} alt={title} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <article className="prose prose-lg prose-headings:font-display prose-p:font-serif prose-p:text-graphite/80 dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed first-letter:text-6xl first-letter:float-left first-letter:mr-4 first-letter:text-sepia first-letter:font-display italic mb-10 opacity-90">
            {description}
          </p>
          <div className="space-y-6 text-lg leading-relaxed text-graphite/80 dark:text-slate-300">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className="p-8 border border-dashed border-graphite/20 rounded text-center opacity-50">
                {language === 'uz' ? "Maqola matni kiritilmagan." : "Article content not available."}
              </div>
            )}
          </div>
        </article>

        <footer className="mt-20 pt-10 border-t border-graphite/10 text-center">
          <Ornament type="flourish" className="opacity-10 mb-4" />
          <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-graphite/20">ME'MOR ARCHIVE • 2025</p>
        </footer>
      </div>
    </div>
  );
};
