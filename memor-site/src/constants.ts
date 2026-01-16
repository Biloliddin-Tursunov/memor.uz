

import { NavItem, PageRoute, Article, VideoResource, Book, Creator, EventItem, Project, CreationItem, PortfolioItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'ilm',
    roman: 'I',
    label: 'ILM',
    subLabel: '(KNOWLEDGE)',
    route: PageRoute.KNOWLEDGE,
  },
  {
    id: 'harakat',
    roman: 'II',
    label: 'HARAKAT',
    subLabel: '(ACTION)',
    route: PageRoute.ACTION,
  },
  {
    id: 'ijod',
    roman: 'III',
    label: 'IJOD',
    subLabel: '(CREATION)',
    route: PageRoute.CREATION,
  },
];

// --- ILM DATA ---
export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: "Gumbazlar Geometriyasi",
    excerpt: "Temuriylar davri me'morchiligida gumbazlarning matematik hisob-kitoblari va akustik sirlari.",
    author: "Prof. A. Zohidov",
    date: "12 Oktabr, 2024",
    category: "Nazariya",
    imageUrl: "https://picsum.photos/800/600?grayscale"
  },
  {
    id: 'a2',
    title: "Ganchkorlik San'ati",
    excerpt: "Buxoro va Xiva maktablari o'rtasidagi uslubiy farqlar va o'xshashliklar.",
    author: "Usta B. Qodirov",
    date: "05 Noyabr, 2024",
    category: "Hunarmandchilik",
    imageUrl: "https://picsum.photos/800/601?grayscale"
  }
];

export const MOCK_VIDEOS: VideoResource[] = [
  {
    id: 'v1',
    title: "Muqarnas Yasash Texnikasi",
    duration: "14:20",
    thumbnailUrl: "https://picsum.photos/600/400?grayscale&blur=2",
    author: "Usta Olim",
    type: "Darslik"
  },
  {
    id: 'v2',
    title: "Samarqand Sirli Tarixi",
    duration: "45:00",
    thumbnailUrl: "https://picsum.photos/600/401?grayscale&blur=2",
    author: "Me'mor TV",
    type: "Hujjatli"
  }
];

export const MOCK_BOOKS: Book[] = [
  {
    id: 'b1',
    title: "O'rta Osiyo Me'morchiligi",
    author: "G. Pugachenkova",
    year: "1968",
    coverUrl: "https://picsum.photos/300/450?grayscale",
    description: "Klassik asar, me'morchilik tarixi bo'yicha fundamental qo'llanma."
  },
  {
    id: 'b2',
    title: "Naqshlar Tilga Kirganda",
    author: "A. Hakimov",
    year: "2020",
    coverUrl: "https://picsum.photos/300/451?grayscale",
    description: "Islom san'atidagi geometrik va islimiy naqshlarning falsafiy ma'nolari."
  }
];

export const MOCK_CREATORS: Creator[] = [
  {
    id: 'c1',
    name: "Usta Shirin Murodov",
    role: "Me'mor",
    avatarUrl: "https://picsum.photos/200/200?grayscale",
    bio: "Buxoro me'morchilik maktabining yorqin namoyandasi."
  },
  {
    id: 'c2',
    name: "Mahmud Kulol",
    role: "Kulol",
    avatarUrl: "https://picsum.photos/200/201?grayscale",
    bio: "Moviy koshinlar siri va sirli texnologiyalar ustasi."
  }
];

// --- HARAKAT DATA ---
export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: "Registon Forumi 2025",
    date: "20 Mart, 2025",
    location: "Samarqand, Registon Maydoni",
    description: "Xalqaro me'morlar va restavratorlar anjumani.",
    isUpcoming: true
  },
  {
    id: 'e2',
    title: "Loydan San'atgacha",
    date: "15 Aprel, 2025",
    location: "Toshkent, Badiiy Akademiya",
    description: "Yosh kulollar ko'rgazmasi va mahorat darslari.",
    isUpcoming: true
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "Eski Shahar Regeneratsiyasi",
    status: "Jarayonda",
    description: "Toshkent eski shahar qismini tarixiy muhitni saqlagan holda zamonaviylashtirish.",
    imageUrl: "https://picsum.photos/800/500?grayscale",
    location: "Toshkent"
  },
  {
    id: 'p2',
    title: "Bibixonim Restavratsiyasi",
    status: "Rejada",
    description: "Kirish peshtoqidagi koshinlarni qayta tiklash loyihasi.",
    imageUrl: "https://picsum.photos/800/501?grayscale",
    location: "Samarqand"
  }
];

// --- IJOD DATA ---
export const MOCK_CREATIONS: CreationItem[] = [
  {
    id: 'cr1',
    title: "Islimiy #42",
    author: "Davron Art",
    type: "Vector",
    imageUrl: "https://picsum.photos/500/500?grayscale",
    description: "Masjid devorlari uchun mo'ljallangan yuqori sifatli vektor naqsh.",
    downloadUrl: "#"
  },
  {
    id: 'cr2',
    title: "Kelajak Kutubxonasi",
    author: "Studio 101",
    type: "Concept",
    imageUrl: "https://picsum.photos/500/501?grayscale",
    description: "An'anaviy gumbaz elementlaridan foydalanilgan zamonaviy kutubxona konsepsiyasi."
  },
  {
    id: 'cr3',
    title: "Sukunat",
    author: "Malika Chiziqlari",
    type: "Artwork",
    imageUrl: "https://picsum.photos/500/502?grayscale",
    description: "Xiva ko'chalaridagi tush payti tasvirlangan raqamli asar."
  }
];

// --- PORTFOLIO DATA ---
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'pf1',
    title: "Chor Minor Etudlari",
    imageUrl: "https://picsum.photos/600/400?grayscale",
    year: "2023",
    architect: "Usta Alisher",
    type: "Eskiz"
  },
  {
    id: 'pf2',
    title: "Xiva Darvozalari",
    imageUrl: "https://picsum.photos/600/401?grayscale",
    year: "2024",
    architect: "Usta Alisher",
    type: "Restavratsiya"
  },
  {
    id: 'pf3',
    title: "Gumbaz Sirlari",
    imageUrl: "https://picsum.photos/600/402?grayscale",
    year: "2024",
    architect: "Shogird Bekzod",
    type: "Foto"
  }
];
