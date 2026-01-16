
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTeams } from '../context/TeamContext';
import { Language, Member } from '../types';
import { ArrowLeft, Fingerprint, LogOut, ArrowRightLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';
import StarBackground from './StarBackground';
import GlobalMemberManager from './GlobalMemberManager';
import UserProfileModal from './UserProfileModal';
import PublicProfileModal from './PublicProfileModal';

interface LayoutProps {
  children: React.ReactNode;
}

const ListMember: React.FC<{ member: Member; onClick: () => void }> = ({ member, onClick }) => {
  const isCigdem = member.id === 'u_cigdem' || member.name.includes('Çiğdem');
  const isSupervisor = member.role === 'Supervisor';
  
  return (
    <div
        onClick={onClick}
        className="group cursor-pointer py-1.5 flex items-center justify-center w-full"
    >
        <span className={`
           font-serif italic text-lg md:text-2xl tracking-wide transition-all duration-300 text-center leading-tight
           ${(member.isVolunteer && !isSupervisor) ? 'text-white/40' : 'text-white/60 group-hover:text-amber-200'}
           ${isCigdem ? 'border-b border-white/20 pb-0.5 whitespace-nowrap' : 'max-w-[140px] md:max-w-[240px]'}
        `}>
            {member.name}
        </span>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAdmin, isSuperAdmin, logout, currentUser } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { getAllMembers, footerOrder } = useTeams();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  const LANGUAGES: Language[] = ['UZ', 'TR', 'ENG', 'RUS'];

  const [isGlobalManagerOpen, setIsGlobalManagerOpen] = useState(false);
  const [managerTargetId, setManagerTargetId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedPublicMember, setSelectedPublicMember] = useState<Member | null>(null);

  const allMembers = React.useMemo(() => {
    const members = getAllMembers();
    const memberMap = new Map<string, Member>(members.map(m => [m.id, m]));
    const sorted: Member[] = [];
    footerOrder.forEach(id => {
        if (memberMap.has(id)) {
            sorted.push(memberMap.get(id)!);
            memberMap.delete(id);
        }
    });
    memberMap.forEach(m => sorted.push(m));
    return sorted;
  }, [getAllMembers, footerOrder]);

  const { col1, col2, col3 } = React.useMemo(() => {
      const volunteers = allMembers.filter(m => m.isVolunteer && m.role !== 'Supervisor');
      const coreAndSupervisor = allMembers.filter(m => !m.isVolunteer || m.role === 'Supervisor');
      
      const supervisor = coreAndSupervisor.find(m => m.role === 'Supervisor');
      const coreOnly = coreAndSupervisor.filter(m => m.role !== 'Supervisor');

      return {
          col1: coreOnly.slice(0, Math.ceil(coreOnly.length / 2)), 
          col2: coreOnly.slice(Math.ceil(coreOnly.length / 2)),
          col3: { supervisor, volunteers }
      };
  }, [allMembers]);

  const handleSponsorClick = () => {
    const drCigdem = allMembers.find(m => m.id === 'u_cigdem' || m.name.includes('Çiğdem'));
    if (drCigdem) setSelectedPublicMember(drCigdem);
  };

  const handleEditFromProfile = (member: Member) => {
      setSelectedPublicMember(null);
      setManagerTargetId(member.id);
      setIsGlobalManagerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-serif text-white selection:bg-amber-700 selection:text-white">
      <StarBackground />
      {!isLogin && (
        <header className="fixed top-0 w-full z-50 pt-4 pb-2 px-4 md:pt-6 md:px-12 backdrop-blur-sm border-b border-white/5 bg-space-bg/50">
          <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
               {!isHome && (
                  <Link to="/" className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white">
                     <ArrowLeft size={20} />
                  </Link>
               )}
               <Link to="/" className="flex flex-col group items-start">
                   <h1 className="font-serif text-3xl md:text-6xl tracking-tighter text-white drop-shadow-lg group-hover:text-amber-200 transition-colors leading-[0.8]">Me'mor</h1>
                   <span className="hidden md:block text-[9px] font-light uppercase text-white/50 font-typewriter tracking-widest leading-tight w-full text-justify mt-1 pl-[0.25rem]">
                      {t("The Empire of Traditional Arts")}
                   </span>
               </Link>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3 bg-black/20 rounded-full px-3 py-1.5 border border-white/5">
                 {LANGUAGES.map(lang => (
                     <button key={lang} onClick={() => setLanguage(lang)} className={`text-[9px] md:text-[10px] font-typewriter font-bold transition-all ${language === lang ? 'text-white scale-105' : 'text-white/30 hover:text-white/70'}`}>
                        {lang}
                     </button>
                 ))}
              </div>
              {isAdmin ? (
                <div className="flex items-center gap-3 md:gap-4">
                    <button onClick={() => setIsProfileOpen(true)} className="flex items-center gap-2 md:gap-3 group">
                        <div className="hidden md:flex flex-col items-end">
                             <span className="font-serif text-lg leading-none">{currentUser?.name}</span>
                             <span className="font-typewriter text-[9px] uppercase tracking-widest text-white/40">{t("Profile")}</span>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden group-hover:border-amber-400 transition-colors">
                            {currentUser?.avatar ? <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" /> : <User size={16} />}
                        </div>
                    </button>
                    <button onClick={logout} className="p-1.5 md:p-2 border border-white/10 rounded-full bg-white/5 hover:bg-red-900/30 hover:border-red-800/50 transition-all text-white/50 hover:text-white">
                      <LogOut size={14} />
                    </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-white/10 rounded-sm bg-white/5 hover:bg-white/10 transition-all font-typewriter text-[10px] md:text-xs uppercase tracking-wider text-white/70 hover:text-white group">
                  <Fingerprint size={14} className="group-hover:text-amber-300 transition-colors md:w-4 md:h-4" />
                  <span className="hidden md:inline">{t("I'm Creator")}</span>
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      <main className={`flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 ${isLogin ? 'pt-0 flex items-center justify-center' : 'pt-28 md:pt-40 pb-12'}`}>
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full">
          {children}
        </motion.div>
      </main>
      
      {!isLogin && (
        <footer className="py-12 text-center text-white/30 relative z-10 font-typewriter border-t border-white/5 mt-12 bg-gradient-to-t from-black/40 to-transparent">
          {isHome ? (
            <div className="w-full px-4 max-w-7xl mx-auto">
                 {isSuperAdmin && (
                    <div className="flex justify-center mb-12">
                         <button onClick={() => setIsGlobalManagerOpen(true)} className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all shadow-lg hover:shadow-amber-500/20">
                             <ArrowRightLeft size={12} /> {t("Redirect Creators")}
                         </button>
                    </div>
                 )}
                 <div className="mb-16">
                     <h3 className="font-serif italic text-3xl md:text-5xl text-white/90 mb-4 tracking-wide uppercase">{t("Creators")}</h3>
                     <div className="flex items-center justify-center gap-3 mb-10 opacity-40">
                         <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                         <span className="text-[10px] font-serif">✦</span>
                         <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                     </div>
                     
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 md:gap-x-12">
                         {/* Column 1 on Mobile: Otabek (col1) | Column 1 on Desktop: Aminaxon (col2) */}
                         <div className="flex flex-col items-center order-1 md:order-2">
                             {col1.map(m => <ListMember key={m.id} member={m} onClick={() => setSelectedPublicMember(m)} />)}
                         </div>

                         {/* Column 2 on Mobile: Aminaxon (col2) | Column 2 on Desktop: Otabek (col1) */}
                         <div className="flex flex-col items-center order-2 md:order-1">
                             {col2.map(m => <ListMember key={m.id} member={m} onClick={() => setSelectedPublicMember(m)} />)}
                         </div>
                         
                         <div className="flex flex-col items-center col-span-2 md:col-span-1 order-3">
                            {col3.supervisor && (
                                <div className="mb-4 w-full flex justify-center">
                                    <ListMember member={col3.supervisor} onClick={() => setSelectedPublicMember(col3.supervisor!)} />
                                </div>
                            )}
                            
                            <span className="font-typewriter text-[9px] uppercase tracking-[0.2em] text-white/10 mb-4 block">
                                {t("Volunteer").toUpperCase()}LAR:
                            </span>

                            <div className="grid grid-cols-2 md:flex md:flex-col md:items-center w-full">
                                {col3.volunteers.map(m => <ListMember key={m.id} member={m} onClick={() => setSelectedPublicMember(m)} />)}
                            </div>
                         </div>
                     </div>
                 </div>
                 <div className="flex flex-col items-center gap-2 mt-20">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">{t("Sponsor")}</span>
                    <button onClick={handleSponsorClick} className="font-serif text-2xl text-white/60 hover:text-white hover:scale-105 transition-all cursor-pointer">
                      SamDAQU
                    </button>
                 </div>
            </div>
          ) : (
            <p className="text-sm tracking-widest opacity-60 hover:opacity-100 transition-opacity">"{t("To beautify the world")}"</p>
          )}
        </footer>
      )}
      <GlobalMemberManager isOpen={isGlobalManagerOpen} onClose={() => setIsGlobalManagerOpen(false)} initialMemberId={managerTargetId} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <PublicProfileModal isOpen={!!selectedPublicMember} onClose={() => setSelectedPublicMember(null)} member={selectedPublicMember} onManage={isSuperAdmin ? () => handleEditFromProfile(selectedPublicMember!) : undefined} />
    </div>
  );
};

export default Layout;
