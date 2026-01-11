
import { Team, Task, Member } from './types';

export const ADMIN_USERS = []; // Deprecated, using Member auth

export const TEAMS: Team[] = [
  {
    id: "artwork",
    name: "Artwork",
    description: "desc_artwork"
  },
  {
    id: "architects",
    name: "Loyiha", 
    description: "desc_architects"
  },
  {
    id: "students",
    name: "Club",
    description: "desc_students"
  },
  {
    id: "translators",
    name: "Tarjimonlar",
    description: "desc_translators"
  },
  {
    id: "media",
    name: "Media",
    description: "desc_media"
  },
  {
    id: "software",
    name: "Software",
    description: "desc_software"
  }
];

// Unique IDs for core members to prevent duplicates
const U_BILOLIDDIN = 'u_biloliddin';
const U_OTABEK = 'u_otabek';
const U_BUNYOD = 'u_bunyod';
const U_JASUR = 'u_jasur';
const U_MUSLIM = 'u_muslim';
const U_ZUHRA = 'u_zuhra';
const U_FOTIMA = 'u_fotima';
const U_ALISHER = 'u_alisher';
const U_VOLUNTEERS = 'u_volunteers'; // Single ID for all volunteer groups

export const TEAM_MEMBERS: Record<string, Member[]> = {
  artwork: [
    { id: 'a1', name: 'Aminaxon' },
    { id: U_ZUHRA, name: 'Zuhra' },
    { id: U_FOTIMA, name: 'Fotima' },
    { id: 'a4', name: 'Jasmina' },
    { id: U_VOLUNTEERS, name: 'Volontyorlar', isVolunteer: true },
  ],
  architects: [
    { id: U_OTABEK, name: 'Otabek' },
    { id: U_BILOLIDDIN, name: 'Biloliddin' },
    { id: U_BUNYOD, name: 'Bunyod' },
    { id: U_JASUR, name: 'Jasur' },
    { id: 'ar5', name: 'Javohir' },
    { id: U_MUSLIM, name: 'Muslimbek' }, 
  ],
  students: [
    { id: 's1', name: 'Jaloliddin' },
    { id: U_ALISHER, name: 'Alisher' },
    { id: U_BILOLIDDIN, name: 'Biloliddin' },
    { id: U_BUNYOD, name: 'Bunyod' },
    { id: U_OTABEK, name: 'Otabek' },
    { id: U_VOLUNTEERS, name: 'Volontyorlar', isVolunteer: true },
  ],
  translators: [
    { id: U_ALISHER, name: "Alisher" },
    { id: 't2', name: "Xushnudaxon" },
    { id: U_FOTIMA, name: "Fotima" },
    { id: 't4', name: "Asilbek" },
    { id: 't5', name: "Zilola" },
    { id: U_MUSLIM, name: "Muslimbek" },
    { id: U_VOLUNTEERS, name: "Volontyorlar", isVolunteer: true },
  ],
  media: [
    { id: U_BUNYOD, name: 'Bunyod' },
    { id: U_ZUHRA, name: 'Zuhra' },
    { id: U_BILOLIDDIN, name: 'Biloliddin' },
    { id: U_OTABEK, name: 'Otabek' },
    { id: U_JASUR, name: 'Jasur' },
    { id: U_VOLUNTEERS, name: 'Volontyorlar', isVolunteer: true },
  ],
  software: [
    { id: U_BILOLIDDIN, name: 'Biloliddin' },
    { id: U_MUSLIM, name: 'Muslimbek' },
  ]
};

