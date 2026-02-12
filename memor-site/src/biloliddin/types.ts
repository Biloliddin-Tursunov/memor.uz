export interface Project {
  id: number;
  title: string;
  category: 'Architecture' | 'Urban Planning' | 'Code';
  description: string;
  imageUrl: string;
  visible: boolean;
  year?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown content
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type PageView = 'home' | 'blog' | 'projects' | 'about' | 'contact' | { type: 'post', id: string };
