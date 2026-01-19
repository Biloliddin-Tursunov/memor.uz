
import { NavItem, PageRoute, Article, VideoResource, Book, Creator, EventItem, Project, CreationItem, PortfolioItem } from './types';

export const HADITH_DATA = {
  arabic: "وَعَنْ أَبِي الدَّرْدَاءِ رضي اللَّه عنهُ قَالَ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: «مَنْ سَلَكَ طَرِيقًا يَبْتَغِي فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ وَإِنَّ الْمَلَائِكَةَ لَتَضَعُ أَجْنِحَتَهَا لِطَالِبِ الْعِلْمِ رِضًى بِمَا يَصْنَعُ ، وَإِنَّ الْعَالِمَ لَيَسْتَغْفِرُ لَهُ مَنْ فِي السَّمَاوَاتِ وَمَنْ فِي الْأَرْضِ حَتَّى الْحِيتَانُ فِي الْمَاءِ وَفَضْلُ الْعَالِمِ عَلَى الْعَابِدِ كَفَضْلِ الْقَمَرِ عَلَى سَائِرِ الْكَوَاكِبِ وَإِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ وَإِنَّ الْأَنْبِيَاءَ لَمْ يُوَرِّثُوا دِينَارًا وَلَا دِرْهَمًا وَإِنَّمَا وَرَّثُوا الْعِلْمَ فَمَنْ أَخَذَهُ أَخَذَ بِحَظٍّ وَافِرٍ»",
  uzbekShort: "“Kim ilm izlab yo‘lga tushsa, Alloh Taolo unga Jannat yo‘lini oson qiladi;”",
  uzbekFull: "“Kim ilm izlab yo‘lga tushsa, Alloh Taolo unga Jannat yo‘lini oson qiladi; farishtalar ilm izlovchining ustiga – uning qilayotgan ishidan rozi bo‘lib – qanotlarini qo‘yadi. Osmonda hamda yerda, hatto suvdagi baliqlar ilm egasi uchun mag‘firat so‘raydi. Olimning fazilati ibodatkorga nisbatan, Oy to‘la bo‘lgan kechadagi yulduzlarga nisbatan ustun bo‘lgani kabi. Olimlar payg‘ambarlardarvorislari bo‘lib, payg‘ambarlar dinor yoki dirham qoldirmaganlar, faqat ilm meros qilib qoldirganlar. Kim ilmdan tutsa, u katta bahoga ega bo‘ladi.”",
  info: "Ushbu kengaytirilgan hadis bitta alohida hadis emas. U ilmning fazilati haqida kelgan bir necha sahih va hasan hadislar mazmunidan jamlangan.",
  sources: [
    { name: "Sahih Muslim (2699)", detail: "“Kim ilm izlab yo‘lga chiqsa, Alloh unga jannat yo‘lini oson qiladi.”" },
    { name: "Sunan Abu Dovud (3641)", detail: "Ilm talabaga farishtalarning qanot yoyishi, olimlarning payg‘ambarlar vorisi ekani" },
    { name: "Sunan at-Tirmiziy (2646, 2682)", detail: "Ilmning fazilati, mavjudotlarning istig‘fori" },
    { name: "Ibn Moja (223)", detail: "Olim va obid fazilati" }
  ]
};

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
    settings: 'Sozalamalar',
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
  { id: 'ilm', roman: 'I', label: 'ILM', subLabel: '(KNOWLEDGE)', route: PageRoute.KNOWLEDGE },
  { id: 'harakat', roman: 'II', label: 'HARAKAT', subLabel: '(ACTION)', route: PageRoute.ACTION },
  { id: 'ijod', roman: 'III', label: 'IJOD', subLabel: '(CREATION)', route: PageRoute.CREATION },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Samarqandning Unutilgan Minorasi',
    excerpt: 'XIV asrga oid ushbu inshoot o\'zida noyob astronomik sirlarni saqlaydi.',
    author: 'Mirzo Ulug\'bek Vorislari',
    date: '12 Mart, 2025',
    category: 'Tarix',
    imageUrl: 'https://picsum.photos/seed/a1/800/600',
    content: 'Bu minora o\'z davrida nafaqat diniy, balki ilmiy maqsadlarda ham foydalanilgan...'
  },
  {
    id: 'a2',
    title: 'Ganj Naqshlarining Geometriyasi',
    excerpt: 'Islom san\'atidagi matematik qonuniyatlar va ularning me\'morchilikdagi o\'rni.',
    author: 'Usta Ganjiy',
    date: '05 Mart, 2025',
    category: 'San\'at',
    imageUrl: 'https://picsum.photos/seed/c2/800/600'
  }
];

