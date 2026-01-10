import { Team, Task } from './types';

export const ADMIN_USER = {
  email: "biloliddin@memor.uz",
  password: "12345"
};

export const TEAMS: Team[] = [
 
  {
    id: "architects",
    name: "Loyihachilar",
    description: `Vazifasi:
➥ Loyiha tanlovlarida qatnashish;
➥ Buyurtmalar ustida ishlash;
➥ Vizualizatsiya

Kimlar ishlaydi:
- Dizaynerlar
   ➥ Inteyrer;
   ➥ Exteryer;
   ➥ Landshaft;
- Me'morlar;
- Muhandislar;
- Shaharsozlar;`
  },
   {
    id: "translators",
    name: "Tarjimonlar",
    description: `Vazifasi: — Tarjima qilish:
➥ Kitob;
➥ Maqola;
➥ Video

Kimlar ishlaydi:
- Til biluvchilar;
- Yorib tashediganlar;
- Muharrirlar;
(Ingliz, Turk, Rus va boshqa tillar bo'yicha)`
  },
  {
    id: "media",
    name: "Media production",
    description: `Vazifasi:
➥Kontent (video/rasm)
➥Dizayn
➥Social Media Marketing

Kimlar ishlaydi:
- Dizaynerlar;
- SMM mutaxassislar;
- Content Creatorlar:
   ➥Content Manager
   ➥Senarist;
   ➥Storyteller;
   ➥Operator;
   ➥Dublyaj`
  },
  {
    id: "artwork",
    name: "Artwork",
    description: `Vazifasi:
➥Erkin ijod;
➥Ko'rgazma;
➥Hunarmandchilik namunalarini yasash.

Kimlar ishlaydi:
- Ijodkorlar;
   ➥Naqqoshlar
   ➥Izonit
   ➥So'zana (kashta)
   ➥ Miniatura va hk.
- Hobbisi ko'plar`
  },
  
  {
    id: "students",
    name: "Student Community",
    description: `Vazifasi:
➥Mutaxassislar bilan suhbat;
➥Taqdimotlar;
➥Fikr almashish;
➥Iqtidorli kadrlarni shakllantirish/kashf etish;

Kimlar ishlaydi:
- Rejalashtiruvchi;
- Olib boruvchi;
- Mutaxassislar va barcha talabalar.`
  },
  {
    id: "software",
    name: "Software",
    description: `Vazifasi:
- Website
   ➥Main site;
   ➥Task manager;
   ➥Admin panel;
   ➥Back-end | Database;

Kimlar bo'ladi:
- Front-end developer;
- Back-end developer;
- UI/UX Dizayner;`
  }
];

