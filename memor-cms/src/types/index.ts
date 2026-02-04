import React from 'react';

export type Section = 'dashboard' | 'ilm' | 'harakat' | 'ijod' | 'settings' | 'team' | 'editor' | 'messages';

export type IlmTab = 'articles' | 'books' | 'creators';
export type HarakatTab = 'events' | 'missions';

export interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  avatar_url?: string;
  email: string;
  password?: string;
}

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
  author: string;
  date: string;
  category: string;
  status: 'published' | 'draft';
  type: 'article';
  image_url?: string;
  created_by?: string;
  updated_by?: string;
}

export interface Book {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  author: string;
  year?: string;
  cover_url: string;
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_tr?: string;
  download_url?: string;
  type: 'book';
  created_by?: string;
  updated_by?: string;
}

export interface Creator {
  id: string;
  name: string;
  role_uz: string;
  role_en?: string;
  role_ru?: string;
  role_tr?: string;
  avatar_url: string;
  type: 'creator';
  created_by?: string;
  updated_by?: string;
}

export interface Artwork {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  type: string;
  image_url: string;
  author?: string;
  created_by?: string;
  updated_by?: string;
}

export interface Quest {
  id: string;
  title_uz: string;
  title_en?: string;
  title_ru?: string;
  title_tr?: string;
  date: string;
  location_uz: string;
  type: 'event' | 'mission';
  created_by?: string;
  updated_by?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read?: boolean;
}

export interface ContentPlan {
  id: number | string;
  title: string;
  description: string;
  type: 'Article' | 'Video' | 'Post' | 'Book';
  status: 'Idea' | 'In Progress' | 'Review' | 'Ready';
  deadline: string;
  assignee: string;
}