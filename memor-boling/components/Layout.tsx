import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { LogoIcon } from './Icons';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [botMode, setBotMode] = useState<'ai' | 'expert'>('ai');

  return (
    <div className="h-screen flex flex-col font-sans text-slate-900 bg-slate-50 overflow-hidden">
      {/* Header - Compact & Bordered */}
      <header className="shrink-0 bg-white border-b border-slate-200 z-50 h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 opacity-90 transition-opacity group-hover:opacity-100">
              <LogoIcon />
            </div>
            <div className="flex flex-col leading-none justify-center">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-wide uppercase">ME'MOR</h1>
              <span className="text-[10px] md:text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">BO'LING</span>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
             <span className="text-lg md:text-xl font-serif font-bold text-slate-900 hidden md:block tracking-tight">
                BUILD MY HOME
             </span>
             <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Takes remaining height, handles its own scrolling */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 overflow-hidden">
        <Outlet context={{ botMode }} />
      </main>
    </div>
  );
};

export default Layout;