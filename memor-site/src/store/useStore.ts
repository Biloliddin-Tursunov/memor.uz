
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Article, VideoResource, Book, Creator, EventItem, Project, CreationItem, PortfolioItem } from '../types';
import { generateSlug } from '../lib/content';

interface AppState {
    articles: Article[];
    videos: VideoResource[];
    books: Book[];
    creators: Creator[];
    projects: Project[];
    events: EventItem[];
    creations: CreationItem[];
    portfolioItems: PortfolioItem[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchArticles: () => Promise<void>;
    fetchVideos: () => Promise<void>;
    fetchBooks: () => Promise<void>;
    fetchCreators: () => Promise<void>;
    fetchProjects: () => Promise<void>;
    fetchEvents: () => Promise<void>;
    fetchCreations: () => Promise<void>;
    fetchPortfolio: () => Promise<void>;
    fetchAllData: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
    articles: [],
    videos: [],
    books: [],
    creators: [],
    projects: [],
    events: [],
    creations: [],
    portfolioItems: [],
    isLoading: false,
    error: null,

    fetchArticles: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('articles').select('*');
        if (error) {
            set({ error: error.message, isLoading: false });
        } else {
            const mappedArticles = data.map((item: any) => ({
                id: item.id,
                title_uz: item.title_uz,
                title_en: item.title_en,
                title_ru: item.title_ru,
                title_tr: item.title_tr,
                excerpt_uz: item.excerpt_uz,
                excerpt_en: item.excerpt_en,
                excerpt_ru: item.excerpt_ru,
                excerpt_tr: item.excerpt_tr,
                content_uz: item.content_uz,
                content_en: item.content_en,
                content_ru: item.content_ru,
                content_tr: item.content_tr,
                author: item.author || 'Memor Jamoasi',
                date: item.created_at ? new Date(item.created_at).toLocaleDateString('uz-UZ') : new Date().toLocaleDateString('uz-UZ'),
                category: item.category || 'Maqola',
                imageUrl: item.image_url,
                slug: item.slug || generateSlug(item.title_uz || item.id)
            })) as Article[];
            set({ articles: mappedArticles, isLoading: false });
        }
    },

    fetchVideos: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('videos').select('*');
        if (error) set({ error: error.message, isLoading: false });
        else set({
            videos: data.map((v: any) => ({
                id: v.id,
                title_uz: v.title_uz,
                title_en: v.title_en,
                title_ru: v.title_ru,
                title_tr: v.title_tr,
                description_uz: v.description_uz,
                description_en: v.description_en,
                description_ru: v.description_ru,
                description_tr: v.description_tr,
                duration: v.duration,
                thumbnailUrl: v.thumbnail_url,
                videoUrl: v.video_url,
                author: v.author,
                type: v.type,
                slug: v.slug || generateSlug(v.title_uz || v.id)
            })) as VideoResource[],
            isLoading: false
        });
    },

    fetchBooks: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('books').select('*');
        if (error) set({ error: error.message, isLoading: false });
        else set({
            books: data.map((b: any) => ({
                id: b.id,
                title_uz: b.title_uz,
                title_en: b.title_en,
                title_ru: b.title_ru,
                title_tr: b.title_tr,
                author: b.author,
                year: b.year,
                coverUrl: b.cover_url,
                description_uz: b.description_uz,
                description_en: b.description_en,
                description_ru: b.description_ru,
                description_tr: b.description_tr,
                downloadUrl: b.download_url
            })) as Book[],
            isLoading: false
        });
    },

    fetchCreators: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('creators').select('*');
        if (error) set({ error: error.message, isLoading: false });
        else set({
            creators: data.map((c: any) => ({
                id: c.id,
                name: c.name,
                role_uz: c.role_uz,
                role_en: c.role_en,
                role_ru: c.role_ru,
                role_tr: c.role_tr,
                avatarUrl: c.avatar_url,
                bio_uz: c.bio_uz,
                bio_en: c.bio_en,
                bio_ru: c.bio_ru,
                bio_tr: c.bio_tr,
            })) as Creator[],
            isLoading: false
        });
    },

    fetchProjects: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('projects').select('*');
        if (error) set({ error: error.message, isLoading: false });
        else set({
            projects: data.map((p: any) => ({
                id: p.id,
                title_uz: p.title_uz,
                title_en: p.title_en,
                title_ru: p.title_ru,
                title_tr: p.title_tr,
                status: p.status,
                description_uz: p.description_uz,
                description_en: p.description_en,
                description_ru: p.description_ru,
                description_tr: p.description_tr,
                imageUrl: p.image_url,
                location_uz: p.location_uz,
                location_en: p.location_en,
                location_ru: p.location_ru,
                location_tr: p.location_tr
            })) as Project[],
            isLoading: false
        });
    },

    fetchEvents: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('events').select('*');
        if (error) set({ error: error.message, isLoading: false });
        else set({
            events: data.map((e: any) => ({
                id: e.id,
                title_uz: e.title_uz,
                title_en: e.title_en,
                title_ru: e.title_ru,
                title_tr: e.title_tr,
                date: e.date,
                location_uz: e.location_uz,
                location_en: e.location_en,
                location_ru: e.location_ru,
                location_tr: e.location_tr,
                description_uz: e.description_uz,
                description_en: e.description_en,
                description_ru: e.description_ru,
                description_tr: e.description_tr,
                isUpcoming: e.is_upcoming
            })) as EventItem[],
            isLoading: false
        });
    },

    fetchCreations: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('creations').select('*');
        if (error) set({ error: error.message, isLoading: false });
        else set({
            creations: data.map((c: any) => ({
                id: c.id,
                title_uz: c.title_uz,
                title_en: c.title_en,
                title_ru: c.title_ru,
                title_tr: c.title_tr,
                author: c.author,
                type: c.type,
                imageUrl: c.image_url,
                description_uz: c.description_uz,
                description_en: c.description_en,
                description_ru: c.description_ru,
                description_tr: c.description_tr,
                gallery_images: c.gallery_images || [], // <-- SHU QATOR QO'SHILDI
                downloadUrl: c.download_url,
                slug: c.slug || generateSlug(c.title_uz || c.id)
            })) as CreationItem[],
            isLoading: false
        });
    },

    fetchPortfolio: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('portfolio').select('*');
        if (error) set({ error: error.message, isLoading: false });
        else set({
            portfolioItems: data.map((p: any) => ({
                id: p.id,
                title_uz: p.title_uz,
                title_en: p.title_en,
                title_ru: p.title_ru,
                title_tr: p.title_tr,
                imageUrl: p.image_url,
                year: p.year,
                architect: p.architect,
                type_uz: p.type_uz,
                type_en: p.type_en,
                type_ru: p.type_ru,
                type_tr: p.type_tr
            })) as PortfolioItem[],
            isLoading: false
        });
    },

    fetchAllData: async () => {
        set({ isLoading: true });
        try {
            await Promise.all([
                get().fetchArticles(),
                get().fetchVideos(),
                get().fetchBooks(),
                get().fetchCreators(),
                get().fetchProjects(),
                get().fetchEvents(),
                get().fetchCreations(),
                get().fetchPortfolio(),
            ]);
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));
