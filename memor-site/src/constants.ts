
import { NavItem, PageRoute, Article, VideoResource, Book, Creator, EventItem, Project, CreationItem, PortfolioItem, Language } from './types';

export const TRANSLATIONS = {
  uz: {
    ilm: 'ILM',
    harakat: 'HARAKAT',
    ijod: 'IJOD',
    about: 'Biz Haqimizda',
    news: 'Yangiliklar',
    support: 'Homiylik',
    contact: 'Aloqa',
    search: 'Qidiruv',
    socials: 'Ijtimoiy Tarmoqlar',
    menu: 'Menyu',
    settings: 'Sozlamalar',
    language: 'Til',
    theme: 'Mavzu',
    themeDark: 'Tun',
    themeLight: 'Kun',
    readMore: "Batafsil ko'rish",
    download: 'Yuklab Olish',
    view: "Ko'rish",
    upcoming: 'Yaqin Tadbir',
    project: 'Loyiha',
    footerLinks: 'Tezkor Havolalar',
    copyright: "© 2025 Me'mor Loyihasi. Barcha huquqlar himoyalangan."
  },
  en: {
    ilm: 'KNOWLEDGE',
    harakat: 'ACTION',
    ijod: 'CREATION',
    about: 'About Us',
    news: 'News',
    support: 'Support',
    contact: 'Contact',
    search: 'Search',
    socials: 'Social Media',
    menu: 'Menu',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    readMore: 'Read More',
    download: 'Download',
    view: 'View',
    upcoming: 'Upcoming',
    project: 'Project',
    footerLinks: 'Quick Links',
    copyright: "© 2025 Me'mor Project. All Rights Reserved."
  },
  ru: {
    ilm: 'ЗНАНИЕ',
    harakat: 'ДЕЙСТВИЕ',
    ijod: 'ТВОРЧЕСТВО',
    about: 'О Нас',
    news: 'Новости',
    support: 'Поддержка',
    contact: 'Контакты',
    search: 'Поиск',
    socials: 'Социальные сети',
    menu: 'Меню',
    settings: 'Настройки',
    language: 'Язык',
    theme: 'Тема',
    themeDark: 'Темная',
    themeLight: 'Светлая',
    readMore: 'Подробнее',
    download: 'Скачать',
    view: 'Смотреть',
    upcoming: 'Событие',
    project: 'Проект',
    footerLinks: 'Ссылки',
    copyright: "© 2025 Проект Me'mor. Все права защищены."
  },
  tr: {
    ilm: 'İLİM',
    harakat: 'HAREKET',
    ijod: 'İCAD',
    about: 'Hakkımızda',
    news: 'Haberler',
    support: 'Destek',
    contact: 'İletişim',
    search: 'Ara',
    socials: 'Sosyal Medya',
    menu: 'Menü',
    settings: 'Ayarlar',
    language: 'Dil',
    theme: 'Tema',
    themeDark: 'Koyu',
    themeLight: 'Açık',
    readMore: 'Daha Fazla',
    download: 'İndir',
    view: 'Görüntüle',
    upcoming: 'Yaklaşan',
    project: 'Proje',
    footerLinks: 'Hızlı Bağlantılar',
    copyright: "© 2025 Me'mor Projesi. Tüm hakları saklıdır."
  }
};

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

// --- TEAM MEMBERS ---
export const TEAM_MEMBERS = [
  {
    name: 'Otabek',
    role: 'Loyiha Asoschisi',
    image: 'https://memor.uz/people/otabek.jpg'
  },
  {
    name: 'Bunyod',
    role: 'Grafik Dizayner',
    image: 'https://memor.uz/people/bunyod.png'
  },
  {
    name: 'Biloliddin',
    role: 'Dasturchi',
    image: 'https://memor.uz/people/biloliddin.jpg'
  },
  {
    name: 'Zuhra',
    role: 'Dizayner',
    image: 'https://memor.uz/people/zuhra.png'
  },
  {
    name: 'Aminaxon',
    role: 'Kontent Menejeri',
    image: 'https://memor.uz/people/aminaxon.jpg'
  }
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
