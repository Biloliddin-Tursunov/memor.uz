import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface DashboardStats {
    articlesCount: number;
    booksCount: number;
    videosCount: number;
    messagesCount: number;
    viewsCount: number; // For now this might be mocked or summed if we have a views table
    visitorsOnline: number; // Mocked usually
}

export const useStatistics = () => {
    const [stats, setStats] = useState<DashboardStats>({
        articlesCount: 0,
        booksCount: 0,
        videosCount: 0,
        messagesCount: 0,
        viewsCount: 45291, // Static for now
        visitorsOnline: 142 // Static for now
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    { count: articlesCount, data: articlesData },
                    { count: booksCount, data: booksData },
                    { count: messagesCount },
                    { count: videosCount, data: videosData }
                ] = await Promise.all([
                    supabase.from('articles').select('views', { count: 'exact' }),
                    supabase.from('books').select('views', { count: 'exact' }),
                    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
                    supabase.from('videos').select('views', { count: 'exact' })
                ]);

                // Calculate total views
                const totalViews =
                    (articlesData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0) +
                    (booksData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0) +
                    (videosData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0);

                setStats(prev => ({
                    ...prev,
                    articlesCount: articlesCount || 0,
                    booksCount: booksCount || 0,
                    messagesCount: messagesCount || 0,
                    videosCount: videosCount || 0,
                    viewsCount: totalViews,
                    visitorsOnline: Math.floor(Math.random() * 20) + 5 // Mock active visitors for now
                }));
            } catch (e) {
                console.error("Error fetching stats", e);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading };
};
