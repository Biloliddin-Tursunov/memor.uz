
import { Team, Task, Member } from './types';

export const ADMIN_USERS = [];

export const TEAMS: Team[] = [
  { id: "artwork", name: "Artwork", description: "desc_artwork" },
  { id: "architects", name: "Loyiha", description: "desc_architects" },
  { id: "media", name: "Media", description: "desc_media" },
  { id: "translators", name: "Tarjima", description: "desc_translators" },
  { id: "students", name: "Me'mor Community", description: "desc_students" },
  { id: "software", name: "Software", description: "desc_software" }
];

const DEFAULT_BIO = "Dunyoni go'zallashtirish uchun!";

// Unique IDs for core members
const U_BILOLIDDIN = 'u_biloliddin';
const U_OTABEK = 'u_otabek';
const U_BUNYOD = 'u_bunyod';
const U_JASUR = 'u_jasur';
const U_MUSLIM = 'u_muslim';
const U_ZUHRA = 'u_zuhra';
const U_FOTIMA = 'u_fotima';
const U_ALISHER = 'u_alisher';
const U_CIGDEM = 'u_cigdem';
const U_DILNOZA = 'u_dilnoza';

export const TEAM_MEMBERS: Record<string, Member[]> = {
  artwork: [
    { id: 'a1', name: 'Aminaxon', bio: DEFAULT_BIO },
    { id: U_ZUHRA, name: 'Zuhra', bio: DEFAULT_BIO },
    { id: U_FOTIMA, name: 'Fotima', bio: DEFAULT_BIO },
    { id: 'a4', name: 'Jasmina', bio: DEFAULT_BIO },
    { id: U_CIGDEM, name: 'Dr. Çiğdem Canbay Türkyılmaz', username: 'Türkyılmaz', password: 'Türkyılmaz', isVolunteer: true, role: 'Supervisor', bio: DEFAULT_BIO },
    { id: U_DILNOZA, name: 'Dr. Dilnoza Kamalova', isVolunteer: true, role: 'Supervisor', bio: DEFAULT_BIO },
  ],
  architects: [
    { id: U_OTABEK, name: 'Otabek', bio: DEFAULT_BIO },
    { id: U_BILOLIDDIN, name: 'Biloliddin', bio: DEFAULT_BIO },
    { id: U_BUNYOD, name: 'Bunyod', bio: DEFAULT_BIO },
    { id: U_JASUR, name: 'Jasur', isVolunteer: true, bio: DEFAULT_BIO },
    { id: U_MUSLIM, name: 'Muslimbek', bio: DEFAULT_BIO },
  ],
  students: [
    { id: 's1', name: 'Jaloliddin', bio: DEFAULT_BIO },
    { id: U_ALISHER, name: 'Alisher', bio: DEFAULT_BIO },
    { id: U_BILOLIDDIN, name: 'Biloliddin', bio: DEFAULT_BIO },
    { id: U_BUNYOD, name: 'Bunyod', bio: DEFAULT_BIO },
    { id: U_OTABEK, name: 'Otabek', bio: DEFAULT_BIO },
    { id: U_CIGDEM, name: 'Dr. Çiğdem Canbay Türkyılmaz', username: 'Türkyılmaz', password: 'Türkyılmaz', isVolunteer: true, role: 'Supervisor', bio: DEFAULT_BIO },
    { id: U_DILNOZA, name: 'Dr. Dilnoza Kamalova', isVolunteer: true, role: 'Supervisor', bio: DEFAULT_BIO },
  ],
  translators: [
    { id: U_OTABEK, name: "Otabek", bio: DEFAULT_BIO },
    { id: U_ALISHER, name: "Alisher", bio: DEFAULT_BIO },
    { id: 't2', name: "Xushnudaxon", bio: DEFAULT_BIO },
    { id: U_FOTIMA, name: "Fotima", bio: DEFAULT_BIO },
    { id: 't4', name: "Asilbek", isVolunteer: true, bio: DEFAULT_BIO },
    { id: 't5', name: "Zilola", bio: DEFAULT_BIO },
    { id: U_MUSLIM, name: "Muslimbek", bio: DEFAULT_BIO },
    { id: U_CIGDEM, name: 'Dr. Çiğdem Canbay Türkyılmaz', username: 'Türkyılmaz', password: 'Türkyılmaz', isVolunteer: true, role: 'Supervisor', bio: DEFAULT_BIO },
    { id: U_DILNOZA, name: 'Dr. Dilnoza Kamalova', isVolunteer: true, role: 'Supervisor', bio: DEFAULT_BIO },
  ],
  media: [
    { id: U_BUNYOD, name: 'Bunyod', bio: DEFAULT_BIO },
    { id: U_ZUHRA, name: 'Zuhra', bio: DEFAULT_BIO },
    { id: U_BILOLIDDIN, name: 'Biloliddin', bio: DEFAULT_BIO },
    { id: U_OTABEK, name: 'Otabek', bio: DEFAULT_BIO },
    { id: U_JASUR, name: 'Jasur', isVolunteer: true, bio: DEFAULT_BIO },
  ],
  software: [
    { id: U_BILOLIDDIN, name: 'Biloliddin', bio: DEFAULT_BIO },
    { id: U_MUSLIM, name: 'Muslimbek', bio: DEFAULT_BIO },
  ]
};