export const MOCK_NEWS_DATA: Article[] = [
  {
    id: 'n1',
    title: "Yangi Me'morchilik Markazi Ochildi",
    excerpt: "Buxoro shahrida an'anaviy hunarmandchilikni o'rgatuvchi yangi markaz o'z faoliyatini boshladi.",
    author: "Me'mor Tahririyati",
    date: "14 Mart, 2025",
    category: "Yangiliklar",
    imageUrl: "https://picsum.photos/seed/n1/800/400"
  },
  {
    id: 'n2',
    title: "Xalqaro Konferensiya Yakunlari",
    excerpt: "Toshkentda o'tkazilgan 'Islom me'morchiligi' konferensiyasida 20 ta davlat vakillari ishtirok etdi.",
    author: "Me'mor Tahririyati",
    date: "10 Mart, 2025",
    category: "Konferensiya",
    imageUrl: "https://picsum.photos/seed/n2/800/400"
  }
];

export const MOCK_VIDEOS: VideoResource[] = [
  {
    id: 'v1',
    title: 'G\'isht Quyish San\'ati',
    duration: '15:40',
    thumbnailUrl: 'https://picsum.photos/seed/v1/400/225',
    author: 'Usta Bahodir',
    type: 'Darslik'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Bibi-Xonim Restavratsiyasi',
    status: 'Jarayonda',
    description: 'Qadimiy devorlarni asl holiga keltirish va mustahkamlash loyihasi.',
    imageUrl: 'https://picsum.photos/seed/p1/800/600',
    location: 'Samarqand'
  }
];

export const MOCK_CREATIONS: CreationItem[] = [
  {
    id: 'c1',
    title: 'Islomiy Arabesk Vektor',
    author: 'Dizayner Aziz',
    type: 'Vector',
    imageUrl: 'https://picsum.photos/seed/c1/600/800',
    description: 'Buxoro masjidlari naqshlari asosida chizilgan zamonaviy vektor.'
  }
];

export const MOCK_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'O\'rta Osiyo Me\'morchiligi',
    author: 'G.A. Pugachenkova',
    year: '1983',
    coverUrl: 'https://picsum.photos/seed/b1/600/900',
    description: 'Movarounnahr me\'morchilik maktabining shakllanishi va rivojlanishi haqidagi fundamental asar.'
  }
];

export const MOCK_CREATORS: Creator[] = [
  {
    id: 'u1',
    name: 'Usta Abdulla',
    role: 'Naqshband',
    avatarUrl: 'https://picsum.photos/seed/u1/400/400',
    bio: '40 yillik tajribaga ega naqqosh. Buxoro va Xiva masjidlarini bezashda ishtirok etgan.'
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'An\'anaviy Ganj Seminari',
    date: '25 Aprel, 2025',
    location: 'Samarqand, Lolazor 70',
    description: 'Ganj o\'ymakorligi sirlari va amaliy mashg\'ulotlar.',
    isUpcoming: true
  }
];

export const TEAM_MEMBERS: any[] = [
  { name: 'Otabek', role: 'Loyiha Asoschisi', image: 'https://memor.uz/people/otabek.jpg' },
  { name: 'Bunyod', role: 'Grafik Dizayner', image: 'https://memor.uz/people/bunyod.png' },
  { name: 'Biloliddin', role: 'Dasturchi', image: 'https://memor.uz/people/biloliddin.jpg' },
  { name: 'Zuhra', role: 'Dizayner', image: 'https://memor.uz/people/zuhra.png' },
  { name: 'Jasmina', role: 'Creativ Partner', image: 'https://memor.uz/people/jasmina.png' },
  { name: 'Aminaxon', role: 'Kontent Menejeri', image: 'https://memor.uz/people/aminaxon.png' },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [];

// Data Fetchers
export const findArticle = (id: string) => MOCK_ARTICLES.find(a => a.id === id);
export const findNews = (id: string) => MOCK_NEWS_DATA.find(n => n.id === id);
export const findProject = (id: string) => MOCK_PROJECTS.find(p => p.id === id);
export const findVideo = (id: string) => MOCK_VIDEOS.find(v => v.id === id);
export const findCreation = (id: string) => MOCK_CREATIONS.find(c => c.id === id);
export const findBook = (id: string) => MOCK_BOOKS.find(b => b.id === id);
export const findCreator = (id: string) => MOCK_CREATORS.find(u => u.id === id);
export const findEvent = (id: string) => MOCK_EVENTS.find(e => e.id === id);
