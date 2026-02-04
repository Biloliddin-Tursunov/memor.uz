
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { Ornament } from '../components/Ornament';

const Search: React.FC = () => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = (lang || 'uz') as Language;
    const navigate = useNavigate();
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

    const {
        articles,
        projects,
        creations,
        videos,
        books,
        creators,
        events,
        fetchAllData,
        isLoading
    } = useStore();

    const [query, setQuery] = useState('');

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const lowQuery = query.toLowerCase();

        const matchedArticles = articles.filter(a =>
            a.title.toLowerCase().includes(lowQuery) ||
            a.excerpt.toLowerCase().includes(lowQuery) ||
            a.content?.toLowerCase().includes(lowQuery)
        ).map(a => ({ ...a, type: 'article', link: `/${currentLang}/article/${a.id}` }));

        const matchedProjects = projects.filter(p =>
            p.title.toLowerCase().includes(lowQuery) ||
            p.description.toLowerCase().includes(lowQuery)
        ).map(p => ({ ...p, type: 'project', link: `/${currentLang}/project/${p.id}` }));

        const matchedCreations = creations.filter(c =>
            c.title.toLowerCase().includes(lowQuery) ||
            c.description.toLowerCase().includes(lowQuery)
        ).map(c => ({ ...c, type: 'creation', link: `/${currentLang}/creation/${c.id}` }));

        const matchedVideos = videos.filter(v =>
            v.title.toLowerCase().includes(lowQuery) ||
            v.author.toLowerCase().includes(lowQuery)
        ).map(v => ({ ...v, type: 'video', link: `/${currentLang}/video/${v.id}` }));

        const matchedBooks = books.filter(b =>
            b.title.toLowerCase().includes(lowQuery) ||
            b.author.toLowerCase().includes(lowQuery) ||
            b.description.toLowerCase().includes(lowQuery)
        ).map(b => ({ ...b, type: 'book', link: `/${currentLang}/book/${b.id}` }));

        const matchedCreators = creators.filter(u =>
            u.name.toLowerCase().includes(lowQuery) ||
            u.bio.toLowerCase().includes(lowQuery)
        ).map(u => ({ ...u, title: u.name, type: 'creator', link: `/${currentLang}/creator/${u.id}` }));

        const matchedEvents = events.filter(e =>
            e.title.toLowerCase().includes(lowQuery) ||
            e.description.toLowerCase().includes(lowQuery)
        ).map(e => ({ ...e, type: 'event', link: `/${currentLang}/event/${e.id}` }));

        return [
            ...matchedArticles,
            ...matchedProjects,
            ...matchedCreations,
            ...matchedVideos,
            ...matchedBooks,
            ...matchedCreators,
            ...matchedEvents
        ];
    }, [query, articles, projects, creations, videos, books, creators, events, currentLang]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
            <div className="text-center mb-16">
                <h2 className="font-display text-5xl md:text-7xl mb-8 dark:text-white uppercase tracking-tighter">
                    {t.search}
                </h2>
                <div className="max-w-2xl mx-auto relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={currentLang === 'uz' ? 'Izlang...' : currentLang === 'ru' ? 'Искать...' : currentLang === 'tr' ? 'Ara...' : 'Search...'}
                        className="w-full bg-transparent border-b-2 border-graphite/10 focus:border-teal py-4 px-12 text-2xl font-serif outline-none transition-all dark:text-white"
                        autoFocus
                    />
                    <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-graphite/30 group-focus-within:text-teal transition-colors" size={24} />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-graphite/30 hover:text-teal transition-colors"
                        >
                            <X size={24} />
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-12">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
                        <p className="mt-4 text-graphite/50 font-mono text-xs uppercase tracking-widest">{currentLang === 'uz' ? 'Yuklanmoqda...' : 'Loading...'}</p>
                    </div>
                ) : query.trim() ? (
                    results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {results.map((item: any, idx) => (
                                <div
                                    key={`${item.type}-${item.id}-${idx}`}
                                    onClick={() => navigate(item.link)}
                                    className="group bg-white dark:bg-white/5 p-6 border border-graphite/5 hover:border-teal/30 transition-all cursor-pointer flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-teal mb-2 block">{item.type}</span>
                                        <h3 className="font-display text-2xl dark:text-white group-hover:text-teal transition-colors mb-2">{item.title}</h3>
                                        <p className="font-serif text-graphite/60 dark:text-gray-400 text-sm line-clamp-2 italic mb-4">
                                            {item.excerpt || item.description || item.subtitle || item.bio || ''}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-sepia group-hover:translate-x-2 transition-transform">
                                        {t.view} <ArrowRight size={12} className="ml-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 opacity-40">
                            <Ornament className="mx-auto mb-8 scale-75" />
                            <p className="font-serif text-2xl italic">{t.notFound}</p>
                        </div>
                    )
                ) : (
                    <div className="text-center py-20 opacity-20">
                        <Ornament className="mx-auto mb-8 scale-75" />
                        <p className="font-mono text-xs uppercase tracking-[0.5em]">{currentLang === 'uz' ? 'Kalit so\'zni kiriting' : 'Enter keywords'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
