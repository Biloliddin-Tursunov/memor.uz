

export enum PageRoute {
  HOME = 'HOME',
  KNOWLEDGE = 'KNOWLEDGE', // Ilm
  ACTION = 'ACTION',       // Harakat
  CREATION = 'CREATION',   // Ijod
  LOGIN = 'LOGIN',
  ABOUT = 'ABOUT',
  SUPPORT = 'SUPPORT',
  CONTACT = 'CONTACT',
  NEWS = 'NEWS'
}

export interface NavItem {
  id: string;
  roman: string;
  label: string;
  subLabel: string; 
  route: PageRoute;
}

// --- KNOWLEDGE (ILM) ---
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  content?: string;
}

export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  thumbnailUrl: string;
  author: string;
  type: 'Darslik' | 'Hujjatli' | 'Suhbat';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  coverUrl: string;
  description: string;
}

export interface Creator {
  id: string;
  name: string;
  role: 'Me\'mor' | 'Hattot' | 'Naqshband' | 'Kulol';
  avatarUrl: string;
  bio: string;
}

// --- ACTION (HARAKAT) ---
export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  isUpcoming: boolean;
}

export interface Project {
  id: string;
  title: string;
  status: 'Jarayonda' | 'Yakunlangan' | 'Rejada';
  description: string;
  imageUrl: string;
  location: string;
}

// --- CREATION (IJOD) ---
export interface CreationItem {
  id: string;
  title: string;
  author: string;
  type: 'Vector' | 'Concept' | 'Artwork';
  imageUrl: string;
  description: string;
  downloadUrl?: string; // For vectors
}

// --- PORTFOLIO ---
export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  year: string;
  architect: string;
  type: string;
}
