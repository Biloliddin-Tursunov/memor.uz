import React, { useState } from 'react';
import { Menu, Home, Inbox, Search, Plus } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { NavigationState } from '../types';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: NavigationState;
  onNavigate: (page: NavigationState) => void;
  onLogout: () => void;
  onSearchClick: () => void;
  projectIcons?: Record<string, {name: string, color?: string}>;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate, 
  onLogout, 
  onSearchClick,
  projectIcons
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMobileNavigate = (page: NavigationState) => {
    onNavigate(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full text-textMain overflow-hidden bg-transparent font-serif fixed inset-0">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-[280px] h-full shrink-0">
        <Sidebar 
          activePage={activePage} 
          onNavigate={onNavigate} 
          onLogout={onLogout} 
          onSearchClick={onSearchClick}
          projectIcons={projectIcons}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative w-full bg-transparent">
        {/* Optimized Content Container for Mobile */}
        <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative z-10 overscroll-contain pb-24 lg:pb-0">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar - Enhanced UI */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-cardBg/90 backdrop-blur-xl border border-borderDark rounded-2xl z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between px-6">
         <MobileNavItem 
           icon={<Home size={22} />} 
           isActive={activePage.type === 'dashboard'} 
           onClick={() => handleMobileNavigate({ type: 'dashboard', title: 'Dashboard' })} 
         />
         <MobileNavItem 
           icon={<Inbox size={22} />} 
           isActive={activePage.type === 'inbox'} 
           onClick={() => handleMobileNavigate({ type: 'inbox', title: 'Inbox' })} 
         />
         
         <div className="-mt-14 relative">
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-150"></div>
            <button 
              onClick={() => handleMobileNavigate({ type: 'cms-studio', title: 'Create' })}
              className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-bgMain active:scale-90 transition-transform relative z-10"
            >
               <Plus size={28} />
            </button>
         </div>

         <MobileNavItem 
           icon={<Search size={22} />} 
           isActive={false} 
           onClick={onSearchClick} 
         />
         <MobileNavItem 
           icon={<Menu size={22} />} 
           isActive={false} 
           onClick={() => setIsSidebarOpen(true)} 
         />
      </div>

      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fadeIn" onClick={() => setIsSidebarOpen(false)}></div>
           <div className="absolute top-0 bottom-0 right-0 w-[85%] max-w-sm bg-bgSidebar border-l border-borderDark shadow-2xl animate-slideLeft overflow-hidden">
              <Sidebar 
                activePage={activePage} 
                onNavigate={handleMobileNavigate} 
                onLogout={onLogout} 
                onSearchClick={() => { onSearchClick(); setIsSidebarOpen(false); }}
                onCloseMobile={() => setIsSidebarOpen(false)}
                projectIcons={projectIcons}
              />
           </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem: React.FC<{ icon: React.ReactNode, isActive: boolean, onClick: () => void }> = ({ icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'text-accent bg-accent/10 scale-110' : 'text-textMuted hover:text-textMain'}`}
  >
    {icon}
  </button>
);

export default AdminLayout;