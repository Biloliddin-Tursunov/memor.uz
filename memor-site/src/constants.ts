
import { NavItem, PageRoute, Article, VideoResource, Book, Creator, EventItem, Project, CreationItem, PortfolioItem } from './types';

export const HADITH_DATA = {
  arabic: "وَعَنْ أَبِي الدَّرْدَاءِ رضي اللَّه عنهُ قَالَ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: «مَنْ سَلَكَ طَرِيقًا يَبْتَغِي فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ وَإِنَّ الْمَلَائِكَةَ لَتَضَعُ أَجْنِحَتَهَا لِطَالِبِ الْعِلْمِ رِضًى بِمَا يَصْنَعُ ، وَإِنَّ الْعَالِمَ لَيَسْتَغْفِرُ لَهُ مَنْ فِي السَّمَاوَاتِ وَمَنْ فِي الْأَرْضِ حَتَّى الْحِيتَانُ فِي الْمَاءِ وَفَضْلُ الْعَالِمِ عَلَى الْعَابِدِ كَفَضْلِ الْقَمَرِ عَلَى سَائِرِ الْكَوَاكِبِ وَإِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ وَإِنَّ الْأَنْبِيَاءَ لَمْ يُوَرِّثُوا دِينَارًا وَلَا دِرْهَمًا وَإِنَّمَا وَرَّثُوا الْعِلْمَ فَمَنْ أَخَذَهُ أَخَذَ بِحَظٍّ وَافِرٍ»",
  uzbekShort: "“Kim ilm izlab yo‘lga tushsa, Alloh Taolo unga Jannat yo‘lini oson qiladi;”",
  uzbekFull: "“Agar kimdir ilm olish istagi bilan yo'lga chiqsa, Alloh unga jannat yo'lini osonlashtiradi. Darhaqiqat, farishtalar ilm izlovchining qilyotgan ishidan mamnun bo'lib, qanotlarini yoyadilar. Osmon va yerdagilar, hatto suvdagi baliqlar ham Allohdan olim uchun mag'firat so'rashadi. Olimning ibodat qiluvchidan ustunligi oyning boshqa yulduzlardan ustunligiga o'xshaydi. Albatta, olimlar payg'ambarlarning merosxo'rlaridir. Payg'ambarlar oltin va kumushni meros qilib qoldirmaydilar; ular faqat ilmni qoldiradilar. Kimki bu merosni olsa, mo'l-ko'l baraka va omadga ega bo'ladi.”",
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
  
 
];

export const MOCK_NEWS_DATA: Article[] = [

 
];

export const MOCK_VIDEOS: VideoResource[] = [
  
];

export const MOCK_PROJECTS: Project[] = [
  
];

export const MOCK_CREATIONS: CreationItem[] = [
 
];

export const MOCK_BOOKS: Book[] = [
 
];

export const MOCK_CREATORS: Creator[] = [
  
];

export const MOCK_EVENTS: EventItem[] = [
 
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
