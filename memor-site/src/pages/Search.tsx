
import React, { useState, useEffect, useMemo } from 'react';
import { getLocalizedContent } from '../lib/content';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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

    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);

    // Update URL when query changes
    useEffect(() => {
        if (query.trim()) {
            setSearchParams({ q: query });
        } else {
            setSearchParams({});
        }
    }, [query, setSearchParams]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const lowQuery = query.toLowerCase();

        const safeIncludes = (text?: string) => (text || '').toLowerCase().includes(lowQuery);

        const matchedArticles = articles.filter(a => {
            const { title, description, content } = getLocalizedContent(a, currentLang);
            return safeIncludes(title) || safeIncludes(description) || safeIncludes(content);
        }).map(a => {
            const { title, description } = getLocalizedContent(a, currentLang);
            return {
                ...a, title, excerpt: description, type: 'article', link: `/${currentLang}/article/${a.id}`
            };
        });

        const matchedProjects = projects.filter(p => {
            const { title, description } = getLocalizedContent(p, currentLang);
            return safeIncludes(title) || safeIncludes(description);
        }).map(p => {
            const { title, description } = getLocalizedContent(p, currentLang);
            return { ...p, title, description, type: 'project', link: `/${currentLang}/project/${p.id}` };
        });

        const matchedCreations = creations.filter(c => {
            const { title, description } = getLocalizedContent(c, currentLang);
            return safeIncludes(title) || safeIncludes(description);
        }).map(c => {
            const { title, description } = getLocalizedContent(c, currentLang);
            return { ...c, title, description, type: 'creation', link: `/${currentLang}/creation/${c.id}` };
        });

        const matchedVideos = videos.filter(v => {
            const { title } = getLocalizedContent(v, currentLang);
            return safeIncludes(title) || safeIncludes(v.author);
        }).map(v => {
            const { title } = getLocalizedContent(v, currentLang);
            return { ...v, title, type: 'video', link: `/${currentLang}/video/${v.id}` };
        });

        const matchedBooks = books.filter(b => {
            const { title, description } = getLocalizedContent(b, currentLang);
            return safeIncludes(title) || safeIncludes(b.author) || safeIncludes(description);
        }).map(b => {
            const { title, description } = getLocalizedContent(b, currentLang);
            return { ...b, title, description, type: 'book', link: `/${currentLang}/book/${b.id}` };
        });

        const matchedCreators = creators.filter(u => {
            const { bio } = getLocalizedContent(u, currentLang);
            return safeIncludes(u.name) || safeIncludes(bio);
        }).map(u => {
            const { bio } = getLocalizedContent(u, currentLang);
            return { ...u, title: u.name, bio, type: 'creator', link: `/${currentLang}/creator/${u.id}` };
        });

        const matchedEvents = events.filter(e => {
            const { title, description } = getLocalizedContent(e, currentLang);
            return safeIncludes(title) || safeIncludes(description);
        }).map(e => {
            const { title, description } = getLocalizedContent(e, currentLang);
            return { ...e, title, description, type: 'event', link: `/${currentLang}/event/${e.id}` };
        });

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
