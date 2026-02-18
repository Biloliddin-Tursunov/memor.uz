export interface Project {
  id: number | string;
  title: string;
  category: 'Architecture' | 'Urban Planning' | 'Coding';
  description: string;
  imageUrl: string;
  visible: boolean;
  year?: string;
}

export interface BlogPost {
  id: string | number;
  title?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  readTime?: string;
  category?: string;
  imageUrl?: string;
  telegramUrl?: string; // Optional field for Telegram posts
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type PageView = 'home' | 'blog' | 'projects' | 'about' | 'contact' | { type: 'post', id: string | number };
