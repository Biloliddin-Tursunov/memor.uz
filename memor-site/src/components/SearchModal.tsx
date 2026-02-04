
import React, { useState, useEffect, useMemo } from 'react';
import { getLocalizedContent } from '../lib/content';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { DisplayItem, Language } from '../types';
import { Ornament } from './Ornament';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: DisplayItem) => void;
  language: Language;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onItemClick, language }) => {
  const { articles, projects, videos, books } = useStore();
  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[language];

  // Barcha ma'lumotlarni qidiruv uchun bitta massivga yig'ish
  const allData: DisplayItem[] = useMemo(() => {
    const categories = {
      uz: { article: 'Maqola', project: 'Loyiha', video: 'Video', book: 'Kitob' },
      en: { article: 'Article', project: 'Project', video: 'Video', book: 'Book' },
      ru: { article: 'Статья', project: 'Проект', video: 'Видео', book: 'Книга' },
      tr: { article: 'Makale', project: 'Proje', video: 'Video', book: 'Kitap' }
    };
    const c = categories[language] || categories.uz;

    return [
      ...articles.map(a => {
        const { title, description } = getLocalizedContent(a, language);
        return { id: a.id, title, subtitle: a.author, description, imageUrl: a.imageUrl, type: c.article };
      }),
      ...projects.map(p => {
        const { title, description, location } = getLocalizedContent(p, language);
        return { id: p.id, title, subtitle: location, description, imageUrl: p.imageUrl, type: c.project };
      }),
      ...videos.map(v => {
        const { title } = getLocalizedContent(v, language);
        return { id: v.id, title, subtitle: v.author, imageUrl: v.thumbnailUrl, type: c.video };
      }),
      ...books.map(b => {
        const { title } = getLocalizedContent(b, language);
        return { id: b.id, title, subtitle: b.author, imageUrl: b.coverUrl, type: c.book };
      }),
    ];
  }, [language, articles, projects, videos, books]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allData.filter(item =>
      (item.title || '').toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, allData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
      <div className="absolute inset-0 bg-graphite/60 dark:bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-parchment dark:bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 rounded-lg border border-graphite/10 dark:border-white/10">
        <div className="p-6 border-b border-graphite/10 dark:border-white/10 flex items-center gap-4">
          <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            autoFocus
            type="text"
            placeholder={t.search + '...'}
            className="w-full bg-transparent border-none focus:ring-0 text-xl font-display text-graphite dark:text-white placeholder-graphite/30 dark:placeholder-white/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 dark:hover:bg-white/5 rounded-full transition-colors text-graphite/40">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 no-scrollbar">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onItemClick(item); onClose(); }}
                  className="flex items-center gap-4 p-3 hover:bg-teal/5 dark:hover:bg-teal/10 group transition-all text-left"
                >
                  <div className="w-16 h-16 bg-graphite/5 dark:bg-slate-800 rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-teal">{item.type}</span>
                      <span className="h-px w-4 bg-teal/30"></span>
                    </div>
                    <h4 className="font-display text-lg text-graphite dark:text-white group-hover:text-teal transition-colors">{item.title}</h4>
                    <p className="text-xs text-graphite/50 dark:text-white/40 font-serif italic">{item.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="py-12 text-center">
              <Ornament type="flourish" className="mb-4 opacity-20" />
              <p className="text-graphite/40 dark:text-white/20 font-serif italic">{language === 'uz' ? 'Natijalar topilmadi...' : (language === 'ru' ? 'Результаты не найдены...' : (language === 'tr' ? 'Sonuç bulunamadı...' : 'No results found...'))}</p>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-graphite/30 dark:text-white/20 text-xs uppercase tracking-[0.3em] font-bold">{t.clickForFull}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
