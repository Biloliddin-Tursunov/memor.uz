
export type Language = 'uz' | 'en' | 'ru' | 'tr';

export enum PageRoute {
  HOME = 'HOME',
  KNOWLEDGE = 'KNOWLEDGE',
  ACTION = 'ACTION',
  CREATION = 'CREATION',
  LOGIN = 'LOGIN',
  ABOUT = 'ABOUT',
  SUPPORT = 'SUPPORT',
  CONTACT = 'CONTACT',
  NEWS = 'NEWS',
  SEARCH = 'SEARCH',
  DETAIL = 'DETAIL'
}

export interface NavItem {
  id: string;
  roman: string;
  label: string;
  subLabel: string;
  route: PageRoute;
}

// Common Interface for Display (Aggregated)
export interface DisplayItem {
  id: string;
  title?: string;
  title_uz?: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  subtitle?: string;
  description?: string;
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_tr?: string;
  imageUrl: string;
  bgUrl?: string;
  type?: string;
  date?: string;
  link?: string;
  tags?: string[];
  slug?: string;
}

// --- KNOWLEDGE (ILM) ---
export interface Article {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  excerpt_uz?: string;
  excerpt_en?: string;
  excerpt_ru?: string;
  excerpt_tr?: string;
  content_uz?: string;
  content_en?: string;
  content_ru?: string;
  content_tr?: string;
  author?: string;
  date?: string; // mapped from created_at
  category?: string;
  imageUrl?: string; // mapped from image_url
  slug?: string;
}

export interface VideoResource {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  duration?: string;
  thumbnailUrl?: string; // mapped from thumbnail_url
  videoUrl?: string; // mapped from video_url
  author?: string;
  type?: 'Darslik' | 'Hujjatli' | 'Suhbat';
}

export interface Book {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  author?: string;
  year?: string;
  coverUrl?: string; // mapped from cover_url
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_tr?: string;
  downloadUrl?: string; // mapped from download_url
}

export interface Creator {
  id: string;
  name: string;
  role_uz?: string;
  role_en?: string;
  role_ru?: string;
  role_tr?: string;
  avatarUrl?: string; // mapped from avatar_url
  bio_uz?: string;
  bio_en?: string;
  bio_ru?: string;
  bio_tr?: string;
}

// --- ACTION (HARAKAT) ---
export interface EventItem {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  date?: string; // mapped
  location_uz?: string;
  location_en?: string;
  location_ru?: string;
  location_tr?: string;
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_tr?: string;
  isUpcoming?: boolean; // mapped from is_upcoming
}

export interface Project {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  status?: 'Jarayonda' | 'Yakunlangan' | 'Rejada';
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_tr?: string;
  imageUrl?: string; // mapped from image_url
  location_uz?: string;
  location_en?: string;
  location_ru?: string;
  location_tr?: string;
}

// --- CREATION (IJOD) ---
export interface CreationItem {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  author?: string;
  type?: 'Vector' | 'Concept' | 'Artwork';
  imageUrl?: string; // mapped from image_url
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_tr?: string;
  downloadUrl?: string; // mapped from download_url
}

// --- PORTFOLIO ---
export interface PortfolioItem {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  imageUrl: string; // mapped from image_url (NOT NULL in schema)
  year?: string;
  architect?: string;
  type_uz?: string;
  type_en?: string;
  type_ru?: string;
  type_tr?: string;
}
