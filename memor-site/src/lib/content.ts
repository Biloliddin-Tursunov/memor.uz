import { Language } from '../types';

// Slug hosil qilish uchun markaziy funksiya
export const generateSlug = (text: string): string => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .replace(/'/g, '')               // Apostrofni olib tashlash (Me'mor -> memor)
        .normalize('NFD')                // Aksentlarni ajratish
        .replace(/[\u0300-\u036f]/g, '') // Aksentlarni olib tashlash
        .trim()
        .replace(/[^\w\s-]/g, '')       // Belgilarni (%, &, # va hk) olib tashlash
        .replace(/[\s_]+/g, '-')         // Bo'sh joy va tagchiziqlarni chiziqchaga almashtirish
        .replace(/--+/g, '-')            // Ketma-ket chiziqchalarni bitta qilish
        .replace(/^-+|-+$/g, '');        // Boshidan va oxiridan chiziqchalarni olib tashlash
};

// YouTube URL dan ID ni ajratib olish
export const getYoutubeID = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// HTML teglarini olib tashlash
export const stripHtml = (html: string): string => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export const getLocalizedContent = (item: any, language: Language) => {
    if (!item) return { title: '', description: '', content: '' };

    const langKey = language.toLowerCase();

    // Dynamic lookup with fallback to 'uz' or first available
    const title = item[`title_${langKey}`] || item.title_uz || item.title_en || item.title_ru || item.title_tr || item.title || '';

    // Description/Excerpt priority
    const description = item[`description_${langKey}`] || item[`excerpt_${langKey}`] ||
        item.description_uz || item.excerpt_uz ||
        item.description_en || item.excerpt_en || '';

    // Full Content
    const content = item[`content_${langKey}`] || item.content_uz || item.content_en || '';

    // Specific fields for other types
    const location = item[`location_${langKey}`] || item.location_uz || '';
    const type = item[`type_${langKey}`] || item.type || '';
    const role = item[`role_${langKey}`] || item.role || '';
    const bio = item[`bio_${langKey}`] || item.bio || '';

    return {
        title,
        description, // serves as excerpt for articles
        content,
        location,
        type,
        role,
        bio
    };
};
