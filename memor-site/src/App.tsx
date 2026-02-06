import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

// Asosiy komponentlar
import Header from './components/Header';
import { Ornament } from './components/Ornament';
import IntroScreen from './components/IntroScreen';
import SearchModal from './components/SearchModal';
import SEO from './components/SEO';

// Sahifalar
import Home from './pages/Home';
import Knowledge from './pages/Knowledge';
import Action from './pages/Action';
import Creation from './pages/Creation';
import News from './pages/News';
import Login from './pages/Login';
import About from './pages/About';
import Support from './pages/Support';
import Contact from './pages/Contact';
import Search from './pages/Search';

// Batafsil (Detail) Sahifalar - Bularni ./components/details ichida yaratishingiz kerak
import { ArticleDetail } from './components/details/ArticleDetail';
import { ProjectDetail } from './components/details/ProjectDetail';
import { VideoDetail } from './components/details/VideoDetail';
import { CreationDetail } from './components/details/CreationDetail';
import { BookDetail } from './components/details/BookDetail';
import { CreatorDetail } from './components/details/CreatorDetail';
import { EventDetail } from './components/details/EventDetail';
import { NewsDetail } from './components/details/NewsDetail';

// Tiplar va Konstantalar
import { PageRoute, Language } from './types';
import { TRANSLATIONS } from './constants';
import Paper from './components/paper/Paper';

