
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'uz' | 'en' | 'ru' | 'tr' | 'jp';
export type Theme = 'light' | 'dark';

interface ThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    'dashboard': 'Boshqaruv', 'inbox': 'Xabarlar', 'exhibition': 'Ko\'rgazma', 'search': 'Qidiruv',
    'cms_system': 'CMS Tizimi', 'content_studio': 'Kontent Studiya', 'all_content': 'Barcha materiallar',
    'media_library': 'Media Kutubxona', 'workspace': 'Ish maydoni', 'team': 'Jamoa', 'profile': 'Profil',
    'logout': 'Chiqish', 'settings': 'Sozlamalar', 'create_new': 'Yangi yaratish', 'new_task': 'Vazifa',
    'save': 'Saqlash', 'edit': 'Tahrir', 'delete': 'O\'chirish', 'open': 'Ochish',
    'today_overview': 'Bugungi hisobot', 'active_tasks': 'Faol vazifalar', 'in_review': 'Tekshiruvda',
    'completed': 'Tugallangan', 'recent_tasks': 'Yaqindagi vazifalar', 'view_all': 'Hammasi',
    'personal_info': 'Shaxsiy ma\'lumotlar', 'email_label': 'E-pochta', 'name': 'Ism', 'surname': 'Familiya',
    'dark_mode': 'Tungi rejim', 'upload_multi': 'Fayllarni yuklash', 'images': 'Rasmlar', 
    'videos': 'Videolar', 'documents': 'Hujjatlar', 'filter_vector': 'Vektorlar', 'filter_other': 'Boshqalar',
    'search_placeholder': 'Qidiruv...', 'no_data': 'Ma\'lumot topilmadi.',
    'save_profile': 'Saqlash', 'edit_profile': 'Tahrirlash', 'choose_avatar': 'Rasm yuklash',
    'welcome': 'Xush kelibsiz', 'status_published': 'Joylandi', 'status_draft': 'Qoralama',
    'th_name': 'Nomi', 'assignees': 'Mas\'ullar', 'th_type': 'Turi', 'th_format': 'Format', 'th_status': 'Holati',
    'th_start': 'Boshlanishi', 'th_deadline': 'Muddati', 'th_desc': 'Tavsif', 'owner': 'Mas\'ullar',
    'table_view': 'Jadval', 'board_view': 'Doska', 'calendar_view': 'Kalendar',
    'knowledge': 'Bilim', 'movement': 'Harakat', 'creation': 'Ijod',
    'file_name': 'Fayl nomi', 'tags': 'Teglar (vergul bilan)', 'uploader_label': 'Mas\'ul', 'confirm_upload': 'Tasdiqlash va yuklash',
    'select_icon': 'Ikonka tanlang',
    'cat_architecture': 'Arxitektura', 'cat_it': 'IT va Dasturlash', 'cat_marketing': 'Marketing', 'cat_creative': 'Ijodiy', 'cat_general': 'Umumiy',
    'books': 'Kitoblar', 'book_studio': 'Kitob Studiyasi', 'book_title': 'Kitob nomi', 'book_price': 'Narxi', 'book_type': 'Kitob turi',
    'physical_book': 'Oddiy kitob', 'pdf_book': 'PDF kitob', 'pdf_file': 'PDF Fayl', 'short_info': 'Qisqa ma\'lumot',
    'artists': 'Ijodkorlar', 'artist_studio': 'Ijodkorlar Studiyasi', 'full_name': 'To\'liq ism', 'professions': 'Mutaxassisligi',
    'bio': 'Qisqa bio', 'about': 'Batafsil ma\'lumot', 'gallery_projects': 'Loyihalar galereyasi',
    'birth_year': 'Tug\'ilgan yili', 'death_year': 'Vafot etgan yili (ixtiyoriy)', 'birth_place': 'Tug\'ilgan joyi',
    'events': 'Tadbirlar', 'event_studio': 'Tadbirlar Studiyasi', 'event_name': 'Tadbir nomi', 'start_date': 'Boshlanish vaqti', 'end_date': 'Tugash vaqti',
    'city': 'Shahar', 'address': 'Manzil', 'map_link': 'Xarita linki', 'online_event': 'Onlayn tadbir', 'registration_link': 'Registratsiya linki',
    'organizer': 'Tashkilotchi', 'days': 'kun', 'hours': 'soat', 'minutes': 'daqiqa', 'register': 'Ro\'yxatdan o\'tish',
    'artworks': 'Ijodiy ishlar', 'artwork_studio': 'Art Studiya', 'artwork_name': 'Artwork nomi', 'author': 'Muallif', 'year': 'Yil',
    'request_artwork': 'Artworkni so\'rash', 'send_request': 'So\'rov yuborish', 'contact_info': 'Kontakt (email/tel)',
    'request_success': 'So\'rov muvaffaqiyatli yuborildi!',
    // DatePicker
    'jan': 'Yanvar', 'feb': 'Fevral', 'mar': 'Mart', 'apr': 'Aprel', 'may': 'May', 'jun': 'Iyun', 'jul': 'Iyul', 'aug': 'Avgust', 'sep': 'Sentabr', 'oct': 'Oktabr', 'nov': 'Noyabr', 'dec': 'Dekabr',
    'sun': 'Ya', 'mon': 'Du', 'tue': 'Se', 'wed': 'Ch', 'thu': 'Pa', 'fri': 'Ju', 'sat': 'Sh',
    // IconPicker
    'search_icons': 'Emojilarni qidirish...'
  },
  en: {
    'dashboard': 'Dashboard', 'inbox': 'Inbox', 'exhibition': 'Exhibition', 'search': 'Search',
    'cms_system': 'CMS System', 'content_studio': 'Content Studio', 'all_content': 'All Content',
    'media_library': 'Media Library', 'workspace': 'Workspace', 'team': 'Team', 'profile': 'Profile',
    'logout': 'Logout', 'settings': 'Settings', 'create_new': 'Create New', 'new_task': 'New Task',
    'save': 'Save', 'edit': 'Edit', 'delete': 'Delete', 'open': 'Open',
    'today_overview': 'Today Overview', 'active_tasks': 'Active Tasks', 'in_review': 'In Review',
    'completed': 'Completed', 'recent_tasks': 'Recent Tasks', 'view_all': 'View All',
    'personal_info': 'Personal Info', 'email_label': 'Email', 'name': 'Name', 'surname': 'Surname',
    'dark_mode': 'Dark Mode', 'upload_multi': 'Upload Files', 'images': 'Images',
    'videos': 'Videos', 'documents': 'Documents', 'filter_vector': 'Vectors', 'filter_other': 'Others',
    'search_placeholder': 'Search...', 'no_data': 'No results.',
    'save_profile': 'Save Profile', 'edit_profile': 'Edit Profile', 'choose_avatar': 'Upload Avatar',
    'welcome': 'Welcome', 'status_published': 'Published', 'status_draft': 'Draft',
    'th_name': 'Name', 'assignees': 'Assignees', 'th_type': 'Type', 'th_format': 'Format', 'th_status': 'Status',
    'th_start': 'Start', 'th_deadline': 'Deadline', 'th_desc': 'Description', 'owner': 'Assignees',
    'table_view': 'Table', 'board_view': 'Board', 'calendar_view': 'Calendar',
    'knowledge': 'Knowledge', 'movement': 'Movement', 'creation': 'Creation',
    'file_name': 'File Name', 'tags': 'Tags (comma separated)', 'uploader_label': 'Uploader', 'confirm_upload': 'Confirm and Upload',
    'select_icon': 'Select Icon',
    'cat_architecture': 'Architecture', 'cat_it': 'IT & Dev', 'cat_marketing': 'Marketing', 'cat_creative': 'Creative', 'cat_general': 'General',
    'books': 'Books', 'book_studio': 'Book Studio', 'book_title': 'Book Title', 'book_price': 'Price', 'book_type': 'Book Type',
    'physical_book': 'Physical Book', 'pdf_book': 'PDF Book', 'pdf_file': 'PDF File', 'short_info': 'Short Info',
    'artists': 'Artists', 'artist_studio': 'Artists Studio', 'full_name': 'Full Name', 'professions': 'Professions',
    'bio': 'Short Bio', 'about': 'About Information', 'gallery_projects': 'Gallery Projects',
    'birth_year': 'Birth Year', 'death_year': 'Death Year (optional)', 'birth_place': 'Birth Place',
    'events': 'Events', 'event_studio': 'Event Studio', 'event_name': 'Event Name', 'start_date': 'Start Date', 'end_date': 'End Date',
    'city': 'City', 'address': 'Address', 'map_link': 'Map Link', 'online_event': 'Online Event', 'registration_link': 'Registration Link',
    'organizer': 'Organizer', 'days': 'days', 'hours': 'hours', 'minutes': 'minutes', 'register': 'Register',
    'artworks': 'Artworks', 'artwork_studio': 'Art Studio', 'artwork_name': 'Artwork Name', 'author': 'Author', 'year': 'Year',
    'request_artwork': 'Request Artwork', 'send_request': 'Send Request', 'contact_info': 'Contact (email/tel)',
    'request_success': 'Request sent successfully!',
    // DatePicker
    'jan': 'January', 'feb': 'February', 'mar': 'March', 'apr': 'April', 'may': 'May', 'jun': 'June', 'jul': 'July', 'aug': 'August', 'sep': 'September', 'oct': 'October', 'nov': 'November', 'dec': 'December',
    'sun': 'Su', 'mon': 'Mo', 'tue': 'Tu', 'wed': 'We', 'thu': 'Th', 'fri': 'Fr', 'sat': 'Sa',
    // IconPicker
    'search_icons': 'Search icons...'
  },
  ru: {
    'dashboard': 'Панель', 'inbox': 'Почта', 'exhibition': 'Выставка', 'search': 'Поиск',
    'cms_system': 'CMS Система', 'content_studio': 'Студия', 'all_content': 'Весь контент',
    'media_library': 'Медиатека', 'workspace': 'Рабочая область', 'team': 'Команда', 'profile': 'Профиль',
    'logout': 'Выход', 'settings': 'Настройки', 'create_new': 'Создать', 'new_task': 'Задача+',
    'save': 'Сохранить', 'edit': 'Изменить', 'delete': 'Удалить', 'open': 'Открыть',
    'today_overview': 'Обзор дня', 'active_tasks': 'Активные', 'in_review': 'На проверке',
    'completed': 'Завершено', 'recent_tasks': 'Последние задачи', 'view_all': 'Все',
    'personal_info': 'Личные данные', 'email_label': 'Email', 'name': 'Имя', 'surname': 'Фамилия',
    'dark_mode': 'Тёмная тема', 'upload_multi': 'Загрузить файлы', 'images': 'Картинки',
    'videos': 'Видео', 'documents': 'Документы', 'filter_vector': 'Векторы', 'filter_other': 'Другое',
    'search_placeholder': 'Поиск...', 'no_data': 'Нет данных.',
    'save_profile': 'Сохранить', 'edit_profile': 'Изменить', 'choose_avatar': 'Загрузить фото',
    'welcome': 'Добро пожаловать', 'status_published': 'Опубликовано', 'status_draft': 'Черновик',
    'th_name': 'Имя', 'assignees': 'Исполнители', 'th_type': 'Тип', 'th_format': 'Format', 'th_status': 'Статус',
    'th_start': 'Начало', 'th_deadline': 'Срок', 'th_desc': 'Описание', 'owner': 'Исполнители',
    'table_view': 'Таблица', 'board_view': 'Доска', 'calendar_view': 'Календарь',
    'knowledge': 'Знания', 'movement': 'Движение', 'creation': 'Творчество',
    'file_name': 'Имя файла', 'tags': 'Теги (через запятую)', 'uploader_label': 'Загрузчик', 'confirm_upload': 'Загрузить активы',
    'select_icon': 'Выберите иконку',
    'cat_architecture': 'Архитектура', 'cat_it': 'IT и Разработка', 'cat_marketing': 'Маркетинг', 'cat_creative': 'Творчество', 'cat_general': 'Общее',
    'books': 'Книги', 'book_studio': 'Студия книг', 'book_title': 'Название книги', 'book_price': 'Цена', 'book_type': 'Тип книги',
    'physical_book': 'Обычная книга', 'pdf_book': 'PDF книга', 'pdf_file': 'PDF файл', 'short_info': 'Кратко',
    'artists': 'Искусствоведы', 'artist_studio': 'Студия художников', 'full_name': 'Полное имя', 'professions': 'Профессии',
    'bio': 'Краткая биография', 'about': 'О художнике', 'gallery_projects': 'Галерея проектов',
    'birth_year': 'Год рождения', 'death_year': 'Год смерти (опц.)', 'birth_place': 'Место рождения',
    'events': 'События', 'event_studio': 'Студия событий', 'event_name': 'Название события', 'start_date': 'Дата начала', 'end_date': 'Дата окончания',
    'city': 'Город', 'address': 'Адрес', 'map_link': 'Ссылка на карту', 'online_event': 'Онлайн', 'registration_link': 'Ссылка на регистрацию',
    'organizer': 'Организатор', 'days': 'дн', 'hours': 'ч', 'minutes': 'мин', 'register': 'Регистрация',
    'artworks': 'Работы', 'artwork_studio': 'Арт Студия', 'artwork_name': 'Название работы', 'author': 'Автор', 'year': 'Год',
    'request_artwork': 'Запросить работу', 'send_request': 'Отправить запрос', 'contact_info': 'Контакт',
    'request_success': 'Запрос успешно отправлен!',
    // DatePicker
    'jan': 'Январь', 'feb': 'Февраль', 'mar': 'Март', 'apr': 'Апрель', 'may': 'Май', 'jun': 'Июнь', 'jul': 'Июль', 'aug': 'Август', 'sep': 'Сентябрь', 'oct': 'Октябрь', 'nov': 'Ноябрь', 'dec': 'Декабрь',
    'sun': 'Вс', 'mon': 'Пн', 'tue': 'Вт', 'wed': 'Ср', 'thu': 'Чт', 'fri': 'Пт', 'sat': 'Сб',
    // IconPicker
    'search_icons': 'Поиск эмодзи...'
  },
  tr: {
    'dashboard': 'Panel', 'inbox': 'Gelen Kutusu', 'exhibition': 'Sergi', 'search': 'Ara',
    'cms_system': 'CMS Sistemi', 'content_studio': 'İçerik Stüdyosu', 'all_content': 'Tüm İçerik',
    'media_library': 'Medya Kütüphanesi', 'workspace': 'Çalışma Alanı', 'team': 'Ekip', 'profile': 'Profil',
    'logout': 'Çıkış', 'settings': 'Ayarlar', 'create_new': 'Yeni Oluştur', 'new_task': 'Görev+',
    'save': 'Kaydet', 'edit': 'Düzenle', 'delete': 'Sil', 'open': 'Aç',
    'today_overview': 'Bugün', 'active_tasks': 'Aktif Görevler', 'in_review': 'İncelemede',
    'completed': 'Tamamlandı', 'recent_tasks': 'Son Görevler', 'view_all': 'Hepsini Gör',
    'personal_info': 'Kişisel Bilgi', 'email_label': 'E-posta', 'name': 'Ad', 'surname': 'Soyad',
    'dark_mode': 'Karanlık Mod', 'upload_multi': 'Dosya Yükle', 'images': 'Görüntüler',
    'videos': 'Videolar', 'documents': 'Belgeler', 'filter_vector': 'Vektörler', 'filter_other': 'Diğer',
    'search_placeholder': 'Ara...', 'no_data': 'Veri bulunamadı.',
    'save_profile': 'Kaydet', 'edit_profile': 'Profil Düzenle', 'choose_avatar': 'Fotoğraf Yükle',
    'welcome': 'Hoş Geldiniz', 'status_published': 'Yayınlandı', 'status_draft': 'Taslak',
    'th_name': 'Ad', 'assignees': 'Sorumlular', 'th_type': 'Tür', 'th_format': 'Format', 'th_status': 'Durum',
    'th_start': 'Başlangıç', 'th_deadline': 'Teslim', 'th_desc': 'Açıklama', 'owner': 'Sorumlular',
    'table_view': 'Tablo', 'board_view': 'Pano', 'calendar_view': 'Takvim',
    'knowledge': 'Bilgi', 'movement': 'Hareket', 'creation': 'Yaratıcılık',
    'file_name': 'Dosya Adı', 'tags': 'Etiketler', 'uploader_label': 'Yükleyen', 'confirm_upload': 'Yükle',
    'select_icon': 'Simge seç',
    'cat_architecture': 'Mimari', 'cat_it': 'BT ve Geliştirme', 'cat_marketing': 'Pazarlama', 'cat_creative': 'Yaratıcı', 'cat_general': 'Genel',
    'books': 'Kitaplar', 'book_studio': 'Kitap Stüdyosu', 'book_title': 'Kitap Adı', 'book_price': 'Fiyat', 'book_type': 'Kitap Türü',
    'physical_book': 'Fiziksel Kitap', 'pdf_book': 'PDF Kitap', 'pdf_file': 'PDF Dosyası', 'short_info': 'Kısa Bilgi',
    'artists': 'Sanatçılar', 'artist_studio': 'Sanatçı Stüdyosu', 'full_name': 'Ad Soyad', 'professions': 'Uzmanlıklar',
    'bio': 'Kısa Biyografi', 'about': 'Hakkında', 'gallery_projects': 'Proje Galerisi',
    'birth_year': 'Doğum Yılı', 'death_year': 'Ölüm Yılı (isteğe bağlı)', 'birth_place': 'Doğum Yeri',
    'events': 'Etkinlikler', 'event_studio': 'Etkinlik Stüdyosu', 'event_name': 'Etkinlik Adı', 'start_date': 'Başlangıç Tarihi', 'end_date': 'Bitiş Tarihi',
    'city': 'Şehir', 'address': 'Adres', 'map_link': 'Harita Bağlantısı', 'online_event': 'Çevrimiçi', 'registration_link': 'Kayıt Bağlantısı',
    'organizer': 'Organizatör', 'days': 'gün', 'hours': 'saat', 'minutes': 'dakika', 'register': 'Kayıt Ol',
    'artworks': 'Eserler', 'artwork_studio': 'Sanat Stüdyosu', 'artwork_name': 'Eser Adı', 'author': 'Yazar', 'year': 'Yıl',
    'request_artwork': 'Eser Talep Et', 'send_request': 'Talebi Gönder', 'contact_info': 'İletişim',
    'request_success': 'Talep başarıyla gönderildi!',
    // DatePicker
    'jan': 'Ocak', 'feb': 'Şubat', 'mar': 'Mart', 'apr': 'Nisan', 'may': 'Mayıs', 'jun': 'Haziran', 'jul': 'Temmuz', 'aug': 'Ağustos', 'sep': 'Eylül', 'oct': 'Ekim', 'nov': 'Kasım', 'dec': 'Aralık',
    'sun': 'Pa', 'mon': 'Pt', 'tue': 'Sa', 'wed': 'Ça', 'thu': 'Pe', 'fri': 'Cu', 'sat': 'Ct',
    // IconPicker
    'search_icons': 'Simge ara...'
  },
  jp: {
    'dashboard': 'ダッシュボード', 'inbox': '受信箱', 'exhibition': '展示会', 'search': '検索',
    'cms_system': 'CMS システム', 'content_studio': 'スタジオ', 'all_content': '全コンテンツ',
    'media_library': 'メディア', 'workspace': 'ワークスペース', 'team': 'チーム', 'profile': 'プロフ',
    'logout': 'ログアウト', 'settings': '設定', 'create_new': '新規作成', 'new_task': 'タスク+',
    'save': '保存', 'edit': '編集', 'delete': '削除', 'open': '開く',
    'today_overview': '今日の概要', 'active_tasks': '進行中', 'in_review': 'レビュー中',
    'completed': '完了', 'recent_tasks': '最近のタスク', 'view_all': 'すべて見る',
    'personal_info': '個人情報', 'email_label': 'メール', 'name': '名前', 'surname': '苗字',
    'dark_mode': 'ダークモード', 'upload_multi': 'アップロード', 'images': '画像',
    'videos': '動画', 'documents': 'ドキュメント', 'filter_vector': 'ベクター', 'filter_その池': 'その他',
    'search_placeholder': '検索...', 'no_data': 'データなし',
    'save_profile': '保存', 'edit_profile': '編集', 'choose_avatar': '写真をアップロード',
    'welcome': 'ようこそ', 'status_published': '公開済み', 'status_draft': '下書き',
    'th_name': '名前', 'assignees': '担当者', 'th_type': 'タイプ', 'th_format': '形式', 'th_status': '状態',
    'th_start': '開始', 'th_deadline': '締切', 'th_desc': '説明', 'owner': '担当者',
    'table_view': 'テーブル', 'board_view': 'ボード', 'calendar_view': 'カレンダー',
    'knowledge': '知識', 'movement': 'ムーブメント', 'creation': 'クリエーション',
    'file_name': 'ファイル名', 'tags': 'タグ', 'uploader_label': 'アップローダー', 'confirm_upload': '確定',
    'select_icon': 'アイコンを選択',
    'cat_architecture': '建築', 'cat_it': 'IT・開発', 'cat_marketing': 'マーケティング', 'cat_creative': 'クリエイティブ', 'cat_general': '一般',
    'books': '本', 'book_studio': 'ブックスタジオ', 'book_title': '本のタイトル', 'book_price': '価格', 'book_type': '本の種類',
    'physical_book': '単行本', 'pdf_book': 'PDF本', 'pdf_file': 'PDFファイル', 'short_info': '概要',
    'artists': 'アーティスト', 'artist_studio': 'スタジオ', 'full_name': '氏名', 'professions': '職業',
    'bio': '短い経歴', 'about': '詳細', 'gallery_projects': 'ギャラリー',
    'birth_year': '生年', 'death_year': '没年（任意）', 'birth_place': '出生地',
    'events': 'イベント', 'event_studio': 'イベントスタジオ', 'event_name': 'イベント名', 'start_date': '開始日', 'end_date': '終了日',
    'city': '都市', 'address': '住所', 'map_link': 'マップリンク', 'online_event': 'オンライン', 'registration_link': '登録リンク',
    'organizer': '主催者', 'days': '日', 'hours': '時間', 'minutes': '分', 'register': '登録する',
    'artworks': '作品', 'artwork_studio': 'アートスタジオ', 'artwork_name': '作品名', 'author': '作者', 'year': '年',
    'request_artwork': '作品を依頼', 'send_request': '依頼を送る', 'contact_info': '連絡先',
    'request_success': '依頼が送信されました！',
    // DatePicker
    'jan': '1月', 'feb': '2月', 'mar': '3月', 'apr': '4月', 'may': '5月', 'jun': '6月', 'jul': '7月', 'aug': '8月', 'sep': '9月', 'oct': '10月', 'nov': '11月', 'dec': '12月',
    'sun': '日', 'mon': '月', 'tue': '火', 'wed': '水', 'thu': '木', 'fri': '金', 'sat': '土',
    // IconPicker
    'search_icons': 'アイコンを検索...'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') { root.setAttribute('data-theme', 'dark'); } 
    else { root.removeAttribute('data-theme'); }
  }, [theme]);

  const toggleTheme = () => { setTheme(prev => prev === 'light' ? 'dark' : 'light'); };

  const t = (key: string) => {
    return TRANSLATIONS[language][key] || key;
  };

  return (
    <ThemeContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) { throw new Error('useTheme must be used within a ThemeProvider'); }
  return context;
};
