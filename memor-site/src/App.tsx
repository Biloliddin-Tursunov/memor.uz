import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Knowledge from './pages/Knowledge';
import Action from './pages/Action';
import Creation from './pages/Creation';
import Login from './pages/Login';
import About from './pages/About';
import Support from './pages/Support';
import Contact from './pages/Contact';
import News from './pages/News';
import ItemDetail from './components/ItemDetail'; // Yangi import
import { PageRoute, Language, DisplayItem } from './types';
import { Ornament } from './components/Ornament';
import IntroScreen from './components/IntroScreen';
import { TRANSLATIONS } from './constants';

// Sahifa o'zgarganda avtomatik yuqoriga chiqish
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Detal sahifasi uchun Wrapper (Router state dan itemni olish uchun)
const DetailPageWrapper: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const location = useLocation();
  const item = location.state?.item as DisplayItem;

  // Agar to'g'ridan-to'g'ri link orqali kirilsa va item bo'lmasa, Homega qaytarish
  if (!item) {
    return <Navigate to="/" replace />;
  }

  return <ItemDetail item={item} onBack={onBack} />;
};

const AppContent: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Yangi qo'shilgan statelar (AIdan olindi)
  const [language, setLanguage] = useState<Language>('uz');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const navigate = useNavigate();
  const location = useLocation();

  // Tarjimalarni olish
  const t = TRANSLATIONS[language];

  // Dark mode effektini qo'llash
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Joriy route ni aniqlash (Header active holati uchun)
  const getActiveRoute = (path: string): PageRoute => {
    if (path.includes('/detail')) return PageRoute.DETAIL;
    switch (path) {
      case '/': return PageRoute.HOME;
      case '/knowledge': return PageRoute.KNOWLEDGE;
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

  // Eski va yangi kodni bog'lovchi navigatsiya funksiyasi
  const handleNavigate = (route: PageRoute) => {
    switch (route) {
      case PageRoute.HOME: navigate('/'); break;
      case PageRoute.KNOWLEDGE: navigate('/knowledge'); break;
      case PageRoute.ACTION: navigate('/action'); break;
      case PageRoute.CREATION: navigate('/creation'); break;
      case PageRoute.LOGIN: navigate('/login'); break;
      case PageRoute.ABOUT: navigate('/about'); break;
      case PageRoute.SUPPORT: navigate('/support'); break;
      case PageRoute.CONTACT: navigate('/contact'); break;
      case PageRoute.NEWS: navigate('/news'); break;
      // Detail uchun alohida logika pastda
      default: navigate('/');
    }
  };

  // Item bosilganda ishlaydigan yangi funksiya (Router orqali)
  const handleItemClick = (item: DisplayItem) => {
    // Biz item obyektini "state" orqali yangi sahifaga uzatamiz
    navigate('/detail', { state: { item } });
  };

  return (
    <div className="min-h-screen bg-parchment text-graphite flex flex-col font-serif selection:bg-sepia selection:text-white relative transition-colors duration-500">

      <ScrollToTop />

      {/* Intro Loading Screen */}
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}

      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-paper-texture z-40 mix-blend-multiply dark:mix-blend-overlay dark:opacity-[0.05]"></div>

      {/* Header (Yangi propslar bilan: language, theme) */}
      <Header
        activeRoute={currentRoute}
        onNavigate={handleNavigate}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} onItemClick={handleItemClick} />} />

          {/* ItemDetail uchun yangi route */}
          <Route path="/detail" element={<DetailPageWrapper onBack={() => navigate(-1)} />} />

          {/* onItemClick propini qabul qiluvchi sahifalar */}
          <Route path="/knowledge" element={<Knowledge onItemClick={handleItemClick} />} />
          <Route path="/action" element={<Action onItemClick={handleItemClick} />} />
          <Route path="/creation" element={<Creation onItemClick={handleItemClick} />} />
          <Route path="/news" element={<News onItemClick={handleItemClick} />} />

          {/* Oddiy sahifalar */}
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<Home onNavigate={handleNavigate} onItemClick={handleItemClick} />} />
        </Routes>
      </main>

      {/* Footer (Tarjimalar bilan yangilandi) */}
      <footer className="w-full py-12 border-t border-graphite/10 mt-12 bg-graphite/5 dark:bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <Ornament type="divider" className="w-64 mb-6" />
          <h2 className="font-display text-4xl mb-4">ME'MOR</h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-widest text-graphite/60 mb-8">
            <Link to="/knowledge" className="hover:text-teal">{t.ilm}</Link>
            <Link to="/action" className="hover:text-teal">{t.harakat}</Link>
            <Link to="/creation" className="hover:text-teal">{t.ijod}</Link>
            <span className="text-graphite/20">|</span>
            <Link to="/about" className="hover:text-teal">{t.about}</Link>
            <Link to="/contact" className="hover:text-teal">{t.contact}</Link>
          </div>
          <p className="text-xs font-mono text-graphite/40">
            {t.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;