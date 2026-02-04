import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Article, Book, Creator, Artwork, Quest, TeamMember } from '../types';

export const useContent = (currentUser: TeamMember | null) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [creators, setCreators] = useState<Creator[]>([]);
    const [artifacts, setArtifacts] = useState<Artwork[]>([]);
    const [events, setEvents] = useState<Quest[]>([]);
    const [missions, setMissions] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!currentUser) return;
        setLoading(true);

        const [
            { data: articlesData },
            { data: booksData },
            { data: creatorsData },
            { data: creationsData },
            { data: eventsData },
        ] = await Promise.all([
            supabase.from('articles').select('*'),
            supabase.from('books').select('*'),
            supabase.from('creators').select('*'),
            supabase.from('creations').select('*'),
            supabase.from('events').select('*'),
        ]);

        if (articlesData) setArticles(articlesData);
        if (booksData) setBooks(booksData);
        if (creatorsData) setCreators(creatorsData);
        if (creationsData) setArtifacts(creationsData);
        if (eventsData) {
            setEvents(eventsData.filter((e: any) => !e.is_upcoming));
            setMissions(eventsData.filter((e: any) => e.is_upcoming));
        }
        setLoading(false);
    }, [currentUser]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        articles,
        books,
        creators,
        artifacts,
        events,
        missions,
        loading,
        refreshContent: fetchData
    };
};
