
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findBook } from '../../constants';
import { Ornament } from '../Ornament';
import { Language } from '../../types';

export const BookDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = findBook(id || '');

  if (!book) return <div className="p-20 text-center">Kitob topilmadi.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <button onClick={() => navigate(-1)} className="mb-8 text-[10px] font-bold uppercase tracking-widest text-graphite/40 hover:text-teal transition-all">
        &larr; {language === 'uz' ? 'Kutubxonaga qaytish' : 'Back'}
      </button>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/3 bg-white dark:bg-white/5 p-2 shadow-xl border border-graphite/10">
          <img src={book.coverUrl} className="w-full h-auto" alt={book.title} />
        </div>
        <div className="flex-grow">
          <span className="text-sepia text-[10px] font-bold uppercase tracking-widest mb-2 block">{book.year}</span>
          <h1 className="font-display text-4xl dark:text-white mb-4">{book.title}</h1>
          <p className="font-serif italic text-xl text-graphite/50 mb-8">{book.author}</p>
          <div className="prose dark:prose-invert font-serif text-lg leading-relaxed text-graphite/80">
            <p>{book.description}</p>
          </div>
          <button className="mt-10 px-8 py-3 bg-graphite dark:bg-white dark:text-black text-white font-display text-[10px] uppercase tracking-widest hover:bg-teal transition-all">
            O'qish (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