export const INITIAL_TASKS: Task[] = [
  // Translators tasks
  {
    id: 't1',
    teamId: 'translators',
    title: 'Atomic Habits Book',
    description: 'Translate Chapter 4-5 to Uzbek. Tone must be academic but accessible.',
    type: 'Kitob',
    status: 'Doing',
    startDate: '2023-11-01',
    deadline: '2023-11-10',
    resourceLink: 'https://drive.google.com'
  },
  {
    id: 't2',
    teamId: 'translators',
    title: 'AI Tech Article',
    description: 'Translate the latest OpenAI blog post for the channel.',
    type: 'Maqola',
    status: 'To Do',
    startDate: '2023-11-05',
    deadline: '2023-11-06',
    resourceLink: ''
  },
  {
    id: 't3',
    teamId: 'translators',
    title: 'Sapiens kitobidan 2-bob',
    description: 'Yuval Noah Harari ning "Sapiens" kitobidan 2-bobni tarjima qilish. Ilmiy uslubda.',
    type: 'Kitob',
    status: 'Done',
    startDate: '2023-10-15',
    deadline: '2023-10-30',
    resourceLink: 'https://drive.google.com/sapiens'
  },
  {
    id: 't4',
    teamId: 'translators',
    title: 'MIT tadqiqot maqolasi',
    description: 'Kvant kompyuterlari haqidagi MIT maqolasini o\'zbek tiliga o\'girish.',
    type: 'Maqola',
    status: 'To Do',
    startDate: '2023-11-08',
    deadline: '2023-11-12',
    resourceLink: 'https://mit.edu/quantum'
  },
  {
    id: 't5',
    teamId: 'translators',
    title: 'TED Talk Video',
    description: 'Simon Sinek ning "Start with Why" videosiga subtitr va dublyaj tayyorlash.',
    type: 'Video',
    status: 'Doing',
    startDate: '2023-11-03',
    deadline: '2023-11-14',
    resourceLink: 'https://youtube.com/ted'
  },
  {
    id: 't6',
    teamId: 'translators',
    title: 'Clean Code kitobidan bo\'lim',
    description: 'Robert Martin ning "Clean Code" kitobidan 3 va 4-boblarni tarjima qilish.',
    type: 'Kitob',
    status: 'To Do',
    startDate: '2023-11-10',
    deadline: '2023-11-25',
    resourceLink: ''
  },
  {
    id: 't7',
    teamId: 'translators',
    title: 'Harvard Business Review maqola',
    description: 'Liderlik va menejmenet haqidagi maqolani tarjima qilish.',
    type: 'Maqola',
    status: 'Done',
    startDate: '2023-10-20',
    deadline: '2023-10-27',
    resourceLink: 'https://hbr.org/leadership'
  },
  {
    id: 't8',
    teamId: 'translators',
    title: 'National Geographic hujjatli film',
    description: 'Tabiat haqidagi 45 daqiqalik hujjatli filmga subtitr.',
    type: 'Video',
    status: 'Doing',
    startDate: '2023-11-02',
    deadline: '2023-11-20',
    resourceLink: ''
  },

  // Architects tasks
  {
    id: 't9',
    teamId: 'architects',
    title: 'Green City Park',
    description: 'Render high-quality visualization for the central fountain area.',
    type: 'Vizualizatsiya',
    status: 'Doing',
    startDate: '2023-10-25',
    deadline: '2023-11-15',
    resourceLink: ''
  },
  {
    id: 't10',
    teamId: 'architects',
    title: 'Villa Concept',
    description: 'Initial sketches for the hillside client.',
    type: 'Loyiha',
    status: 'Done',
    startDate: '2023-10-20',
    deadline: '2023-10-28',
    resourceLink: ''
  },
  {
    id: 't11',
    teamId: 'architects',
    title: 'Toshkent City Mall',
    description: 'Savdo markazi uchun interyer dizayni va 3D vizualizatsiya tayyorlash.',
    type: 'Vizualizatsiya',
    status: 'To Do',
    startDate: '2023-11-07',
    deadline: '2023-11-30',
    resourceLink: 'https://figma.com/mall-project'
  },
  {
    id: 't12',
    teamId: 'architects',
    title: 'Bog\'li uy loyihasi',
    description: 'Zamonaviy uslubda 2 qavatli bog\'li uy loyihasini tayyorlash.',
    type: 'Loyiha',
    status: 'Doing',
    startDate: '2023-10-28',
    deadline: '2023-11-18',
    resourceLink: ''
  },
  {
    id: 't13',
    teamId: 'architects',
    title: 'Bolalar bog\'chasi landshaft',
    description: 'Yangi qurilayotgan bolalar bog\'chasi uchun landshaft dizayni.',
    type: 'Loyiha',
    status: 'To Do',
    startDate: '2023-11-12',
    deadline: '2023-11-28',
    resourceLink: ''
  },
  {
    id: 't14',
    teamId: 'architects',
    title: 'Biznes markaz eksteryeri',
    description: 'Milliy uslubdagi biznes markaz tashqi ko\'rinishini loyihalash.',
    type: 'Vizualizatsiya',
    status: 'Done',
    startDate: '2023-10-10',
    deadline: '2023-10-25',
    resourceLink: 'https://drive.google.com/business-center'
  },
  {
    id: 't15',
    teamId: 'architects',
    title: 'Restoran interyer',
    description: 'Milliy taomlar restorani uchun zamonaviy interyer dizayni.',
    type: 'Vizualizatsiya',
    status: 'Doing',
    startDate: '2023-11-01',
    deadline: '2023-11-22',
    resourceLink: ''
  },
  {
    id: 't16',
    teamId: 'architects',
    title: 'Xalqaro tanlov loyihasi',
    description: 'Ekologik binolar xalqaro tanloviga ariza tayyorlash.',
    type: 'Loyiha',
    status: 'To Do',
    startDate: '2023-11-15',
    deadline: '2023-12-01',
    resourceLink: 'https://competition.org'
  },

  // Artwork tasks
  {
    id: 't17',
    teamId: 'artwork',
    title: 'Miniatura kolleksiyasi',
    description: 'O\'zbek adabiyoti mavzusida 10 ta miniatura rasm yaratish.',
    type: 'Miniatura',
    status: 'Doing',
    startDate: '2023-10-20',
    deadline: '2023-11-25',
    resourceLink: ''
  },
  {
    id: 't18',
    teamId: 'artwork',
    title: 'Naqqoshlik panno',
    description: 'Registon maydoni uchun 2x3 metrlik naqqoshlik panno tayyorlash.',
    type: 'Naqqoshlik',
    status: 'To Do',
    startDate: '2023-11-10',
    deadline: '2023-12-05',
    resourceLink: ''
  },
  {
    id: 't19',
    teamId: 'artwork',
    title: 'Kashta ko\'rgazmasi',
    description: '30 dona kashta (so\'zana) mahsulotini ko\'rgazma uchun tayyorlash.',
    type: 'So\'zana',
    status: 'Doing',
    startDate: '2023-10-25',
    deadline: '2023-11-20',
    resourceLink: 'https://photos.google.com/exhibition'
  },
  {
    id: 't20',
    teamId: 'artwork',
    title: 'Kulolchilik mahsulotlari',
    description: 'An\'anaviy o\'zbek kulolchilik uslubida idishlar yasash.',
    type: 'Hunarmandchilik',
    status: 'Done',
    startDate: '2023-10-01',
    deadline: '2023-10-30',
    resourceLink: ''
  },
  {
    id: 't21',
    teamId: 'artwork',
    title: 'Zamonaviy izonit',
    description: 'Zamonaviy motiflarda izonit san\'ati asarlari yaratish.',
    type: 'Izonit',
    status: 'To Do',
    startDate: '2023-11-12',
    deadline: '2023-11-30',
    resourceLink: ''
  },
  {
    id: 't22',
    teamId: 'artwork',
    title: 'Milliy liboslar eskizi',
    description: 'Navro\'z bayrami uchun milliy liboslar eskizlarini chizish.',
    type: 'Dizayn',
    status: 'Doing',
    startDate: '2023-11-05',
    deadline: '2023-11-18',
    resourceLink: ''
  },
  {
    id: 't23',
    teamId: 'artwork',
    title: 'Qo\'lyozma kitob',
    description: 'Alisher Navoiy she\'rlarini qo\'lyozma shaklida chiroyli yozish.',
    type: 'Kaligrafiya',
    status: 'To Do',
    startDate: '2023-11-20',
    deadline: '2023-12-15',
    resourceLink: ''
  },
  {
    id: 't24',
    teamId: 'artwork',
    title: 'Bog\'li uylar kolleksiyasi',
    description: 'O\'zbek bog\'li uylari mavzusida akvarelda rasmlar chizish.',
    type: 'Rasm',
    status: 'Done',
    startDate: '2023-10-05',
    deadline: '2023-10-28',
    resourceLink: 'https://portfolio.art/collection'
  },

  // Media production tasks
  {
    id: 't25',
    teamId: 'media',
    title: 'Instagram reels seriyasi',
    description: 'Startup madaniyati haqida 10 ta qisqa video tayyorlash.',
    type: 'Video',
    status: 'Doing',
    startDate: '2023-11-01',
    deadline: '2023-11-15',
    resourceLink: ''
  },
  {
    id: 't26',
    teamId: 'media',
    title: 'Brending paketi',
    description: 'Yangi loyiha uchun logo, banner, biznes karta dizayni.',
    type: 'Dizayn',
    status: 'To Do',
    startDate: '2023-11-08',
    deadline: '2023-11-20',
    resourceLink: 'https://figma.com/branding'
  },
  {
    id: 't27',
    teamId: 'media',
    title: 'YouTube kanal oformleniyasi',
    description: 'Ta\'lim kanalimiz uchun banner, thumbnail shablonlari yaratish.',
    type: 'Dizayn',
    status: 'Done',
    startDate: '2023-10-20',
    deadline: '2023-10-31',
    resourceLink: ''
  },
  {
    id: 't28',
    teamId: 'media',
    title: 'Mahsulot fotosessiyasi',
    description: 'Yangi mahsulotlar uchun professional fotosessiya va retush.',
    type: 'Rasm',
    status: 'Doing',
    startDate: '2023-11-03',
    deadline: '2023-11-12',
    resourceLink: ''
  },
  {
    id: 't29',
    teamId: 'media',
    title: 'SMM kontent rejasi',
    description: 'Noyabr oyi uchun ijtimoiy tarmoqlar kontent-rejasi tayyorlash.',
    type: 'SMM',
    status: 'Done',
    startDate: '2023-10-25',
    deadline: '2023-10-30',
    resourceLink: 'https://docs.google.com/content-plan'
  },
  {
    id: 't30',
    teamId: 'media',
    title: 'Podcast ssenariylari',
    description: '4 ta podcast epizodi uchun senariy va storyline yaratish.',
    type: 'Senariy',
    status: 'To Do',
    startDate: '2023-11-10',
    deadline: '2023-11-25',
    resourceLink: ''
  },
  {
    id: 't31',
    teamId: 'media',
    title: 'Reklama videosi',
    description: '30 soniyalik reklama videosi uchun operator va montaj.',
    type: 'Video',
    status: 'Doing',
    startDate: '2023-11-05',
    deadline: '2023-11-18',
    resourceLink: ''
  },
  {
    id: 't32',
    teamId: 'media',
    title: 'Infografika seriyasi',
    description: 'Statistik ma\'lumotlarni vizual infografikalarda aks ettirish.',
    type: 'Dizayn',
    status: 'To Do',
    startDate: '2023-11-12',
    deadline: '2023-11-22',
    resourceLink: ''
  },

  // Student Community tasks
  {
    id: 't33',
    teamId: 'students',
    title: 'IT mutaxassis bilan suhbat',
    description: 'Google da ishlaydigan o\'zbek dasturchiga intervyu tayyorlash va o\'tkazish.',
    type: 'Intervyu',
    status: 'Doing',
    startDate: '2023-11-01',
    deadline: '2023-11-10',
    resourceLink: ''
  },
  {
    id: 't34',
    teamId: 'students',
    title: 'Dizayn Thinking workshop',
    description: 'Talabalar uchun dizayn thinking bo\'yicha amaliy mashg\'ulot.',
    type: 'Workshop',
    status: 'To Do',
    startDate: '2023-11-15',
    deadline: '2023-11-15',
    resourceLink: 'https://zoom.us/workshop'
  },
  {
    id: 't35',
    teamId: 'students',
    title: 'Karyera yo\'nalishlari',
    description: 'Turli sohalar bo\'yicha karyera imkoniyatlari taqdimoti.',
    type: 'Taqdimot',
    status: 'Done',
    startDate: '2023-10-25',
    deadline: '2023-10-25',
    resourceLink: ''
  },
  {
    id: 't36',
    teamId: 'students',
    title: 'Startup g\'oyalar tanlovi',
    description: 'Talabalar startup g\'oyalarini taqdim etish va baholash.',
    type: 'Tanlov',
    status: 'Doing',
    startDate: '2023-11-03',
    deadline: '2023-11-20',
    resourceLink: ''
  },
  {
    id: 't37',
    teamId: 'students',
    title: 'Me\'mor bilan suhbat',
    description: 'Taniqli me\'mor bilan jonli suhbat va savol-javob.',
    type: 'Intervyu',
    status: 'To Do',
    startDate: '2023-11-18',
    deadline: '2023-11-18',
    resourceLink: ''
  },
  {
    id: 't38',
    teamId: 'students',
    title: 'Portfolio yaratish masterclass',
    description: 'Professional portfolio qanday yaratish bo\'yicha amaliy dars.',
    type: 'Masterclass',
    status: 'Done',
    startDate: '2023-10-28',
    deadline: '2023-10-28',
    resourceLink: 'https://youtube.com/masterclass'
  },
  {
    id: 't39',
    teamId: 'students',
    title: 'Mentorlik dasturi',
    description: 'Yangi talabalar uchun mentorlik dasturini tashkil etish.',
    type: 'Dastur',
    status: 'Doing',
    startDate: '2023-11-01',
    deadline: '2023-11-30',
    resourceLink: ''
  },
  {
    id: 't40',
    teamId: 'students',
    title: 'Tadbirkorlik seminar',
    description: 'Muvaffaqiyatli tadbirkor bilan suhbat va networking.',
    type: 'Seminar',
    status: 'To Do',
    startDate: '2023-11-22',
    deadline: '2023-11-22',
    resourceLink: ''
  },

  // Software tasks
  {
    id: 't41',
    teamId: 'software',
    title: 'Main website redesign',
    description: 'Asosiy veb-saytning UI/UX dizaynini yangilash va zamonaviylashtrish.',
    type: 'UI/UX',
    status: 'Doing',
    startDate: '2023-10-25',
    deadline: '2023-11-20',
    resourceLink: 'https://figma.com/main-site'
  },
  {
    id: 't42',
    teamId: 'software',
    title: 'Task Manager API',
    description: 'Task manager uchun RESTful API yaratish va hujjatlash.',
    type: 'Backend',
    status: 'Doing',
    startDate: '2023-11-01',
    deadline: '2023-11-25',
    resourceLink: ''
  },
  {
    id: 't43',
    teamId: 'software',
    title: 'Admin panel development',
    description: 'Foydalanuvchilar va vazifalarni boshqarish uchun admin panel.',
    type: 'Frontend',
    status: 'To Do',
    startDate: '2023-11-10',
    deadline: '2023-12-05',
    resourceLink: ''
  },
  {
    id: 't44',
    teamId: 'software',
    title: 'Database optimization',
    description: 'Ma\'lumotlar bazasi tuzilmasini optimallashtirish va indekslash.',
    type: 'Database',
    status: 'Done',
    startDate: '2023-10-15',
    deadline: '2023-10-30',
    resourceLink: ''
  },
  {
    id: 't45',
    teamId: 'software',
    title: 'Mobile responsive',
    description: 'Barcha sahifalarni mobil qurilmalar uchun moslashtrish.',
    type: 'Frontend',
    status: 'Doing',
    startDate: '2023-11-03',
    deadline: '2023-11-22',
    resourceLink: ''
  },
  {
    id: 't46',
    teamId: 'software',
    title: 'Authentication system',
    description: 'JWT asosida xavfsiz autentifikatsiya tizimini joriy etish.',
    type: 'Backend',
    status: 'Done',
    startDate: '2023-10-20',
    deadline: '2023-11-05',
    resourceLink: 'https://github.com/auth-system'
  },
  {
    id: 't47',
    teamId: 'software',
    title: 'Team dashboard UI',
    description: 'Jamoalar uchun interaktiv dashboard interfeysi dizayni.',
    type: 'UI/UX',
    status: 'To Do',
    startDate: '2023-11-15',
    deadline: '2023-11-28',
    resourceLink: ''
  },
  {
    id: 't48',
    teamId: 'software',
    title: 'Real-time notifications',
    description: 'WebSocket orqali real-time bildirishnomalar tizimi.',
    type: 'Backend',
    status: 'Doing',
    startDate: '2023-11-08',
    deadline: '2023-11-30',
    resourceLink: ''
  },
  {
    id: 't49',
    teamId: 'software',
    title: 'File upload service',
    description: 'Fayllarni yuklash va saqlash uchun cloud servis integratsiyasi.',
    type: 'Backend',
    status: 'To Do',
    startDate: '2023-11-12',
    deadline: '2023-11-26',
    resourceLink: ''
  },
  {
    id: 't50',
    teamId: 'software',
    title: 'Performance testing',
    description: 'Ilovaning ishlash tezligi va yukni sinash, optimallashtrish.',
    type: 'Testing',
    status: 'To Do',
    startDate: '2023-11-20',
    deadline: '2023-12-10',
    resourceLink: ''
  }
];