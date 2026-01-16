import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
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
import { PageRoute } from './types'; // Enum turlarini saqlab qolamiz
import { Ornament } from './components/Ornament';
import IntroScreen from './components/IntroScreen';

// Sahifa o'zgarganda avtomatik yuqoriga chiqish komponenti
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Asosiy App tarkibi (Router ichida bo'lishi kerak bo'lgan qismi)
const AppContent: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // URL ga qarab activeRoute ni aniqlash (Header uchun)
  const getActiveRoute = (path: string): PageRoute => {
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

  // Eski komponentlar bilan ishlash uchun adapter funksiya
  // Header yoki Home komponentlari hali ham onNavigate propini kutayotgan bo'lsa
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
      default: navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-parchment text-graphite flex flex-col font-serif selection:bg-sepia selection:text-white relative">
      
      <ScrollToTop />

      {/* Intro Loading Screen */}
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}

      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-paper-texture z-40 mix-blend-multiply"></div>
      
      {/* Headerga joriy route va navigatsiya funksiyasini uzatamiz */}
      <Header activeRoute={currentRoute} onNavigate={handleNavigate} />

      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/action" element={<Action />} />
          <Route path="/creation" element={<Creation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          {/* Noto'g'ri URL kiritilsa Home ga yo'naltirish */}
          <Route path="*" element={<Home onNavigate={handleNavigate} />} />
        </Routes>
      </main>

      <footer className="w-full py-12 border-t border-graphite/10 mt-12 bg-graphite/5 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <Ornament type="divider" className="w-64 mb-6" />
            <h2 className="font-display text-4xl mb-4">ME'MOR</h2>
            <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-widest text-graphite/60 mb-8">
                {/* Footerda Button o'rniga Link ishlatish maqsadga muvofiq */}
                <Link to="/knowledge" className="hover:text-teal">Ilm</Link>
                <Link to="/action" className="hover:text-teal">Harakat</Link>
                <Link to="/creation" className="hover:text-teal">Ijod</Link>
                <span className="text-graphite/20">|</span>
                <Link to="/about" className="hover:text-teal">Biz Haqimizda</Link>
                <Link to="/contact" className="hover:text-teal">Aloqa</Link>
            </div>
            <p className="text-xs font-mono text-graphite/40">
                © 2025 ME'MOR Project. All Rights Reserved. Built for the Future of History.
            </p>
        </div>
      </footer>
    </div>
  );
};

// Asosiy App komponenti BrowserRouter bilan o'raladi
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;