// Sahifa almashganda yuqoriga qaytarish
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  // Intro faqat birinchi marta kirganda ko'rsatiladi
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('memor_intro_shown'));
  const [language, setLanguage] = useState<Language>('uz');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const t = TRANSLATIONS[language];

  // Language synchronization from URL
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const langFromUrl = pathParts[1] as Language;
    if (['uz', 'en', 'ru', 'tr'].includes(langFromUrl)) {
      if (langFromUrl !== language) {
        setLanguage(langFromUrl);
      }
    } else if (location.pathname === '/') {
      // Default to uz if at root
      navigate('/uz', { replace: true });
    }
  }, [location.pathname, language, navigate]);

  // Dark mode effekti
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleIntroFinish = () => {
    sessionStorage.setItem('memor_intro_shown', 'true');
    setShowIntro(false);
  };

  // Aktiv sahifani aniqlash (Header menyusi uchun)
  const getActiveRoute = (path: string): PageRoute => {
    const segments = path.split('/').filter(Boolean);
    const normalizedPath = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '/';

    // Batafsil sahifalar uchun tekshiruv
    if (normalizedPath.startsWith('/article') || normalizedPath.startsWith('/project') || normalizedPath.startsWith('/video') ||
      normalizedPath.startsWith('/creation') || normalizedPath.startsWith('/book') || normalizedPath.startsWith('/creator') ||
      normalizedPath.startsWith('/event') || normalizedPath.startsWith('/news-detail')) {
      return PageRoute.DETAIL;
    }

    switch (normalizedPath) {
      case '/': return PageRoute.HOME;
      case '/knowledge':
      case (normalizedPath.startsWith('/knowledge') ? normalizedPath : ''): return PageRoute.KNOWLEDGE;
      case '/action': return PageRoute.ACTION;
      case '/creation': return PageRoute.CREATION;
      case '/login': return PageRoute.LOGIN;
      case '/about': return PageRoute.ABOUT;
      case '/support': return PageRoute.SUPPORT;
      case '/contact': return PageRoute.CONTACT;
      case '/news': return PageRoute.NEWS;
      case '/search': return PageRoute.SEARCH;
      default: return PageRoute.HOME;
    }
  };

  const currentRoute = getActiveRoute(location.pathname);

  // Menyudan o'tish logikasi
  const handleNavigate = (route: PageRoute) => {
    const langPrefix = `/${language}`;
    switch (route) {
      case PageRoute.HOME: navigate(langPrefix); break;
      case PageRoute.KNOWLEDGE: navigate(`${langPrefix}/knowledge/articles`); break;
      case PageRoute.ACTION: navigate(`${langPrefix}/action`); break;
      case PageRoute.CREATION: navigate(`${langPrefix}/creation`); break;
      case PageRoute.LOGIN: navigate(`${langPrefix}/login`); break;
      case PageRoute.ABOUT: navigate(`${langPrefix}/about`); break;
      case PageRoute.SUPPORT: navigate(`${langPrefix}/support`); break;
      case PageRoute.CONTACT: navigate(`${langPrefix}/contact`); break;
      case PageRoute.NEWS: navigate(`${langPrefix}/news`); break;
      case PageRoute.SEARCH: navigate(`${langPrefix}/search`); break;
      default: navigate(langPrefix);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length > 0 && ['uz', 'en', 'ru', 'tr'].includes(segments[0])) {
      segments[0] = lang;
      navigate(`/${segments.join('/')}`, { replace: true });
    } else {
      navigate(`/${lang}`, { replace: true });
    }
  };

  // Har qanday element bosilganda to'g'ri URL ga yo'naltirish
  const handleItemClick = (item: any) => {
    const type = item.type?.toLowerCase();

    const routeMap: Record<string, string> = {
      'maqola': 'article', 'article': 'article',
      'loyiha': 'project', 'project': 'project',
      'video': 'video',
      'kitob': 'book',
      'ijodkor': 'creator', 'creator': 'creator',
      'tadbir': 'event', 'event': 'event',
      'yangilik': 'news-detail'
    };

    // Agar tipi aniqlanmasa, default 'creation' ga o'tadi
    const routePrefix = routeMap[type] || 'creation';

    // Foydalanuvchi talabi: /article/slug ko'rinishida bo'lishi kerak
    const identifier = item.slug || item.id;

    navigate(`/${language}/${routePrefix}/${identifier}`);
    setIsSearchOpen(false); // Qidiruv oynasini yopish
  };

  return (
    <div className="min-h-screen bg-parchment text-graphite dark:bg-[#020617] flex flex-col font-serif selection:bg-teal selection:text-white relative transition-colors duration-500">
      <ScrollToTop />

      {showIntro && <IntroScreen onFinish={handleIntroFinish} />}

      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-paper-texture z-10 mix-blend-multiply dark:mix-blend-overlay dark:opacity-[0.05]"></div>

      {/* Header: /paper sahifasida ko'rinmaydi */}
      {!location.pathname.includes('/paper') && (
        <Header
          activeRoute={currentRoute}
          onNavigate={handleNavigate}
          onSearchOpen={() => handleNavigate(PageRoute.SEARCH)}
          language={language}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onItemClick={handleItemClick}
        language={language}
      />

      <main className={`flex-grow w-full relative z-20 ${currentRoute === PageRoute.HOME || location.pathname.includes('/paper') ? '' : 'pt-[100px] md:pt-[120px]'}`}>
        <Routes>
          {/* Default redirect to UZ */}
          <Route path="/" element={<Navigate to="/uz" replace />} />

          <Route path="/:lang">
            <Route index element={
              <>
                <SEO title="Bosh sahifa" />
                <Home onNavigate={handleNavigate} onItemClick={handleItemClick} language={language} />
              </>
            } />

            {/* Asosiy Sahifalar */}
            <Route path="knowledge" element={
              <>
                <SEO title="Ilm" description="Me'mor — Ilm sahifasi" />
                <Knowledge onItemClick={handleItemClick} />
              </>
            } />
            <Route path="knowledge/:tab" element={
              <>
                <SEO title="Ilm" />
                <Knowledge onItemClick={handleItemClick} />
              </>
            } />
            <Route path="action" element={
              <>
                <SEO title="Harakat" description="Me'mor — Harakat" />
                <Action onItemClick={handleItemClick} />
              </>
            } />
            <Route path="creation" element={
              <>
                <SEO title="Ijod" description="Me'mor — Ijod namunalari" />
                <Creation onItemClick={handleItemClick} />
              </>
            } />
            <Route path="news" element={
              <>
                <SEO title="Yangiliklar" description="Me'mor — So'nggi yangiliklar" />
                <News onItemClick={handleItemClick} />
              </>
            } />

            {/* Batafsil (Detail) Sahifalar - Dynamic URLs */}
            <Route path="article/:slug" element={<ArticleDetail language={language} />} />
            <Route path="project/:id" element={<ProjectDetail language={language} />} />
            <Route path="video/:id" element={<VideoDetail language={language} />} />
            <Route path="creation/:id" element={<CreationDetail language={language} />} />
            <Route path="book/:id" element={<BookDetail language={language} />} />
            <Route path="creator/:id" element={<CreatorDetail language={language} />} />
            <Route path="event/:id" element={<EventDetail language={language} />} />
            <Route path="news-detail/:id" element={<NewsDetail language={language} />} />

            {/* Statik Sahifalar */}
            <Route path="login" element={
              <>
                <SEO title="Kirish" />
                <Login />
              </>
            } />
            <Route path="about" element={
              <>
                <SEO title="Biz haqimizda" />
                <About language={language} />
              </>
            } />
            <Route path="support" element={
              <>
                <SEO title="Qo'llab-quvvatlash" />
                <Support language={language} />
              </>
            } />
            <Route path="contact" element={
              <>
                <SEO title="Aloqa" />
                <Contact />
              </>
            } />
            <Route path="search" element={
              <>
                <SEO title="Qidiruv" />
                <Search />
              </>
            } />
            <Route path="paper" element={<Paper />} />
          </Route>

          {/* 404 - Sahifa topilmasa Home ga qaytadi (Navigate orqali /uz ga) */}
          <Route path="*" element={<Navigate to={`/${language}`} replace />} />
        </Routes>
      </main>

      {!location.pathname.includes('/paper') && (
        <footer className="w-full py-12 border-t border-graphite/10 mt-12 bg-graphite/5 dark:bg-white/5 relative z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <Ornament type="divider" className="w-64 mb-6" />
            <h2 className="font-display text-4xl mb-4 dark:text-white uppercase tracking-tighter">ME'MOR</h2>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.3em] text-graphite/60 dark:text-white/40 mb-8 font-bold">
              <Link to={`/${language}/knowledge/articles`} className="hover:text-teal transition-colors">{t.ilm}</Link>
              <Link to={`/${language}/action`} className="hover:text-teal transition-colors">{t.harakat}</Link>
              <Link to={`/${language}/creation`} className="hover:text-teal transition-colors">{t.ijod}</Link>
              <span className="text-graphite/20 dark:text-white/10">|</span>
              <Link to={`/${language}/about`} className="hover:text-teal transition-colors">{t.about}</Link>
              <Link to={`/${language}/contact`} className="hover:text-teal transition-colors">{t.contact}</Link>
            </div>
            <p className="text-[10px] font-mono text-graphite/40 dark:text-white/20 text-center max-w-md uppercase tracking-widest">
              {t.copyright}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

// BrowserRouter production uchun eng yaxshi variant
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
    </BrowserRouter>
  );
};

export default App;