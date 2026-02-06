
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { Ornament } from '../Ornament';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language } from '../../types';
import { getLocalizedContent } from '../../lib/content';

export const BookDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, fetchBooks, isLoading } = useStore();
  const book = books.find(b => b.id === id);
  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, [books.length, fetchBooks]);

  if (isLoading && !book) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!book) return <div className="p-20 text-center">{t.notFound}</div>;

  const { title, description } = getLocalizedContent(book, language);

  return (
    <div className="w-full animate-in fade-in duration-700 bg-parchment dark:bg-[#020617]">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-graphite/40 hover:text-teal transition-all mb-12"
        >
          <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> {t.back}
        </button>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3 bg-white dark:bg-white/5 p-2 shadow-xl border border-graphite/10">
            <img src={book.coverUrl} className="w-full h-auto" alt={title} />
          </div>
          <div className="flex-grow">
            <span className="text-sepia text-[10px] font-bold uppercase tracking-widest mb-2 block">{book.year}</span>
            <h1 className="font-display text-4xl dark:text-white mb-4 uppercase tracking-tight">{title}</h1>
            <div className="mb-6">
              <LanguageSwitcher currentLang={language} variant="list" />
            </div>
            <p className="font-serif italic text-xl text-graphite/50 dark:text-gray-400 mb-8">{book.author}</p>
            <div className="prose dark:prose-invert font-serif text-lg leading-relaxed text-graphite/80 dark:text-gray-300">
              <p>{description}</p>
            </div>
            <button className="mt-10 px-8 py-3 bg-graphite dark:bg-white dark:text-black text-white font-display text-[10px] uppercase tracking-widest hover:bg-teal transition-all shadow-lg">
              {language === 'uz' ? "O'qish (PDF)" : (language === 'ru' ? 'Читать (PDF)' : (language === 'tr' ? 'Oku (PDF)' : 'Read (PDF)'))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
