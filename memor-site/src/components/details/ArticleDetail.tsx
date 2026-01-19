
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findArticle } from '../../constants';
import { Ornament } from '../Ornament';
import { Language } from '../../types';

export const ArticleDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = findArticle(id || '');

  if (!article) return <div className="p-20 text-center">Maqola topilmadi.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-graphite/40 hover:text-teal transition-all"
      >
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> {language === 'uz' ? 'Ortga' : 'Back'}
      </button>

      <header className="mb-12">
        <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">{article.category}</span>
        <h1 className="font-display text-4xl md:text-5xl text-graphite dark:text-white leading-tight mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-[10px] font-mono text-graphite/40 uppercase tracking-widest border-t border-graphite/5 pt-4">
          <span>{article.author}</span>
          <span className="w-1 h-1 bg-sepia rounded-full opacity-30"></span>
          <span>{article.date}</span>
        </div>
      </header>

      {article.imageUrl && (
        <div className="aspect-[21/9] mb-12 overflow-hidden rounded-sm bg-graphite/5 border border-graphite/5 shadow-sm">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <article className="prose prose-lg prose-headings:font-display prose-p:font-serif prose-p:text-graphite/80 dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed first-letter:text-6xl first-letter:float-left first-letter:mr-4 first-letter:text-sepia first-letter:font-display italic mb-10 opacity-90">
            {article.excerpt}
          </p>
          <div className="space-y-6 text-lg leading-relaxed text-graphite/80 dark:text-slate-300">
            <p>
              {article.content || "Ushbu tadqiqot me'morchilik an'analarini o'rganishda yangi bosqichni ochib beradi. Har bir detal o'zida asriy tajriba va falsafiy mushohadani jamlagan."}
            </p>
            <blockquote className="border-l-2 border-sepia pl-8 my-10 italic text-xl font-display text-graphite/50 dark:text-slate-400">
               "Binoning ruhi uning bezaklarida emas, balki proporsiyalaridagi muvozanatda yashirin."
            </blockquote>
            <p>
              Me'mor loyihasi jamoasi ushbu yo'nalishdagi izlanishlarni davom ettirmoqda. Kelgusida ushbu inshootning 3D rekonstruksiyasini taqdim etish rejalashtirilgan.
            </p>
          </div>
        </article>

        <footer className="mt-20 pt-10 border-t border-graphite/10 text-center">
           <Ornament type="flourish" className="opacity-10 mb-4" />
           <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-graphite/20">Me'mor Archive • 2025</p>
        </footer>
      </div>
    </div>
  );
};