export const INITIAL_TASKS: Task[] = [
  // --- Artwork ---
  {
    id: 'art1',
    teamId: 'artwork',
    title: 'SESSIYADAN O\'TISH',
    description: 'Imtihonlarni topshirish va akademik qarzlarni yopish.',
    type: 'Muhim',
    priority: "O'ta muhim",
    status: 'To Do',
    startDate: '2025-01-01',
    deadline: '2025-01-15',
    resourceLink: ''
  },
  {
    id: 'art2',
    teamId: 'artwork',
    title: 'Kerakli anjomlar sotib olish',
    description: 'Bo\'yoqlar, mo\'yqalamlar, kanvas va boshqa kerakli xom-ashyolar.',
    type: 'Xarid',
    priority: 'Normal',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'art3',
    teamId: 'artwork',
    title: 'Ishlar uchun namunalar ko\'rib / reja tuzish',
    description: 'Yangi ko\'rgazma uchun referenslar yig\'ish va eskizlar chizish.',
    type: 'Reja',
    priority: 'Normal',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },

  // --- Media ---
  {
    id: 'med1',
    teamId: 'media',
    title: 'SESSIYA',
    description: 'Jamoa a\'zolarining o\'quv jarayonidagi imtihonlari.',
    type: 'Muhim',
    priority: "O'ta muhim",
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'med2',
    teamId: 'media',
    title: 'Kontent reja muhokamasi',
    description: 'Yangi oy uchun media rejasini tuzish va tasdiqlash.',
    type: 'Meeting',
    priority: 'High',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'med3',
    teamId: 'media',
    title: 'Tavsiya',
    description: `desc_media_tavsiya`, // Special key for the complex list
    type: 'Content',
    priority: 'Normal',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },

  // --- Loyiha (Architects) ---
  {
    id: 'arch1',
    teamId: 'architects',
    title: 'SESSIYA',
    description: 'Akademik majburiyatlar.',
    type: 'Muhim',
    priority: "O'ta muhim",
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'arch2',
    teamId: 'architects',
    title: 'Malayziya loyiha tanlovi',
    description: 'Xalqaro tanlov uchun konsept tayyorlash.',
    type: 'Tanlov',
    priority: 'High',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'arch3',
    teamId: 'architects',
    title: 'Shirin massivi uchun masjid loyihasi',
    description: 'Masjid loyihasining chizmalari va 3D ko\'rinishi.',
    type: 'Loyiha',
    priority: 'High',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'arch4',
    teamId: 'architects',
    title: 'An\'anaviy me\'morchilik bilan tanishuv',
    description: 'Tarixiy obidalar va uslublarni o\'rganish.',
    type: 'Tadqiqot',
    priority: 'Normal',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'arch5',
    teamId: 'architects',
    title: 'Kelgusi ishlar rejasi',
    description: 'Yillik reja va strategiyani belgilash.',
    type: 'Reja',
    priority: 'Normal',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },

  // --- Tarjimonlar ---
  {
    id: 'trans1',
    teamId: 'translators',
    title: 'SESSIYA',
    description: 'Imtihon davri.',
    type: 'Muhim',
    priority: "O'ta muhim",
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'trans2',
    teamId: 'translators',
    title: 'Encyclopedia of Landscape Design',
    description: 'Kitob tarjimasi ustida ishlash.',
    type: 'Kitob',
    priority: 'Normal',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'trans3',
    teamId: 'translators',
    title: 'Apple headquarter',
    description: 'Apple bosh ofisi haqidagi maqola/video.',
    type: 'Maqola',
    priority: 'tavsiyaviy',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'trans4',
    teamId: 'translators',
    title: 'Turgut Cansever asarlari',
    description: '"Islam\'da sehir va mimari" va "Kubbeyi yere koymamak" asarlarini o\'rganish va tarjima qilish.',
    type: 'Kitob',
    priority: 'High',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'trans5',
    teamId: 'translators',
    title: '*** Rector\'s suggestion ***',
    description: 'Rektor tomonidan berilgan maxsus topshiriq.',
    type: 'Special',
    priority: 'Critical',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },

  // --- Club (Students) ---
  {
    id: 'stu1',
    teamId: 'students',
    title: 'SESSIYA',
    description: 'O\'qish va imtihonlar.',
    type: 'Muhim',
    priority: "O'ta muhim",
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'stu2',
    teamId: 'students',
    title: 'Community rejasini tuzish',
    description: 'Jamoa rivojlanish strategiyasi muhokamasi.',
    type: 'Muhokama',
    priority: 'High',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'stu3',
    teamId: 'students',
    title: 'Chaqiriladigan ustozlar ro\'yxati',
    description: 'Masterclass va suhbatlar uchun mehmonlar ro\'yxatini shakllantirish.',
    type: 'Reja',
    priority: 'Normal',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },

  // --- Software ---
  {
    id: 'soft1',
    teamId: 'software',
    title: 'SESSIYA',
    description: 'Exams & Academic debts.',
    type: 'Muhim',
    priority: "O'ta muhim",
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'soft2',
    teamId: 'software',
    title: 'Site redesign',
    description: 'Muslimbek or Biloliddin himself. New UI/UX implementation.',
    type: 'UI/UX',
    priority: 'High',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'soft3',
    teamId: 'software',
    title: 'Connect to our Server 🪄',
    description: 'Deploy backend and database connection.',
    type: 'DevOps',
    priority: 'High',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'soft4',
    teamId: 'software',
    title: 'Admin panel',
    description: 'Complete the admin dashboard functionality.',
    type: 'Frontend',
    priority: 'Medium',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'soft5',
    teamId: 'software',
    title: 'Learn "Tizim dizayni" course',
    description: 'System Design course by 42.',
    type: 'Education',
    priority: 'Normal',
    status: 'Doing',
    startDate: '',
    deadline: '',
    resourceLink: ''
  },
  {
    id: 'soft6',
    teamId: 'software',
    title: 'Chill!',
    description: 'Relax and recover energy.',
    type: 'Life',
    priority: 'Low',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  }
];
