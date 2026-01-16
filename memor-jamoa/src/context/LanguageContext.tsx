
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from '../types';

type Dictionary = Record<string, Record<Language, string>>;

const DICTIONARY: Dictionary = {
  // Navigation & General
  "Since 2023": { UZ: "2023-yildan beri", TR: "2023'ten beri", ENG: "Since 2023", RUS: "С 2023 года" },
  "The Empire of Traditional Arts": { UZ: "An'anaviy San'at Imperiyasi", TR: "Geleneksel Sanatlar İmparatorluğu", ENG: "The Empire of Traditional Arts", RUS: "Империя традиционных искусств" },
  "Exit": { UZ: "Chiqish", TR: "Çıkış", ENG: "Exit", RUS: "Выход" },
  "I'm Creator": { UZ: "Men Adminman", TR: "Ben Yöneticiyim", ENG: "I'm Admin", RUS: "Я Админ" },
  "Floating in the void": { UZ: "Bo'shliqda suzib, g'oyalar bilan bog'langan.", TR: "Boşlukta süzülen, fikirlerle bağlı.", ENG: "Floating in the void, tethered by ideas.", RUS: "Парящий в пустоте, привязанный идеями." },
  "To beautify the world": { UZ: "Dunyoni go'zallashtirish uchun!", TR: "Dünyayı güzelleştirmek için!", ENG: "To beautify the world!", RUS: "Чтобы украсить мир!" },
  
  // Home Page
  "Ijod Maydoni": { UZ: "Ijod Maydoni", TR: "Yaratıcılık Alanı", ENG: "Creative Space", RUS: "Творческое Пространство" },
  "Dunyoni go'zallashtirish uchun": { UZ: "Dunyoni go'zallashtirish uchun!", TR: "Dünyayı güzelleştirmek için!", ENG: "To beautify the world!", RUS: "Чтобы украсить мир!" },
  "Missiyalar": { UZ: "Missiyalar", TR: "Görevler", ENG: "Missions", RUS: "Миссии" },
  "Team": { UZ: "Bo'lim", TR: "Bölüm", ENG: "Department", RUS: "Отдел" },
  "Team Members": { UZ: "Jamoa A'zolari", TR: "Takım Üyeleri", ENG: "Team Members", RUS: "Члены Козда" },
  "Creators": { UZ: "Ijodkorlar", TR: "Yaratıcılar", ENG: "Creators", RUS: "Творцы" },
  "Sponsor": { UZ: "Bosh homiy", TR: "Ana Sponsor", ENG: "General Sponsor", RUS: "Генеральный спонсор" },
  "Redirect Creators": { UZ: "Ijodkorlarni yo'naltirish", TR: "Yaratıcıları Yönlendir", ENG: "Redirect Creators", RUS: "Перенаправить творцов" },

  // Profile & Manager
  "Profile": { UZ: "Profil", TR: "Profil", ENG: "Profile", RUS: "Профиль" },
  "Bio": { UZ: "Men haqimda", TR: "Hakkımda", ENG: "Bio", RUS: "О себе" },
  "Write something about yourself...": { UZ: "O'zingiz haqingizda yozing...", TR: "Kendiniz hakkında bir şeyler yazın...", ENG: "Write something about yourself...", RUS: "Напишите что-нибудь о себе..." },
  "Username": { UZ: "Foydalanuvchi nomi", TR: "Kullanıcı adı", ENG: "Username", RUS: "Имя пользователя" },
  "Password": { UZ: "Parol", TR: "Parola", ENG: "Password", RUS: "Пароль" },
  "Avatar URL": { UZ: "Rasm havolasi", TR: "Avatar URL'si", ENG: "Avatar URL", RUS: "URL аватара" },
  "Back to Home": { UZ: "Ortga qaytish", TR: "Ana Sayfaya Dön", ENG: "Back to Home", RUS: "На главную" },
  "Identity": { UZ: "Shaxs", TR: "Kimlik", ENG: "Identity", RUS: "Личность" },
  "Access Code": { UZ: "Kirish kodi", TR: "Erişim Kodu", ENG: "Access Code", RUS: "Код доступа" },
  "Login": { UZ: "Kirish", TR: "Giriş", ENG: "Login", RUS: "Войти" },

  // Roles
  "Supervisor": { UZ: "Ustoz", TR: "Hoca", ENG: "Supervisor", RUS: "Наставник" },
  "Investor": { UZ: "Investor", TR: "Yatırımcı", ENG: "Investor", RUS: "Инвестор" },

  // Team Names
  "Artwork": { UZ: "Artwork", TR: "Sanat", ENG: "Artwork", RUS: "Арт" },
  "Loyiha": { UZ: "Loyiha", TR: "Proje", ENG: "Architects", RUS: "Проект" },
  "Club": { UZ: "Club", TR: "Kulüp", ENG: "Club", RUS: "Клуб" },
  "Tarjima": { UZ: "Tarjima", TR: "Tercüme", ENG: "Translation", RUS: "Перевод" },
  "Media": { UZ: "Media", TR: "Medya", ENG: "Media", RUS: "Медиа" },
  "Software": { UZ: "Software", TR: "Yazılım", ENG: "Software", RUS: "Программное обеспечение" },

  // Team Descriptions
  "desc_artwork": {
    UZ: `Vazifasi:
➥ Erkin ijod;
➥ Ko'rgazma;
➥ Hunarmandchilik namunalarini yasash.

Kimlar ishlaydi:
- Ijodkorlar;
   ➥ Naqqoshlar
   ➥ Izonit
   ➥ So'zana (kashta)
   ➥ Miniatura va hk.
- Hobbisi ko'plar`,
    TR: `Görev:
➥ Serbest çalışma;
➥ Sergi;
➥ El sanatları örnekleri yapmak.

Kimler çalışıyor:
- Sanatçılar;
   ➥ Nakkaşlar
   ➥ İzonit
   ➥ Nakış
   ➥ Minyatür vb.`,
    ENG: `Duties:
➥ Free creation;
➥ Exhibition;
➥ Crafting handicraft samples.

Who works here:
- Artists;
   ➥ Pattern makers
   ➥ Izonit
   ➥ Embroidery
   ➥ Miniature etc.`,
    RUS: `Обязанности:
➥ Свободное творчество;
➥ Выставка;
➥ Изготовление образцов ремесел.

Кто работает:
- Художники;
   ➥ Орнаменталисты
   ➥ Изонить
   ➥ Вышивка
   ➥ Миниатюра и др.`
  },
  "desc_architects": {
    UZ: `Vazifasi:
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
- Shaharsozlar;`,
    TR: `Görev:
➥ Proje yarışmalarına katılım;
➥ Siparişler üzerinde çalışma;
➥ Görselleştirme

Kimler çalışıyor:
- Tasarımcılar
   ➥ İç mekan;
   ➥ Dış mekan;
   ➥ Peyzaj;
- Mimarlar;
- Mühendisler;
- Şehir plancıları;`,
    ENG: `Duties:
➥ Participating in project competitions;
➥ Working on orders;
➥ Visualization

Who works here:
- Designers
   ➥ Interior;
   ➥ Exterior;
   ➥ Landscape;
- Architects;
- Engineers;
- Urban planners;`,
    RUS: `Обязанности:
➥ Участие в конкурсах проектов;
➥ Работа над заказами;
➥ Визуализация

Кто работает:
- Дизайнеры
   ➥ Интерьер;
   ➥ Экстерьер;
   ➥ Ландшафт;
- Архитекторы;
- Инженеры;
- Градостроители;`
  },
  "desc_translators": {
    UZ: `Vazifasi: — Tarjima qilish:
➥ Kitob;
➥ Maqola;
➥ Video

Kimlar ishlaydi:
- Til biluvchilar;
- Yorib tashediganlar;
- Muharrirlar;
(Ingliz, Turk, Rus va boshqa tillar bo'yicha)`,
    TR: `Görev: — Çeviri yapmak:
➥ Kitap;
➥ Makale;
➥ Video

Kimler çalışıyor:
- Dil bilenler;
- Editörler;
(İngilizce, Türkçe, Rusça ve diğer diller)`,
    ENG: `Duties: — Translating:
➥ Books;
➥ Articles;
➥ Videos

Who works here:
- Linguists;
- Editors;
(English, Turkish, Russian, and other languages)`,
    RUS: `Обязанности: — Перевод:
➥ Книги;
➥ Статьи;
➥ Видео

Кто работает:
- Знатоки языков;
- Редакторы;
(Английский, Турецкий, Русский и другие языки)`
  },
  "desc_media": {
    UZ: `Vazifasi:
➥ Kontent (video/rasm)
➥ Dizayn
➥ Social Media Marketing

Kimlar ishlaydi:
- Dizaynerlar;
- SMM mutaxassislar;
- Content Creatorlar:
   ➥ Content Manager
   ➥ Senarist;
   ➥ Storyteller;
   ➥ Operator;
   ➥ Dublyaj`,
    TR: `Görev:
➥ İçerik (video/resim)
➥ Tasarım
➥ Sosyal Medya Pazarlaması

Kimler çalışıyor:
- Tasarımcılar;
- SMM uzmanları;
- İçerik Üreticileri`,
    ENG: `Duties:
➥ Content (video/image)
➥ Design
➥ Social Media Marketing

Who works here:
- Designers;
- SMM specialists;
- Content Creators`,
    RUS: `Обязанности:
➥ Контент (видео/фото)
➥ Дизайн
➥ Маркетинг в социальных сетях

Кто работает:
- Дизайнеры;
- SMM специалисты;
- Создатели контента`
  },
  "desc_students": {
    UZ: `Vazifasi:
➥ Mutaxassislar bilan suhbat;
➥ Taqdimotlar;
➥ Fikr almashish;
➥ Iqtidorli kadrlarni shakllantirish/kashf etish;

Kimlar ishlaydi:
- Koordinator;
- Olib boruvchi;
- Mutaxassislar va barcha talabalar.`,
    TR: `Görev:
➥ Uzmanlarla sohbet;
➥ Sunumlar;
➥ Fikir alışverişi;

Kimler çalışıyor:
- Koordinatör;
- Sunucu;
- Uzmanlar ve tüm öğrenciler.`,
    ENG: `Duties:
➥ Talks with experts;
➥ Presentations;
➥ Sharing ideas;

Who works here:
- Coordinator;
- Hosts;
- Experts and all students.`,
    RUS: `Обязанности:
➥ Беседы с экспертами;
➥ Презентации;
➥ Обмен мнениями;

Кто работает:
- Координатор;
- Ведущие;
- Эксперты и все студенты.`
  },
  "desc_software": {
    UZ: `Vazifasi:
- Website
   ➥ Main site;
   ➥ Task manager;
   ➥ Admin panel;
   ➥ Back-end | Database;

Kimlar ishlaydi:
- Front-end developer;
- Back-end developer;
- UI/UX Dizayner;`,
    TR: `Görev:
- Web Sitesi
   ➥ Ana site;
   ➥ Görev yöneticisi;
   ➥ Yönetici paneli;

Kimler çalışıyor:
- Front-end geliştirici;
- Back-end geliştirici;
- UI/UX Tasarımcı;`,
    ENG: `Duties:
- Website
   ➥ Main site;
   ➥ Task manager;
   ➥ Admin panel;

Who works here:
- Front-end developers;
- Back-end developers;
- UI/UX Designers;`,
    RUS: `Обязанности:
- Веб-сайт
   ➥ Основной сайт;
   ➥ Менеджер задач;
   ➥ Панель администратора;

Кто работает:
- Front-end разработчики;
- Back-end разработчики;
- UI/UX Дизайнеры;`
  },

  // Task Titles & Descriptions Translations
  "SESSIYADAN O'TISH": { UZ: "SESSIYADAN O'TISH", TR: "SINAVLARI GEÇMEK", ENG: "PASS THE EXAMS", RUS: "СДАТЬ СЕССИЮ" },
  "Imtihonlarni topshirish va akademik qarzlarni yopish.": { UZ: "Imtihonlarni topshirish va akademik qarzlarni yopish.", TR: "Sınavları vermek ve akademik borçları kapatmak.", ENG: "Passing exams and clearing academic debts.", RUS: "Сдача экзаменов и закрытие академических долгов." },
  "Jamoa a'zolarining o'quv jarayonidagi imtihonlari.": { UZ: "Jamoa a'zolarining o'quv jarayonidagi imtihonlari.", TR: "Takım üyelerinin eğitim sürecindeki sınavları.", ENG: "Exams of team members during the study process.", RUS: "Экзамены членов команды в учебном процессе." },
  "Akademik majburiyatlar.": { UZ: "Akademik majburiyatlar.", TR: "Akademik yükümlülükler.", ENG: "Academic obligations.", RUS: "Академические обязательства." },
  "Imtihon davri.": { UZ: "Imtihon davri.", TR: "Sınav dönemi.", ENG: "Exam period.", RUS: "Период экзаменов." },
  "O'qish va imtihonlar.": { UZ: "O'qish va imtihonlar.", TR: "Okuma ve sınavlar.", ENG: "Study and exams.", RUS: "Учеба и экзамены." },
  "Exams & Academic debts.": { UZ: "Imtihonlar va akademik qarzlar.", TR: "Sınavlar va akademik borçlar.", ENG: "Exams & Academic debts.", RUS: "Экзамены и академические долги." },
  "SESSIYA": { UZ: "SESSIYA", TR: "SINAV DÖNEMİ", ENG: "EXAMS", RUS: "СЕССИЯ" },

  "Kerakli anjomlar sotib olish": { UZ: "Kerakli anjomlar sotib olish", TR: "Gerekli malzemeleri satın almak", ENG: "Buying necessary supplies", RUS: "Покупка необходимых принадлежностей" },
  "Bo'yoqlar, mo'yqalamlar, kanvas va boshqa kerakli xom-ashyolar.": { UZ: "Bo'yoqlar, mo'yqalamlar, kanvas va boshqa kerakli xom-ashyolar.", TR: "Boyalar, fırçalar, tuval ve diğer hammaddeler.", ENG: "Paints, brushes, canvas and other raw materials.", RUS: "Краски, кисти, холст и другое сырье." },

  "Ishlar uchun namunalar ko'rib / reja tuzish": { UZ: "Ishlar uchun namunalar ko'rib / reja tuzish", TR: "Örnekleri incelemek / Plan yapmak", ENG: "Reviewing samples / Planning", RUS: "Просмотр образцов / Планирование" },
  "Yangi ko'rgazma uchun referenslar yig'ish va eskizlar chizish.": { UZ: "Yangi ko'rgazma uchun referenslar yig'ish va eskizlar chizish.", TR: "Yeni sergi için referans toplamak ve eskiz çizmek.", ENG: "Gathering references and sketching for the new exhibition.", RUS: "Сбор референсов и эскизы для новой выставки." },

  "Kontent reja muhokamasi": { UZ: "Kontent reja muhokamasi", TR: "İçerik planı tartışması", ENG: "Content plan discussion", RUS: "Обсуждение контент-плана" },
  "Yangi oy uchun media rejasini tuzish va tasdiqlash.": { UZ: "Yangi oy uchun media rejasini tuzish va tasdiqlash.", TR: "Yeni ay için medya planını oluşturmak ve onaylamak.", ENG: "Creating and approving the media plan for the new month.", RUS: "Создание и утверждение медиаплана на новый месяц." },

  "Tavsiya": { UZ: "Tavsiya", TR: "Tavsiye", ENG: "Suggestion", RUS: "Рекомендация" },
  "desc_media_tavsiya": {
    UZ: `➥ Arxitektura universitetlari haqida;
➥ Me'morlar haqida;
➥ "Nega?"
➥ Kontrast: Zamonaviy hamda an'anaviy me'morchilik.`,
    TR: `➥ Mimarlık üniversiteleri hakkında;
➥ Mimarlar hakkında;
➥ "Neden?"
➥ Kontrast: Modern ve geleneksel mimari.`,
    ENG: `➥ About architecture universities;
➥ About architects;
➥ "Why?"
➥ Contrast: Modern and traditional architecture.`,
    RUS: `➥ Об архитектурных университетах;
➥ Об архитекторах;
➥ "Почему?"
➥ Контраст: Современная и традиционная архитектура.`
  },

  "Malayziya loyiha tanlovi": { UZ: "Malayziya loyiha tanlovi", TR: "Malezya proje yarışması", ENG: "Malaysia project competition", RUS: "Конкурс проектов в Малайзии" },
  "Xalqaro tanlov uchun konsept tayyorlash.": { UZ: "Xalqaro tanlov uchun konsept tayyorlash.", TR: "Uluslararası yarışma için konsept hazırlamak.", ENG: "Preparing a concept for the international competition.", RUS: "Подготовка концепции для международного конкурса." },

  "Shirin massivi uchun masjid loyihasi": { UZ: "Shirin massivi uchun masjid loyihasi", TR: "Shirin masifi için cami projesi", ENG: "Mosque project for Shirin massif", RUS: "Проект мечети для массива Ширин" },
  "Masjid loyihasining chizmalari va 3D ko'rinishi.": { UZ: "Masjid loyihasining chizmalari va 3D ko'rinishi.", TR: "Cami projesinin çizimleri ve 3D görünümü.", ENG: "Drawings and 3D view of the mosque project.", RUS: "Чертежи и 3D вид проекта мечеti." },

  "An'anaviy me'morchilik bilan tanishuv": { UZ: "An'anaviy me'morchilik bilan tanishuv", TR: "Geleneksel mimariyle tanışma", ENG: "Introduction to traditional architecture", RUS: "Знакомство с традиционной архитектурой" },
  "Tarixiy obidalar va uslublarni o'rganish.": { UZ: "Tarixiy obidalar va uslublarni o'rganish.", TR: "Tarihi anıtları ve stilleri incelemek.", ENG: "Studying historical monuments and styles.", RUS: "Изучение исторических памятников и стилей." },

  "Kelgusi ishlar rejasi": { UZ: "Kelgusi ishlar rejasi", TR: "Gelecek işler planı", ENG: "Plan for future works", RUS: "План будущих работ" },
  "Yillik reja va strategiyani belgilash.": { UZ: "Yillik reja va strategiyani belgilash.", TR: "Yıllık plan ve stratejiyi belirlemek.", ENG: "Setting the annual plan and strategy.", RUS: "Определение годового плана и стратегии." },

  "Encyclopedia of Landscape Design": { UZ: "Encyclopedia of Landscape Design", TR: "Encyclopedia of Landscape Design", ENG: "Encyclopedia of Landscape Design", RUS: "Encyclopedia of Landscape Design" },
  "Kitob tarjimasi ustida ishlash.": { UZ: "Kitob tarjimasi ustida ishlash.", TR: "Kitap çevirisi üzerinde çalışmak.", ENG: "Working on book translation.", RUS: "Работа над переводом книги." },

  "Apple headquarter": { UZ: "Apple headquarter", TR: "Apple headquarter", ENG: "Apple headquarter", RUS: "Apple headquarter" },
  "Apple bosh ofisi haqidagi maqola/video.": { UZ: "Apple bosh ofisi haqidagi maqola/video.", TR: "Apple genel merkezi hakkında makale/video.", ENG: "Article/video about Apple headquarters.", RUS: "Статья/видео о штаб-квартире Apple." },

  "Turgut Cansever asarlari": { UZ: "Turgut Cansever asarlari", TR: "Turgut Cansever eserleri", ENG: "Works of Turgut Cansever", RUS: "Произведения Тургута Джансевера" },
  "\"Islam'da sehir va mimari\" va \"Kubbeyi yere koymamak\" asarlarini o'rganish va tarjima qilish.": { UZ: "\"Islam'da sehir va mimari\" va \"Kubbeyi yere koymamak\" asarlarini o'rganish va tarjima qilish.", TR: "\"İslam'da şehir ve mimari\" ve \"Kubbeyi yere koymamak\" eserlerini incelemek ve çevirmek.", ENG: "Studying and translating \"Islam'da sehir va mimari\" and \"Kubbeyi yere koymamak\".", RUS: "Изучение и перевод произведений «Islam'da sehir va mimari» и «Kubbeyi yere koymamak»." },

  "*** Rector's suggestion ***": { UZ: "*** Rector's suggestion ***", TR: "*** Rektörün önerisi ***", ENG: "*** Rector's suggestion ***", RUS: "*** Предложение ректора ***" },
  "Rektor tomonidan berilgan maxsus topshiriq.": { UZ: "Rektor tomonidan berilgan maxsus topshiriq.", TR: "Rektör tarafından verilen özel görev.", ENG: "Special task given by the Rector.", RUS: "Специальное задание от ректора." },

  "Community rejasini tuzish": { UZ: "Community rejasini tuzish", TR: "Topluluk planını oluşturmak", ENG: "Creating the Community plan", RUS: "Создание плана сообщества" },
  "Jamoa rivojlanish strategiyasi muhokamasi.": { UZ: "Jamoa rivojlanish strategiyasi muhokamasi.", TR: "Takım geliştirme stratejisi tartışması.", ENG: "Discussion of team development strategy.", RUS: "Обсуждение стратегии развития команды." },

  "Chaqiriladigan ustozlar ro'yxati": { UZ: "Chaqiriladigan ustozlar ro'yxati", TR: "Davet edilecek hocalar listesi", ENG: "List of mentors to invite", RUS: "Список приглашаемых наставников" },
  "Masterclass va suhbatlar uchun mehmonlar ro'yxatini shakllantirish.": { UZ: "Masterclass va suhbatlar uchun mehmonlar ro'yxatini shakllantirish.", TR: "Masterclass ve sohbetler için konuk listesini oluşturmak.", ENG: "Forming the guest list for masterclasses and talks.", RUS: "Формирование списка гостей для мастер-классов и бесед." },

  "Site redesign": { UZ: "Sayt qayta dizayni", TR: "Site yeniden tasarımı", ENG: "Site redesign", RUS: "Ребилд сайта" },
  "Muslimbek or Biloliddin himself. New UI/UX implementation.": { UZ: "Muslimbek yoki Biloliddinning o'zi. Yangi UI/UX joriy etish.", TR: "Muslimbek veya Biloliddin'in kendisi. Yeni UI/UX uygulaması.", ENG: "Muslimbek or Biloliddin himself. New UI/UX implementation.", RUS: "Муслимбек или сам Билолиддин. Внедрение нового UI/UX." },

  "Connect to our Server 🪄": { UZ: "Serverimizga ulanish 🪄", TR: "Sunucumuza bağlan 🪄", ENG: "Connect to our Server 🪄", RUS: "Подключение к serveru 🪄" },
  "Deploy backend and database connection.": { UZ: "Backend va ma'lumotlar bazasini ulash.", TR: "Backend va veritabanı bağlantısını kurmak.", ENG: "Deploy backend and database connection.", RUS: "Развертывание бэкенда и базы данных." },

  "Admin panel": { UZ: "Admin paneli", TR: "Yönetici paneli", ENG: "Admin panel", RUS: "Админ панель" },
  "Complete the admin dashboard functionality.": { UZ: "Admin boshqaruv panelini yakunlash.", TR: "Yönetici paneli işlevselliğini tamamlamak.", ENG: "Complete the admin dashboard functionality.", RUS: "Завершить функциональность админ-панели." },

  "Learn \"Tizim dizayni\" course": { UZ: "\"Tizim dizayni\" kursini o'rganish", TR: "\"Sistem tasarımı\" kursunu öğrenmek", ENG: "Learn \"System Design\" course", RUS: "Изучить курс «Системный дизайн»" },
  "System Design course by 42.": { UZ: "42 tomonidan System Design kursi.", TR: "42 tarafından Sistem Tasarımı kursu.", ENG: "System Design course by 42.", RUS: "Курс System Design от 42." },

  "Chill!": { UZ: "Dam olish!", TR: "Dinlen!", ENG: "Chill!", RUS: "Отдыхай!" },
  "Relax and recover energy.": { UZ: "Dam oling va kuch yig'ing.", TR: "Rahatla ve enerji topla.", ENG: "Relax and recover energy.", RUS: "Расслабься и восстанови силы." },

  // Task Statuses
  "To Do": { UZ: "Rejada", TR: "Yapılacak", ENG: "To Do", RUS: "Сделать" },
  "Doing": { UZ: "Jarayonda", TR: "Yapılıyor", ENG: "Doing", RUS: "В процессе" },
  "Done": { UZ: "Bajarildi", TR: "Tamamlandı", ENG: "Done", RUS: "Готово" },
  "All": { UZ: "Barchasi", TR: "Hepsi", ENG: "All", RUS: "Все" },

  // Filter & UI
  "All Notes": { UZ: "Barcha qaydlar", TR: "Tüm notlar", ENG: "All Notes", RUS: "Все заметки" },
  "Search...": { UZ: "Qidirish...", TR: "Ara...", ENG: "Search...", RUS: "Поиск..." },
  "Pin Note": { UZ: "Qayd qo'shish", TR: "Not Ekle", ENG: "Pin Note", RUS: "Добавить" },
  "Empty Void": { UZ: "Bo'shliq", TR: "Boşluk", ENG: "Empty Void", RUS: "Пустота" },
  "Archive this artifact?": { UZ: "Bu arxivni o'chirmoqchimisiz?", TR: "Bu arşivi silmek istiyor musunuz?", ENG: "Archive this artifact?", RUS: "Архивировать этот артефакт?" },
  "Burn": { UZ: "Yoqish", TR: "Yak", ENG: "Burn", RUS: "Сжечь" },

  // Modal
  "Task Title": { UZ: "Vazifa nomi", TR: "Görev Başlığı", ENG: "Task Title", RUS: "Название задачи" },
  "Description": { UZ: "Izoh", TR: "Açıklama", ENG: "Description", RUS: "Описание" },
  "Type": { UZ: "Turi", TR: "Tür", ENG: "Type", RUS: "Тип" },
  "Priority": { UZ: "Muhimlik", TR: "Öncelik", ENG: "Priority", RUS: "Приоритет" },
  "Status": { UZ: "Holat", TR: "Durum", ENG: "Status", RUS: "Статус" },
  "Target Date (Opt)": { UZ: "Muddat", TR: "Hedef Tarih", ENG: "Target Date", RUS: "Срок" },
  "Resource": { UZ: "Resurs", TR: "Kaynak", ENG: "Resource", RUS: "Ресурс" },
  "Open Resource": { UZ: "Manbani ochish", TR: "Kaynağı aç", ENG: "Open Resource", RUS: "Открыть ресурс" },
  "Assign to Teams": { UZ: "Jamoalarga biriktirish", TR: "Takımlara ata", ENG: "Assign to Teams", RUS: "Назначить командам" },
  "Discard": { UZ: "Bekor qilish", TR: "İptal", ENG: "Discard", RUS: "Отмена" },
  "Save Task": { UZ: "Saqlash", TR: "Kaydet", ENG: "Save Task", RUS: "Сохранить" },
  "Update": { UZ: "Yangilash", TR: "Güncelle", ENG: "Update", RUS: "Обновить" },
  "Creator Info": { UZ: "Ijodkor Ma'lumoti", TR: "Yaratıcı Bilgileri", ENG: "Creator Info", RUS: "Информация о Творце" },
  "Name": { UZ: "Ism", TR: "İsim", ENG: "Name", RUS: "Имя" },
  "Role": { UZ: "Rol", TR: "Rol", ENG: "Role", RUS: "Роль" },
  "Volunteer": { UZ: "Volontyor", TR: "Gönüllü", ENG: "Volunteer", RUS: "Волонтер" },
  "Move to Team": { UZ: "Jamoaga o'tkazish", TR: "Takıma Taşı", ENG: "Move to Team", RUS: "Переместить в команду" },
  "Select Team": { UZ: "Jamoani tanlang", TR: "Takım Seç", ENG: "Select Team", RUS: "Выберите команду" },
  "Save Profile": { UZ: "Profilni Saqlash", TR: "Profili Kaydet", ENG: "Save Profile", RUS: "Сохранить профиль" },
  "Cancel": { UZ: "Bekor qilish", TR: "İptal", ENG: "Cancel", RUS: "Отмена" },

  // Common Dynamic Terms (Simulated translation for tags)
  "Muhim": { UZ: "Muhim", TR: "Önemli", ENG: "Important", RUS: "Важно" },
  "O'ta muhim": { UZ: "O'ta muhim", TR: "Çok Önemli", ENG: "Critical", RUS: "Критично" },
  "Normal": { UZ: "O'rtacha", TR: "Normal", ENG: "Normal", RUS: "Нормально" },
  "Tavsiyaviy": { UZ: "Tavsiyaviy", TR: "Tavsiye", ENG: "Suggested", RUS: "Рекомендовано" },
  "High": { UZ: "Yuqori", TR: "Yüksek", ENG: "High", RUS: "Высокий" },
  "Low": { UZ: "Past", TR: "Düşük", ENG: "Low", RUS: "Низкий" },
  "Kitob": { UZ: "Kitob", TR: "Kitap", ENG: "Book", RUS: "Книга" },
  "Maqola": { UZ: "Maqola", TR: "Makale", ENG: "Article", RUS: "Статья" },
  "Reja": { UZ: "Reja", TR: "Plan", ENG: "Plan", RUS: "План" },
  "Meeting": { UZ: "Majlis", TR: "Toplantı", ENG: "Meeting", RUS: "Встреча" },
  "Xarid": { UZ: "Xarid", TR: "Satın Alma", ENG: "Purchase", RUS: "Покупка" },
  "Tanlov": { UZ: "Tanlov", TR: "Yarışma", ENG: "Contest", RUS: "Конкурс" },
  "Tadqiqot": { UZ: "Tadqiqot", TR: "Araştırma", ENG: "Research", RUS: "Исследование" },
  "Special": { UZ: "Maxsus", TR: "Özel", ENG: "Special", RUS: "Специальный" },
  "Muhokama": { UZ: "Muhokama", TR: "Tartışma", ENG: "Discussion", RUS: "Обсуждение" },
  "Content": { UZ: "Kontent", TR: "İçerik", ENG: "Content", RUS: "Контент" },
  "UI/UX": { UZ: "UI/UX", TR: "UI/UX", ENG: "UI/UX", RUS: "UI/UX" },
  "DevOps": { UZ: "DevOps", TR: "DevOps", ENG: "DevOps", RUS: "DevOps" },
  "Frontend": { UZ: "Frontend", TR: "Frontend", ENG: "Frontend", RUS: "Фронтенд" },
  "Education": { UZ: "Ta'lim", TR: "Eğitim", ENG: "Education", RUS: "Образование" },
  "Life": { UZ: "Hayot", TR: "Yaşam", ENG: "Life", RUS: "Жизнь" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('UZ');

  // Translation function
  const t = (key: string): string => {
    // 1. Exact match
    if (DICTIONARY[key] && DICTIONARY[key][language]) {
      return DICTIONARY[key][language];
    }
    
    // 2. Case-insensitive lookup (fallback)
    const lowerKey = key.toLowerCase();
    const foundEntry = Object.entries(DICTIONARY).find(([k]) => k.toLowerCase() === lowerKey);
    if (foundEntry && foundEntry[1][language]) {
        return foundEntry[1][language];
    }

    // 3. Return original if not found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