export const INITIAL_TASKS: Task[] = [
  // Team #1 Artworks
  { id: 'art1', teamId: 'artwork', title: 'SESSIYADAN O\'TISH', description: 'Imtihonlarni topshirish va akademik qarzlarni yopish.', type: 'Muhim', priority: "O'ta muhim", status: 'Doing', startDate: '', deadline: '2025-01-15', resourceLink: '' },
  { id: 'art2', teamId: 'artwork', title: 'Kerakli anjomlar sotib olish', description: 'Bo\'yoqlar, mo\'yqalamlar va boshqalar.', type: 'Xarid', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'art3', teamId: 'artwork', title: 'Ishlar uchun namunalar ko\'rib / reja tuzish', description: 'Referenslar va yangi g\'oyalar.', type: 'Reja', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },

  // Team #2 Media
  { id: 'med1', teamId: 'media', title: 'SESSIYA', description: 'O\'quv imtihonlari.', type: 'Muhim', priority: "O'ta muhim", status: 'Doing', startDate: '', deadline: '', resourceLink: '' },
  { id: 'med2', teamId: 'media', title: 'Kontent reja muhokamasi', description: 'Yangi media strategiyasi.', type: 'Muhokama', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'med3', teamId: 'media', title: 'Tavsiya', description: 'desc_media_tavsiya', type: 'Tavsiyaviy', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },

  // Team #3 Loyiha
  { id: 'arch1', teamId: 'architects', title: 'SESSIYA', description: 'Akademik majburiyatlar.', type: 'Muhim', priority: "O'ta muhim", status: 'Doing', startDate: '', deadline: '', resourceLink: '' },
  { id: 'arch2', teamId: 'architects', title: 'Malayziya loyiha tanlovi', description: 'Xalqaro tanlov konsepti.', type: 'Tanlov', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'arch3', teamId: 'architects', title: 'Shirin massivi uchun masjid loyihasi', description: '3D ko\'rinish va chizmalar.', type: 'Loyiha', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'arch4', teamId: 'architects', title: 'An\'anaviy me\'morchilik bilan tanishuv', description: 'Tarixiy obidalarni o\'rganish.', type: 'Tadqiqot', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'arch5', teamId: 'architects', title: 'Kelgusi ishlar rejasi', description: 'Yillik strategiya.', type: 'Reja', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },

  // Team #4 Tarjimonlar
  { id: 'trans1', teamId: 'translators', title: 'SESSIYA', description: 'Imtihonlar.', type: 'Muhim', priority: "O'ta muhim", status: 'Doing', startDate: '', deadline: '', resourceLink: '' },
  { id: 'trans2', teamId: 'translators', title: '"Encyclopedia of Landcape Design" kitobi', description: 'Kitob tarjimasi.', type: 'Kitob', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'trans3', teamId: 'translators', title: 'Apple headquarter', description: 'Maqola yoki video tarjimasi.', type: 'Tavsiyaviy', priority: 'tavsiyaviy', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'trans4', teamId: 'translators', title: 'Turgut Cansever', description: '"Islam\'da sehir va mimari"\n"Kubbeyi yere koymamak"', type: 'Kitob', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'trans5', teamId: 'translators', title: '*** Rector\'s suggestion ***', description: 'Rektor tavsiyasi.', type: 'Special', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },

  // Team #5 Community
  { id: 'stu1', teamId: 'students', title: 'SESSIYA', description: 'O\'quv jarayoni.', type: 'Muhim', priority: "O'ta muhim", status: 'Doing', startDate: '', deadline: '', resourceLink: '' },
  { id: 'stu2', teamId: 'students', title: 'Muhokama: Community rejasini tuzish', description: 'Jamoa rivojlanishi.', type: 'Muhokama', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'stu3', teamId: 'students', title: 'Chaqiriladigan ustozlar ro\'yxati', description: 'Mehmonlar va ustozlar.', type: 'Reja', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },

  // Team #6 Software
  { id: 'soft1', teamId: 'software', title: 'SESSIYA', description: 'Akademik qarzlar.', type: 'Muhim', priority: "O'ta muhim", status: 'Doing', startDate: '', deadline: '', resourceLink: '' },
  { id: 'soft2', teamId: 'software', title: 'Site redesign', description: 'Muslimbek or Biloliddin himself.', type: 'UI/UX', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'soft3', teamId: 'software', title: 'Connect to our Server 🪄', description: 'Backend deployment.', type: 'DevOps', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'soft4', teamId: 'software', title: 'Admin panel', description: 'Dashboard completion.', type: 'Frontend', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'soft5', teamId: 'software', title: 'Learn "Tizim dizayni" course by 42', description: 'Educational goal.', type: 'Education', status: 'To Do', startDate: '', deadline: '', resourceLink: '' },
  { id: 'soft6', teamId: 'software', title: 'Chill!', description: 'Relax and recover.', type: 'Life', status: 'To Do', startDate: '', deadline: '', resourceLink: '' }
];
