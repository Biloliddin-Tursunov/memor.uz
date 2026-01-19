import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';

// Asosiy komponentlar
import Header from './components/Header';
import { Ornament } from './components/Ornament';
import IntroScreen from './components/IntroScreen';
import SearchModal from './components/SearchModal';

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
    // Batafsil sahifalar uchun tekshiruv
    if (path.startsWith('/article') || path.startsWith('/project') || path.startsWith('/video') || 
        path.startsWith('/creation') || path.startsWith('/book') || path.startsWith('/creator') || 
        path.startsWith('/event') || path.startsWith('/news-detail')) {
      return PageRoute.DETAIL;
    }
    
    switch (path) {
      case '/': return PageRoute.HOME;
      case '/knowledge': 
      case (path.startsWith('/knowledge') ? path : ''): return PageRoute.KNOWLEDGE;
      case '/action': return PageRoute.ACTION;
      case '/creation': return PageRoute.CREATION;
      case '/login': return PageRoute.LOGIN;
      case '/about': return PageRoute.ABOUT;
      case '/support': return PageRoute.SUPPORT;
      case '/contact': return PageRoute.CONTACT;
      case '/news': return PageRoute.NEWS;
      default: return PageRoute.HOME;
    }
  };

  const currentRoute = getActiveRoute(location.pathname);

  // Menyudan o'tish logikasi
  const handleNavigate = (route: PageRoute) => {
    switch (route) {
      case PageRoute.HOME: navigate('/'); break;
      case PageRoute.KNOWLEDGE: navigate('/knowledge/articles'); break;
      case PageRoute.ACTION: navigate('/action'); break;
      case PageRoute.CREATION: navigate('/creation'); break;
      case PageRoute.LOGIN: navigate('/login'); break;
      case PageRoute.ABOUT: navigate('/about'); break;
      case PageRoute.SUPPORT: navigate('/support'); break;
      case PageRoute.CONTACT: navigate('/contact'); break;
      case PageRoute.NEWS: navigate('/news'); break;
      default: navigate('/');
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
    navigate(`/${routePrefix}/${item.id}`);
    setIsSearchOpen(false); // Qidiruv oynasini yopish
  };

  return (
    <div className="min-h-screen bg-parchment text-graphite dark:bg-[#020617] flex flex-col font-serif selection:bg-sepia selection:text-white relative transition-colors duration-500">
      <ScrollToTop />
      
      {showIntro && <IntroScreen onFinish={handleIntroFinish} />}
      
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-paper-texture z-10 mix-blend-multiply dark:mix-blend-overlay dark:opacity-[0.05]"></div>

      <Header
        activeRoute={currentRoute}
        onNavigate={handleNavigate}
        onSearchOpen={() => setIsSearchOpen(true)}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onItemClick={handleItemClick}
        language={language}
      />

      <main className={`flex-grow w-full relative z-20 ${currentRoute === PageRoute.HOME ? '' : 'pt-[100px] md:pt-[120px]'}`}>
        <Routes>
          {/* Asosiy Sahifalar */}
          <Route path="/" element={<Home onNavigate={handleNavigate} onItemClick={handleItemClick} language={language} />} />
          <Route path="/knowledge" element={<Knowledge onItemClick={handleItemClick} />} />
          <Route path="/knowledge/:tab" element={<Knowledge onItemClick={handleItemClick} />} />
          <Route path="/action" element={<Action onItemClick={handleItemClick} />} />
          <Route path="/creation" element={<Creation onItemClick={handleItemClick} />} />
          <Route path="/news" element={<News onItemClick={handleItemClick} />} />
          
          {/* Batafsil (Detail) Sahifalar - Dynamic URLs */}
          <Route path="/article/:id" element={<ArticleDetail language={language} />} />
          <Route path="/project/:id" element={<ProjectDetail language={language} />} />
          <Route path="/video/:id" element={<VideoDetail language={language} />} />
          <Route path="/creation/:id" element={<CreationDetail language={language} />} />
          <Route path="/book/:id" element={<BookDetail language={language} />} />
          <Route path="/creator/:id" element={<CreatorDetail language={language} />} />
          <Route path="/event/:id" element={<EventDetail language={language} />} />
          <Route path="/news-detail/:id" element={<NewsDetail language={language} />} />

          {/* Statik Sahifalar */}
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* 404 - Sahifa topilmasa Home ga qaytadi */}
          <Route path="*" element={<Home onNavigate={handleNavigate} onItemClick={handleItemClick} language={language} />} />
        </Routes>
      </main>

      <footer className="w-full py-12 border-t border-graphite/10 mt-12 bg-graphite/5 dark:bg-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <Ornament type="divider" className="w-64 mb-6" />
          <h2 className="font-display text-4xl mb-4 dark:text-white uppercase tracking-tighter">ME'MOR</h2>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.3em] text-graphite/60 dark:text-white/40 mb-8 font-bold">
            <Link to="/knowledge/articles" className="hover:text-teal transition-colors">{t.ilm}</Link>
            <Link to="/action" className="hover:text-teal transition-colors">{t.harakat}</Link>
            <Link to="/creation" className="hover:text-teal transition-colors">{t.ijod}</Link>
            <span className="text-graphite/20 dark:text-white/10">|</span>
            <Link to="/about" className="hover:text-teal transition-colors">{t.about}</Link>
            <Link to="/contact" className="hover:text-teal transition-colors">{t.contact}</Link>
          </div>
          <p className="text-[10px] font-mono text-graphite/40 dark:text-white/20 text-center max-w-md uppercase tracking-widest">
            {t.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

// BrowserRouter production uchun eng yaxshi variant
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;