import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Fingerprint, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import StarBackground from './StarBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAdmin, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col font-serif text-white selection:bg-indigo-500 selection:text-white">
      <StarBackground />
      
      {!isLogin && (
        <header className="fixed top-0 w-full z-50 pt-8 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 backdrop-blur-[2px]">
            <div className="flex items-center gap-6">
              {!isHome && (
                <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white">
                  <ArrowLeft size={24} />
                </Link>
              )}
              <Link to="/" className="flex flex-col group items-start">
                 <h1 className="font-serif text-6xl md:text-7xl tracking-tighter text-white drop-shadow-lg group-hover:text-indigo-200 transition-colors leading-[0.8]">
                  Me'mor
                </h1>
                <span className="text-[8px] md:text-[9px] font-light uppercase text-white/50 font-typewriter tracking-widest leading-tight w-full text-justify mt-1">
                  The Empire of Traditional Arts
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-6">
              {isAdmin ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm bg-white/5 hover:bg-red-900/30 hover:border-red-800/50 transition-all font-typewriter text-xs uppercase tracking-wider"
                >
                  <LogOut size={14} />
                  <span>Exit</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm bg-white/5 hover:bg-white/10 transition-all font-typewriter text-xs uppercase tracking-wider text-white/70 hover:text-white group"
                >
                  <Fingerprint size={16} className="group-hover:text-indigo-300 transition-colors" />
                  <span>I'm Admin</span>
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      <main className={`flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 ${isLogin ? 'pt-0 flex items-center justify-center' : 'pt-40 pb-12'}`}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>
      
      {!isLogin && (
        <footer className="py-8 text-center text-white/30 text-xs relative z-10 font-typewriter">
          <p>"Floating in the void, tethered by ideas."</p>
        </footer>
      )}
    </div>
  );
};

export default Layout;