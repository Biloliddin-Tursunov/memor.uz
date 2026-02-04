import { Language } from '../types';

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
