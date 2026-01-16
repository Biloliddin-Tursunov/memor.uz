
import React, { useState, useEffect } from 'react';
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
import { PageRoute } from './types';
import { Ornament } from './components/Ornament';
import IntroScreen from './components/IntroScreen';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(PageRoute.HOME);
  const [showIntro, setShowIntro] = useState(true);

  const renderPage = () => {
    switch (currentRoute) {
      case PageRoute.HOME:
        return <Home onNavigate={handleNavigate} />;
      case PageRoute.KNOWLEDGE:
        return <Knowledge />;
      case PageRoute.ACTION:
        return <Action />;
      case PageRoute.CREATION:
        return <Creation />;
      case PageRoute.LOGIN:
        return <Login />;
      case PageRoute.ABOUT:
        return <About />;
      case PageRoute.SUPPORT:
        return <Support />;
      case PageRoute.CONTACT:
        return <Contact />;
      case PageRoute.NEWS:
        return <News />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-parchment text-graphite flex flex-col font-serif selection:bg-sepia selection:text-white relative">
      
      {/* Intro Loading Screen */}
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}

      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-paper-texture z-40 mix-blend-multiply"></div>
      
      <Header activeRoute={currentRoute} onNavigate={handleNavigate} />

      <main className="flex-grow w-full">
        {renderPage()}
      </main>

      <footer className="w-full py-12 border-t border-graphite/10 mt-12 bg-graphite/5 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <Ornament type="divider" className="w-64 mb-6" />
            <h2 className="font-display text-4xl mb-4">ME'MOR</h2>
            <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-widest text-graphite/60 mb-8">
                <button onClick={() => handleNavigate(PageRoute.KNOWLEDGE)} className="hover:text-teal">Ilm</button>
                <button onClick={() => handleNavigate(PageRoute.ACTION)} className="hover:text-teal">Harakat</button>
                <button onClick={() => handleNavigate(PageRoute.CREATION)} className="hover:text-teal">Ijod</button>
                <span className="text-graphite/20">|</span>
                <button onClick={() => handleNavigate(PageRoute.ABOUT)} className="hover:text-teal">Biz Haqimizda</button>
                <button onClick={() => handleNavigate(PageRoute.CONTACT)} className="hover:text-teal">Aloqa</button>
            </div>
            <p className="text-xs font-mono text-graphite/40">
                © 2025 ME'MOR Project. All Rights Reserved. Built for the Future of History.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
