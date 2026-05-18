import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ItemDetail from './ItemDetail';
import { DisplayItem } from '../types';
import SEO from './SEO';
import { getLocalizedContent } from '../lib/content';
import { Language } from '../types';

const DetailWrapper: React.FC = () => {
    const { id, slug, lang } = useParams<{ id?: string; slug?: string; lang?: string }>();
    const navigate = useNavigate();
    const store = useStore();
  const isStoreLoading = store.isLoading || store.articlesLoading || store.videosLoading || store.booksLoading || store.creatorsLoading || store.projectsLoading || store.eventsLoading || store.creationsLoading || store.portfolioLoading;
    const [item, setItem] = useState<DisplayItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // If store is empty/partial, ensure we have data. 
            // Ideally we just check if the item is found, if not fetch.
            // But simpler to just fetch all if store seems empty? 
            // Or better: rely on store's fetchAllData if we can't find it initially.

            // Let's try to find it first
            let found: any = null;
            const searchId = id || slug; // Handle both id and slug based routing

            if (!searchId) return;

            const collections = [
                store.articles,
                store.videos,
                store.books,
                store.creators,
                store.projects,
                store.events,
                store.creations,
                store.portfolioItems
            ];

            for (const collection of collections) {
                found = collection.find((i: any) => i.id === searchId || i.slug === searchId);
                if (found) break;
            }

            if (!found) {
                // Not found? Try fetching all data
                setLoading(true);
                await store.fetchAllData();

                // Try finding again after fetch
                // Note: we need to access the store state *after* the fetch updates it.
                // dealing with closure staleness by using store.getState() if vanilla zustand, 
                // but here we are in a component using the hook. 
                // We can rely on the fact that calling fetchAllData updates the store, 
                // but we need to trigger a re-run or read directly. 
                // Since we are using useStore(), a re-render will happen when store updates.
                // So we should put logic in an effect dependent on store data.
            } else {
                setItem(found as DisplayItem);
                setLoading(false);
            }
        };

        if (store.articles.length === 0 && !item) {
            loadData();
        } else {
            // Check immediately
            const searchId = id || slug;
            if (!searchId) return;

            let found: any = null;
            // We need to check all arrays.
            const allItems = [
                ...store.articles,
                ...store.videos,
                ...store.books,
                ...store.creators,
                ...store.projects,
                ...store.events,
                ...store.creations,
                ...store.portfolioItems
            ];

            found = allItems.find((i: any) => i.id === searchId || i.slug === searchId || i.slug === decodeURIComponent(searchId));

            if (found) {
                setItem(found as DisplayItem);
                setLoading(false);
            } else {
                // Only fetch if we haven't already just tried?
                // For now, let's assume if it's not in the populated lists, we might need to fetch individual?
                // Or stick to fetchAllData logic above.
                // Let's assume fetchAllData matches the hook state update.
                if (!isStoreLoading && !item) { // if not loading and not found
                    // It might be that we haven't fetched yet
                    store.fetchAllData();
                }
            }
        }
    }, [id, slug, store.articles.length, isStoreLoading]);
    // Dependency on store.articles.length is a heuristic to re-check when data loads.

    // Better useEffect for finding item:
    useEffect(() => {
        const searchId = id || slug;
        if (!searchId) return;

        const allItems = [
            ...store.articles,
            ...store.videos,
            ...store.books,
            ...store.creators,
            ...store.projects,
            ...store.events,
            ...store.creations,
            ...store.portfolioItems
        ];

        const found = allItems.find((i: any) =>
            i.id === searchId || textMatch(i.slug, searchId) || textMatch(i.title_uz, searchId)
        );

        if (found) {
            setItem(found as DisplayItem);
            setLoading(false);
        } else if (!isStoreLoading && store.articles.length === 0) {
            // Only fetch if empty or likely missing
            store.fetchAllData();
        } else if (!isStoreLoading && store.articles.length > 0) {
            // Data is here but item not found
            setLoading(false);
        }
    }, [id, slug, store.articles, store.videos, store.books, store.creators, store.projects, store.events, store.creations, store.portfolioItems, isStoreLoading]);

    const textMatch = (t1?: string, t2?: string) => {
        if (!t1 || !t2) return false;
        return t1.toLowerCase() === decodeURIComponent(t2).toLowerCase();
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <div className="font-serif text-xl opacity-60">Ma'lumot topilmadi</div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 border border-graphite/20 uppercase text-xs font-bold hover:bg-graphite hover:text-white transition-colors"
                >
                    Ortga
                </button>
            </div>
        );
    }

    // Extract SEO metadata from item
    const currentLang = (lang || 'uz') as Language;
    const { title, description } = getLocalizedContent(item, currentLang);
    const seoImage = item.imageUrl || '/og/cover-main.jpg';

    return (
        <>
            <SEO
                title={title}
                description={description || `Me'mor — ${title}`}
                image={seoImage}
                type="article"
                lang={currentLang}
            />
            <ItemDetail item={item} onBack={() => navigate(-1)} />
        </>
    );
};

export default DetailWrapper;
